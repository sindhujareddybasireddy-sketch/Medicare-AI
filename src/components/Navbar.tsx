import React, { useState } from 'react';
import { PageId } from '../types';
import { 
  Heart, 
  Menu, 
  X, 
  ChevronDown, 
  User, 
  Calendar, 
  FileText, 
  Activity, 
  PhoneCall,
  Bot 
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [analyzersDropdownOpen, setAnalyzersDropdownOpen] = useState(false);

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setAnalyzersDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAnalyzerActive =
    currentPage === 'prescription-analyzer' || currentPage === 'report-analyzer';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Emergency & Quick Access Strip */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-rose-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              24/7 Emergency Line:
            </span>
            <a href="tel:18009116334" className="text-white font-semibold hover:underline">
              +1 (800) 911-MEDI
            </a>
            <span className="hidden md:inline text-slate-500">·</span>
            <span className="hidden md:inline text-slate-400">
              General Outpatient: Mon - Sat 08:00 AM - 08:00 PM
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-n8n-chat'))}
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Bot className="w-3.5 h-3.5 text-sky-400" />
              <span>AI Chat Assistant</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`inline-flex items-center gap-1.5 transition-colors ${
                currentPage === 'dashboard' ? 'text-sky-400 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5 text-sky-400" />
              <span>Patient Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg p-1"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-blue-700 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
                <Heart className="w-5 h-5 fill-white/20 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-slate-900 block leading-tight">
                  MediCare<span className="text-sky-600"> AI</span>
                </span>
                <span className="text-[11px] font-medium tracking-wider text-slate-500 uppercase block">
                  Hospital & Healthcare
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                currentPage === 'home'
                  ? 'text-sky-700 bg-sky-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                currentPage === 'about'
                  ? 'text-sky-700 bg-sky-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('doctors')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                currentPage === 'doctors'
                  ? 'text-sky-700 bg-sky-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Doctors
            </button>
            <button
              onClick={() => handleNavClick('appointments')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                currentPage === 'appointments'
                  ? 'text-sky-700 bg-sky-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Appointments
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                currentPage === 'services'
                  ? 'text-sky-700 bg-sky-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick('pharmacy')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                currentPage === 'pharmacy'
                  ? 'text-sky-700 bg-sky-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Pharmacy
            </button>
            <button
              onClick={() => handleNavClick('tests')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                currentPage === 'tests'
                  ? 'text-sky-700 bg-sky-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Tests
            </button>

            {/* Analyzers Dropdown */}
            <div className="relative">
              <button
                onClick={() => setAnalyzersDropdownOpen(!analyzersDropdownOpen)}
                onBlur={() => setTimeout(() => setAnalyzersDropdownOpen(false), 200)}
                className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                  isAnalyzerActive
                    ? 'text-sky-700 bg-sky-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span>Analyzers</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${analyzersDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {analyzersDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                  <button
                    onClick={() => handleNavClick('prescription-analyzer')}
                    className={`w-full text-left px-4 py-2.5 text-sm flex items-start gap-2.5 transition-colors ${
                      currentPage === 'prescription-analyzer'
                        ? 'bg-sky-50 text-sky-700 font-medium'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <FileText className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium">Prescription Analyzer</div>
                      <div className="text-xs text-slate-500">Scan & review digitized prescription items</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNavClick('report-analyzer')}
                    className={`w-full text-left px-4 py-2.5 text-sm flex items-start gap-2.5 transition-colors ${
                      currentPage === 'report-analyzer'
                        ? 'bg-sky-50 text-sky-700 font-medium'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Activity className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium">Medical Report Analyzer</div>
                      <div className="text-xs text-slate-500">Analyze lab values, reference ranges & summaries</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('billing')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                currentPage === 'billing'
                  ? 'text-sky-700 bg-sky-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Billing
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                currentPage === 'contact'
                  ? 'text-sky-700 bg-sky-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('appointments')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-sky-600 to-blue-700 rounded-xl hover:from-sky-700 hover:to-blue-800 transition-all shadow-md shadow-sky-600/20 active:scale-95 whitespace-nowrap"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => handleNavClick('appointments')}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-4">
          <div className="grid grid-cols-1 gap-1 text-base">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'home' ? 'bg-sky-50 text-sky-700 font-semibold' : 'text-slate-700'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'about' ? 'bg-sky-50 text-sky-700 font-semibold' : 'text-slate-700'
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('doctors')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'doctors' ? 'bg-sky-50 text-sky-700 font-semibold' : 'text-slate-700'
              }`}
            >
              Doctors Directory
            </button>
            <button
              onClick={() => handleNavClick('appointments')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'appointments' ? 'bg-sky-50 text-sky-700 font-semibold' : 'text-slate-700'
              }`}
            >
              Book Appointments
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'services' ? 'bg-sky-50 text-sky-700 font-semibold' : 'text-slate-700'
              }`}
            >
              Hospital Services
            </button>
            <button
              onClick={() => handleNavClick('pharmacy')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'pharmacy' ? 'bg-sky-50 text-sky-700 font-semibold' : 'text-slate-700'
              }`}
            >
              Pharmacy Inventory
            </button>
            <button
              onClick={() => handleNavClick('tests')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'tests' ? 'bg-sky-50 text-sky-700 font-semibold' : 'text-slate-700'
              }`}
            >
              Medical Tests & Diagnostics
            </button>

            <div className="pt-2 pb-1 border-t border-slate-100 my-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-4">
                Clinical Analyzers
              </span>
            </div>
            <button
              onClick={() => handleNavClick('prescription-analyzer')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'prescription-analyzer'
                  ? 'bg-sky-50 text-sky-700 font-semibold'
                  : 'text-slate-700'
              }`}
            >
              Prescription Analyzer
            </button>
            <button
              onClick={() => handleNavClick('report-analyzer')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'report-analyzer'
                  ? 'bg-sky-50 text-sky-700 font-semibold'
                  : 'text-slate-700'
              }`}
            >
              Medical Report Analyzer
            </button>

            <div className="pt-2 pb-1 border-t border-slate-100 my-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-4">
                Patient Account & Services
              </span>
            </div>
            <button
              onClick={() => handleNavClick('billing')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'billing' ? 'bg-sky-50 text-sky-700 font-semibold' : 'text-slate-700'
              }`}
            >
              Billing & Invoices
            </button>
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'dashboard' ? 'bg-sky-50 text-sky-700 font-semibold' : 'text-slate-700'
              }`}
            >
              Patient Dashboard
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                window.dispatchEvent(new CustomEvent('open-n8n-chat'));
              }}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold text-sky-700 bg-sky-50 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-sky-600" />
                <span>AI Chat Assistant (n8n Live)</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'contact' ? 'bg-sky-50 text-sky-700 font-semibold' : 'text-slate-700'
              }`}
            >
              Contact & Emergency
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
