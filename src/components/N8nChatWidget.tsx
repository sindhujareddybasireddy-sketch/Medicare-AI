import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  RefreshCw, 
  Sparkles, 
  Settings, 
  Check, 
  AlertCircle,
  Minimize2,
  Maximize2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  status?: 'sending' | 'sent' | 'error';
}

const DEFAULT_WEBHOOK_URL =
  'https://sindhujabasireddy.app.n8n.cloud/webhook/d80ace62-1244-4063-b4a8-63fa8686a64f/chat';

const QUICK_PROMPTS = [
  'How do I book an appointment?',
  'What cardiology specialists are available?',
  'What are the pharmacy operating hours?',
  'Where is the emergency department located?',
];

export const N8nChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(DEFAULT_WEBHOOK_URL);
  const [showSettings, setShowSettings] = useState(false);
  const [tempUrl, setTempUrl] = useState(DEFAULT_WEBHOOK_URL);
  
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'welcome-1',
        sender: 'bot',
        text: 'Hello! I am your MediCare AI healthcare assistant powered by n8n. How can I assist you with appointments, doctors, hospital tests, or clinic services today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  });
  
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize session ID and custom event listener
  useEffect(() => {
    let storedSession = sessionStorage.getItem('medicare_n8n_session');
    if (!storedSession) {
      storedSession = `medicare-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
      sessionStorage.setItem('medicare_n8n_session', storedSession);
    }
    setSessionId(storedSession);

    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-n8n-chat', handleOpenChat);
    return () => window.removeEventListener('open-n8n-chat', handleOpenChat);
  }, []);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsgId = `msg-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Send payload compatible with n8n Chat Trigger / Webhook
      const payload = {
        action: 'sendMessage',
        chatInput: text,
        message: text,
        sessionId: sessionId || 'default-session',
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`n8n webhook error (Status ${response.status}: ${response.statusText})`);
      }

      let botReply = '';
      const contentType = response.headers.get('content-type') || '';

      if (contentType.includes('application/json')) {
        const data = await response.json();
        // Handle varied n8n webhook return schemas
        if (typeof data === 'string') {
          botReply = data;
        } else if (data.output) {
          botReply = typeof data.output === 'string' ? data.output : JSON.stringify(data.output);
        } else if (data.text) {
          botReply = typeof data.text === 'string' ? data.text : JSON.stringify(data.text);
        } else if (data.message) {
          botReply = typeof data.message === 'string' ? data.message : JSON.stringify(data.message);
        } else if (data.response) {
          botReply = typeof data.response === 'string' ? data.response : JSON.stringify(data.response);
        } else if (Array.isArray(data) && data[0]) {
          botReply =
            data[0].output ||
            data[0].text ||
            data[0].message ||
            data[0].response ||
            JSON.stringify(data[0]);
        } else {
          botReply = JSON.stringify(data, null, 2);
        }
      } else {
        botReply = await response.text();
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReply || 'I received your message and processed your request successfully.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error('n8n Chat webhook error:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'bot',
        text: `Unable to connect to n8n webhook. Please ensure the n8n workflow is active or verify CORS settings. (${err.message || 'Network request failed'})`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'error',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: 'Chat history cleared. How can I assist you now?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleSaveSettings = () => {
    if (tempUrl.trim()) {
      setWebhookUrl(tempUrl.trim());
      setShowSettings(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Trigger Button (when closed) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3.5 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white rounded-full shadow-xl shadow-sky-600/30 hover:shadow-sky-600/40 transition-all transform hover:scale-105 active:scale-95"
          aria-label="Open MediCare AI n8n Chat Assistant"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white animate-pulse"></span>
          </div>
          <span className="font-semibold text-sm pr-1">MediCare AI Chat</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transition-all duration-200 ${
            isExpanded
              ? 'w-[92vw] sm:w-[620px] h-[85vh] max-h-[800px]'
              : 'w-[92vw] sm:w-[400px] h-[560px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-sky-700 via-sky-600 to-blue-700 text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center text-white shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-white leading-tight">
                    MediCare AI Assistant
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </div>
                <div className="text-[11px] text-sky-100 flex items-center gap-1 mt-0.5">
                  <Sparkles className="w-3 h-3 text-sky-200" />
                  <span>Connected to n8n Automation</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-1.5 text-sky-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Webhook Configuration"
                aria-label="Webhook Configuration"
              >
                <Settings className="w-4 h-4" />
              </button>

              <button
                onClick={handleClearChat}
                className="p-1.5 text-sky-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Clear Chat"
                aria-label="Clear Chat"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="hidden sm:inline-flex p-1.5 text-sky-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title={isExpanded ? 'Collapse' : 'Expand'}
                aria-label={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-sky-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors ml-0.5"
                title="Close Chat"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Webhook Settings Drawer (collapsible) */}
          {showSettings && (
            <div className="p-3 bg-slate-50 border-b border-slate-200 text-xs space-y-2 animate-in slide-in-from-top-2">
              <div className="flex items-center justify-between font-semibold text-slate-800">
                <span>n8n Webhook Endpoint</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-mono">
                  Active Webhook
                </span>
              </div>
              <input
                type="text"
                value={tempUrl}
                onChange={(e) => setTempUrl(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-mono text-[11px] text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => setTempUrl(DEFAULT_WEBHOOK_URL)}
                  className="text-[11px] text-slate-500 hover:text-slate-800 underline"
                >
                  Reset to Default
                </button>
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="px-3 py-1 bg-sky-600 hover:bg-sky-700 text-white rounded text-[11px] font-semibold"
                >
                  Save URL
                </button>
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 mt-0.5 border border-sky-200">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-sky-600 text-white rounded-br-xs'
                      : msg.status === 'error'
                      ? 'bg-rose-50 text-rose-900 border border-rose-200 rounded-bl-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                  }`}
                >
                  {msg.status === 'error' && (
                    <div className="flex items-center gap-1 text-rose-600 font-bold mb-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Webhook Notice</span>
                    </div>
                  )}
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <div
                    className={`text-[10px] mt-1 text-right ${
                      msg.sender === 'user' ? 'text-sky-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 border border-sky-200">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl px-4 py-2.5 shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-600 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-sky-600 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-sky-600 animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-[11px] text-slate-500 font-medium ml-1">
                    Connecting to n8n...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Suggestions */}
          {messages.length <= 2 && !isLoading && (
            <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap shrink-0">
                Suggestions:
              </span>
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-600 text-[11px] whitespace-nowrap transition-colors border border-slate-200/60 shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask MediCare AI via n8n..."
              disabled={isLoading}
              className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all disabled:opacity-60"
            />

            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="p-2.5 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl transition-all shadow-sm active:scale-95 shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
