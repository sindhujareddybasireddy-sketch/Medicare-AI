import React from 'react';
import { PageId } from '../types';
import { 
  Heart, 
  Target, 
  Eye, 
  ShieldCheck, 
  Users, 
  Sparkles, 
  Award, 
  Building2, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-sky-50 via-white to-white py-16 lg:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100/80 px-3 py-1 rounded-md">
              About MediCare AI
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-3 mb-4">
              Pioneering Compassionate, Technologically Refined Care
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              MediCare AI is a premier tertiary care and research hospital uniting world-class clinical specialists, next-generation diagnostics, and seamless digital healthcare experiences.
            </p>
          </div>
        </div>
      </section>

      {/* 1. WHO WE ARE & VISUAL SECTION */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual asset */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100 aspect-[16/10]">
                <img
                  src="/src/assets/images/about_medical_team_1790688882450.jpg"
                  alt="MediCare AI Multi-disciplinary Medical Team"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-md border border-white/70">
                  <div className="text-xs font-bold text-sky-800 uppercase tracking-wider">
                    Multidisciplinary Medical Board
                  </div>
                  <div className="text-sm font-semibold text-slate-800">
                    Over 50 senior faculty, clinical professors, and board-certified surgeons
                  </div>
                </div>
              </div>
            </div>

            {/* Who We Are Prose */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h2 className="text-xs font-bold tracking-wider text-sky-700 uppercase mb-1">
                  Institutional Background
                </h2>
                <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  Who We Are
                </h3>
              </div>

              <p className="text-slate-600 leading-relaxed">
                Founded with the belief that patient wellness should never be slowed down by disjointed paper records or cumbersome hospital queues, <strong>MediCare AI</strong> has grown into a premier medical center featuring 12 clinical centers of excellence.
              </p>

              <p className="text-slate-600 leading-relaxed">
                We combine rigorous evidence-based clinical medicine with state-of-the-art diagnostic equipment—from ultra-high field 3.0T MRI scanners to fully automated biochemistry laboratories—ensuring every patient receives prompt, accurate, and deeply personalized clinical attention.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-2xl font-bold text-slate-900">450+</div>
                  <div className="text-xs text-slate-500 mt-1">Inpatient & ICU Beds</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-2xl font-bold text-slate-900">100%</div>
                  <div className="text-xs text-slate-500 mt-1">Digitized Medical Records</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MISSION & VISION */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Our Mission */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed text-base">
                To elevate the standard of patient health by delivering transparent, accessible, and uncompromising clinical care through innovative diagnostic infrastructure, experienced medical practitioners, and seamless digital patient services.
              </p>
              <div className="mt-6 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Zero-delay critical care pathways</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Transparent treatment pricing and clear billing</span>
                </div>
              </div>
            </div>

            {/* Our Vision */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed text-base">
                To become the benchmark for integrated digital healthcare across the nation, where medical consultations, diagnostic analyses, prescription fulfillments, and long-term recovery plans operate in frictionless harmony for every patient.
              </p>
              <div className="mt-6 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Continuous preventative health tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Global academic and clinical collaborative research</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR VALUES (4 Cards) */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-wider text-sky-700 uppercase mb-2">
              Guiding Clinical Principles
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Our Core Values
            </h3>
            <p className="mt-3 text-slate-600 text-base">
              The foundational ethical and medical commitments that shape every clinical decision and patient interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Value 1: Patient First */}
            <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200 hover:border-sky-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-5">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Patient First</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Every clinical diagnosis, treatment protocol, and operational decision is oriented around patient safety, comfort, and informed consent.
              </p>
            </div>

            {/* Value 2: Compassion */}
            <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200 hover:border-sky-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-5">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Compassion</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                We believe genuine medical healing combines technological precision with deep empathy, active listening, and family-centered support.
              </p>
            </div>

            {/* Value 3: Innovation */}
            <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200 hover:border-sky-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-5">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Innovation</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Continuous adoption of robotic-assisted surgery, rapid automated pathology, and digital clinical analyzers to eliminate diagnostic errors.
              </p>
            </div>

            {/* Value 4: Excellence */}
            <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200 hover:border-sky-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-5">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Excellence</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Rigorous peer reviews, strict adherence to global healthcare protocols, and continuous medical education for all clinicians and nursing staff.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOSPITAL ACCREDITATION & SAFETY */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2">
              <div className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                Recognized International Standing
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Certified by the World’s Leading Healthcare Authorities
              </h3>
              <p className="text-slate-400 text-sm max-w-xl">
                MediCare AI adheres to stringent global standards for infection control, surgical safety checklists, and pharmacy dispensing accuracy.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 text-center min-w-[140px]">
                <div className="text-sky-400 font-bold text-lg">JCI Gold</div>
                <div className="text-xs text-slate-400 mt-0.5">Seal of Approval</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 text-center min-w-[140px]">
                <div className="text-sky-400 font-bold text-lg">ISO 9001:2015</div>
                <div className="text-xs text-slate-400 mt-0.5">Certified Facility</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 text-center min-w-[140px]">
                <div className="text-sky-400 font-bold text-lg">NABH</div>
                <div className="text-xs text-slate-400 mt-0.5">Accredited Hospital</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            Experience the MediCare AI Difference
          </h3>
          <p className="text-slate-600 text-base mb-6 max-w-xl mx-auto">
            Schedule a consultation with our department heads or explore our 12 specialized clinical departments today.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('appointments')}
              className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl transition-colors shadow-md shadow-sky-600/20"
            >
              Book an Appointment
            </button>
            <button
              onClick={() => onNavigate('doctors')}
              className="px-6 py-3 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-semibold rounded-xl transition-colors"
            >
              Meet Our Doctors
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
