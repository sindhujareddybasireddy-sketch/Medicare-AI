import React from 'react';
import { PageId } from '../types';
import { 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Award, 
  ExternalLink 
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLinkClick = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Trust Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-slate-800/80 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-950/60 border border-sky-800/60 flex items-center justify-center text-sky-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">JCI & NABH Accredited</div>
              <div className="text-xs text-slate-400">Exceeding international clinical hospital standards</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-950/60 border border-sky-800/60 flex items-center justify-center text-sky-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Patient Safety First</div>
              <div className="text-xs text-slate-400">99.4% clinical satisfaction across 10,000+ patients</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-950/60 border border-sky-800/60 flex items-center justify-center text-sky-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">24/7 Immediate Response</div>
              <div className="text-xs text-slate-400">Level 1 Emergency & Trauma Center active around the clock</div>
            </div>
          </div>
        </div>

        {/* 4 Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand & Description (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-md shadow-sky-600/30">
                <Heart className="w-4 h-4 fill-white/20 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                MediCare<span className="text-sky-400"> AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              MediCare AI is a multi-specialty tertiary care hospital dedicated to empathetic, evidence-based healthcare. We simplify appointments, medical diagnostics, prescriptions, report insights, and continuous patient recovery.
            </p>
            <div className="pt-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Connect With Us
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="#facebook"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-sky-900 border border-slate-800 hover:border-sky-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  <span className="text-xs font-bold">f</span>
                </a>
                <a
                  href="#twitter"
                  aria-label="Twitter"
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-sky-900 border border-slate-800 hover:border-sky-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  <span className="text-xs font-bold">𝕏</span>
                </a>
                <a
                  href="#linkedin"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-sky-900 border border-slate-800 hover:border-sky-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  <span className="text-xs font-bold">in</span>
                </a>
                <a
                  href="#youtube"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-sky-900 border border-slate-800 hover:border-sky-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  <span className="text-xs font-bold">yt</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleLinkClick('home')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('about')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('doctors')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Doctors Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('appointments')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Book Appointment
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('dashboard')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Patient Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('billing')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Hospital Billing
                </button>
              </li>
            </ul>
          </div>

          {/* Clinical Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Specialties</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleLinkClick('services')}
                  className="text-slate-400 hover:text-white transition-colors text-left"
                >
                  Cardiovascular Care
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('services')}
                  className="text-slate-400 hover:text-white transition-colors text-left"
                >
                  Neurology & Surgery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('services')}
                  className="text-slate-400 hover:text-white transition-colors text-left"
                >
                  Pediatric Health
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('services')}
                  className="text-slate-400 hover:text-white transition-colors text-left"
                >
                  Orthopedics & Joint Clinic
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('pharmacy')}
                  className="text-slate-400 hover:text-white transition-colors text-left"
                >
                  In-House Pharmacy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('tests')}
                  className="text-slate-400 hover:text-white transition-colors text-left"
                >
                  Diagnostic Laboratory
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Contact & Location</h4>
            <div className="space-y-2.5 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>100 Healthcare Boulevard, Medical District, Suite 400</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <a href="tel:18005552273" className="hover:text-white transition-colors">
                  +1 (800) 555-CARE
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href="mailto:care@medicare-ai.org" className="hover:text-white transition-colors">
                  care@medicare-ai.org
                </a>
              </div>
              <div className="pt-2">
                <div className="text-xs font-semibold text-rose-400 uppercase tracking-wide">
                  Emergency Line (24/7)
                </div>
                <div className="text-base font-bold text-white mt-0.5">
                  +1 (800) 911-MEDI
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} MediCare AI Hospital & Healthcare Network. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => handleLinkClick('contact')} className="hover:text-slate-300">
              Privacy Notice
            </button>
            <span>·</span>
            <button onClick={() => handleLinkClick('contact')} className="hover:text-slate-300">
              Patient Rights
            </button>
            <span>·</span>
            <button onClick={() => handleLinkClick('contact')} className="hover:text-slate-300">
              Clinical Quality Guidelines
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
