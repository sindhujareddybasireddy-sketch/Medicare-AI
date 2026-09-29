import React, { useState } from 'react';
import { PageId } from '../types';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Navigation, 
  Car, 
  Train, 
  ShieldAlert 
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
  onShowToast: (type: 'success' | 'info' | 'warning', title: string, message?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Clinical Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!name.trim()) errs.name = 'Please provide your full name';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email address is required';
    if (!phone.trim()) errs.phone = 'Contact telephone is required';
    if (!message.trim()) errs.message = 'Please write your message or inquiry';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      onShowToast(
        'success',
        'Message Dispatched Successfully',
        'Our clinical triage coordinator will respond within 2 business hours.'
      );
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Page Header */}
      <section className="bg-white border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-md">
              Hospital Helpdesk & Location
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-3 mb-4">
              Contact MediCare AI
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Have inquiries regarding doctor availability, surgical procedures, billing, or insurance coverage? Connect with our dedicated patient coordination desk.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Info + Contact Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Contact Cards & 24/7 Hotline (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Critical Emergency Banner */}
            <div className="p-6 rounded-2xl bg-rose-600 text-white shadow-lg shadow-rose-600/20 space-y-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-200" />
                <span className="text-xs font-bold uppercase tracking-wider text-rose-100">
                  Critical Care & Level 1 Trauma
                </span>
              </div>
              <h3 className="text-2xl font-bold">24/7 Emergency Line</h3>
              <p className="text-xs text-rose-100 leading-relaxed">
                For life-threatening cardiac, trauma, acute stroke, or pediatric emergencies, dial our dispatch line immediately.
              </p>
              <div className="pt-2">
                <a
                  href="tel:18009116334"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-rose-700 font-bold rounded-xl text-sm shadow-sm hover:bg-rose-50 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call +1 (800) 911-MEDI</span>
                </a>
              </div>
            </div>

            {/* General Contact Info Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Hospital Administration & Reception
              </h4>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Main Campus Address</span>
                    <span className="text-slate-600">
                      100 Healthcare Boulevard, Medical District, Suite 400
                    </span>
                    <span className="text-slate-400 block text-xs mt-0.5">
                      Building A (Inpatient) & Building B (Outpatient Wing)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">General Appointments</span>
                    <a href="tel:18005552273" className="text-sky-700 font-semibold hover:underline block">
                      +1 (800) 555-CARE (Toll Free)
                    </a>
                    <span className="text-slate-500 text-xs">Direct Line: +1 (800) 555-0199</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Email Inquiries</span>
                    <a href="mailto:care@medicare-ai.org" className="text-sky-700 font-semibold hover:underline block">
                      care@medicare-ai.org
                    </a>
                    <span className="text-slate-500 text-xs">Patient Records: records@medicare-ai.org</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Outpatient Clinic Hours</span>
                    <span className="text-slate-600">Monday – Saturday: 08:00 AM – 08:00 PM</span>
                    <span className="text-slate-400 block text-xs">Sunday: Urgent Care Triage Only (09:00 AM – 02:00 PM)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                Send Us a Message
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Fill out the form below. We will route your inquiry to the relevant clinical department.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Eleanor Vance"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                        errors.name ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                      }`}
                    />
                    {errors.name && (
                      <span className="text-xs text-rose-600 mt-1 block">{errors.name}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                        errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-xs text-rose-600 mt-1 block">{errors.email}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                        errors.phone ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                      }`}
                    />
                    {errors.phone && (
                      <span className="text-xs text-rose-600 mt-1 block">{errors.phone}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Inquiry Department / Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="General Clinical Inquiry">General Clinical Inquiry</option>
                      <option value="Doctor Appointment Scheduling">Doctor Appointment Scheduling</option>
                      <option value="Pharmacy & Prescription Refill">Pharmacy & Prescription Refill</option>
                      <option value="Diagnostic Lab Report Inquiries">Diagnostic Lab Report Inquiries</option>
                      <option value="Insurance Coverage & Billing">Insurance Coverage & Billing</option>
                      <option value="Executive Health Checkups">Executive Health Checkups</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Your Message / Question *
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details about your query or medical requirements..."
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                      errors.message ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                    }`}
                  ></textarea>
                  {errors.message && (
                    <span className="text-xs text-rose-600 mt-1 block">{errors.message}</span>
                  )}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    We adhere strictly to HIPAA privacy regulations.
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-sky-600/20 active:scale-95 flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder & Transport Access Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          {/* Simulated Stylized Map Section */}
          <div className="relative h-72 sm:h-80 bg-slate-100 flex items-center justify-center overflow-hidden border-b border-slate-200">
            {/* Grid Pattern Background simulating map topography */}
            <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:32px_32px]"></div>

            {/* Road lines simulation */}
            <div className="absolute w-full h-8 bg-slate-300/60 top-1/2 -translate-y-1/2 rotate-3"></div>
            <div className="absolute h-full w-8 bg-slate-300/60 left-1/3 rotate-6"></div>

            {/* Location Pin */}
            <div className="relative z-10 text-center animate-bounce">
              <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white shadow-xl flex items-center justify-center mx-auto border-2 border-white">
                <MapPin className="w-6 h-6 fill-white/20" />
              </div>
              <div className="mt-2 bg-white px-3 py-1 rounded-full shadow-md border border-slate-200 text-xs font-bold text-slate-900 inline-block">
                MediCare AI Central Campus
              </div>
            </div>

            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700 font-medium shadow-sm">
              GPS Coordinates: 37.7749° N, 122.4194° W
            </div>
          </div>

          {/* Directions & Logistics Cards */}
          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Patient & Visitor Parking</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Multi-story covered parking structure (P1 & P2) located directly opposite the Outpatient Pavilion. Free 2-hour validation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <Train className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Public Transit Connections</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Metro Red Line station (Medical District Stop) exits directly into our underground pedestrian walkway with wheelchair accessibility.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <Navigation className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Ambulance Bay Entry</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Dedicated high-speed ambulance ramp located at South Gate on Healthcare Blvd. Zero civilian vehicular cross-traffic.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
