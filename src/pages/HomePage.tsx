import React, { useState } from 'react';
import { PageId, Doctor } from '../types';
import { DOCTORS, SERVICES, TESTIMONIALS } from '../data/mockData';
import { 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  Activity, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  PhoneCall, 
  Star, 
  Stethoscope, 
  HeartPulse, 
  Brain, 
  Baby, 
  Bone, 
  X, 
  Building2 
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSelectDoctorForBooking: (doctorName: string, department: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectDoctorForBooking,
}) => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  // Featured 6 services for the homepage
  const featuredServices = SERVICES.slice(0, 6);
  // Featured 4 doctors
  const featuredDoctors = DOCTORS.slice(0, 4);

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Stethoscope':
        return <Stethoscope className="w-6 h-6 text-sky-600" />;
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-sky-600" />;
      case 'Brain':
        return <Brain className="w-6 h-6 text-sky-600" />;
      case 'Baby':
        return <Baby className="w-6 h-6 text-sky-600" />;
      case 'Bone':
        return <Bone className="w-6 h-6 text-sky-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-sky-600" />;
    }
  };

  const handleBookDoctor = (doc: Doctor) => {
    onSelectDoctorForBooking(doc.name, doc.specialization);
    onNavigate('appointments');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-white pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-sky-100/80 text-sky-800 text-xs font-semibold tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-sky-600"></span>
                Next-Generation Tertiary Healthcare
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] text-balance">
                Smart Healthcare. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700">
                  Better Care.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl text-balance">
                A modern healthcare platform designed to simplify appointments, medical services, prescriptions, reports, and patient care.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('appointments')}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-sky-600 to-blue-700 rounded-xl hover:from-sky-700 hover:to-blue-800 transition-all shadow-lg shadow-sky-600/25 active:scale-95 whitespace-nowrap"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book an Appointment</span>
                </button>

                <button
                  onClick={() => onNavigate('services')}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 text-base font-semibold text-slate-800 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm active:scale-95 whitespace-nowrap"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/80 max-w-lg">
                <div>
                  <div className="text-2xl font-bold text-slate-900 tabular-nums">99.4%</div>
                  <div className="text-xs text-slate-500 mt-0.5">Clinical Satisfaction</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 tabular-nums">&lt; 15 min</div>
                  <div className="text-xs text-slate-500 mt-0.5">Average Triage Time</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 tabular-nums">100%</div>
                  <div className="text-xs text-slate-500 mt-0.5">Board-Certified MDs</div>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Hospital Asset */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-100 aspect-[16/10] sm:aspect-[4/3]">
                <img
                  src="/src/assets/images/hero_hospital_exterior_1790688861271.jpg"
                  alt="MediCare AI Modern Hospital Pavilion"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent"></div>

                {/* Overlaid Floating Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/60">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-sky-700 uppercase tracking-wider">
                          Central Medical Pavilion
                        </div>
                        <div className="text-sm font-bold text-slate-900">
                          Main Hospital Campus & Emergency Center
                        </div>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Open 24/7
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY CHOOSE US (4 Feature Cards) */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold tracking-wider text-sky-700 uppercase mb-2">
              The MediCare AI Standard
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Why Choose Us
            </h3>
            <p className="mt-3 text-slate-600 text-base">
              Built from the ground up to combine clinical excellence with smooth digital workflows for every patient.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-5">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Experienced Doctors</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Consult with over 50 leading department heads, surgeons, and specialists trained at premier international academic medical centers.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-5">
                <Activity className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Advanced Medical Services</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                State-of-the-art 3T MRI, digital cath-labs, high-precision laparoscopic suites, and high-complexity intensive care facilities.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-5">
                <Calendar className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Easy Appointments</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Instant self-service scheduling with transparent doctor availability, zero waiting lines, and automated calendar reminders.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Digital Healthcare</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Single-pane digital records: upload prescriptions, review diagnostic test reports, check pharmacy stock, and settle bills online.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR SERVICES (6 featured cards) */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <h2 className="text-xs font-bold tracking-wider text-sky-700 uppercase mb-2">
                Specialized Clinical Departments
              </h2>
              <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Our Services
              </h3>
              <p className="mt-2 text-slate-600 text-base max-w-xl">
                Comprehensive healthcare delivered across multidisciplinary centers of medical excellence.
              </p>
            </div>
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-800 transition-colors"
            >
              <span>View All 12 Hospital Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <span className="text-xs font-medium text-slate-500">
                      {service.category}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-slate-900 mb-2">
                    {service.name}
                  </h4>
                  <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  <div className="space-y-1.5 mb-6 text-xs text-slate-600">
                    {service.features.slice(0, 2).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Head: {service.headDoctor}</span>
                  <button
                    onClick={() => onNavigate('services')}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-800"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OUR DOCTORS */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <h2 className="text-xs font-bold tracking-wider text-sky-700 uppercase mb-2">
                Medical Leadership
              </h2>
              <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Our Doctors
              </h3>
              <p className="mt-2 text-slate-600 text-base max-w-xl">
                Dedicated clinicians and professors renowned for compassionate consultations and surgical precision.
              </p>
            </div>
            <button
              onClick={() => onNavigate('doctors')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-800 transition-colors"
            >
              <span>Explore Complete Directory</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                {/* Doctor Avatar / Header */}
                <div className="bg-gradient-to-br from-sky-600 to-blue-800 p-6 text-white text-center relative">
                  <div className="w-20 h-20 rounded-full mx-auto bg-white/20 border-2 border-white/60 flex items-center justify-center font-bold text-2xl mb-3 shadow-inner">
                    {doc.name.split(' ')[1]?.[0] || 'D'}
                    {doc.name.split(' ')[2]?.[0] || 'R'}
                  </div>
                  <h4 className="text-base font-bold text-white leading-tight">
                    {doc.name}
                  </h4>
                  <div className="text-xs text-sky-100 mt-1">
                    {doc.specialization}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Experience</span>
                      <span className="font-semibold text-slate-800">{doc.experience}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Department</span>
                      <span className="font-medium text-slate-800 truncate max-w-[130px]">{doc.department}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Fee</span>
                      <span className="font-bold text-slate-900">${doc.consultationFee}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-slate-500">Rating</span>
                      <div className="flex items-center gap-1 text-amber-600 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{doc.rating}</span>
                        <span className="text-slate-400 font-normal">({doc.reviewCount})</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                    <button
                      onClick={() => handleBookDoctor(doc)}
                      className="w-full py-2 px-3 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Appointment</span>
                    </button>
                    <button
                      onClick={() => setSelectedDoctor(doc)}
                      className="w-full py-2 px-3 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (4 steps) */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-wider text-sky-700 uppercase mb-2">
              Effortless Patient Journey
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              How It Works
            </h3>
            <p className="mt-3 text-slate-600 text-base">
              Four streamlined steps to arrange professional consultation and ongoing hospital care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="relative bg-slate-50 rounded-2xl p-7 border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-sky-600 text-white font-extrabold flex items-center justify-center text-sm mb-4">
                01
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Choose a Doctor</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Filter by medical specialty, experience, available days, and clinical credentials.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative bg-slate-50 rounded-2xl p-7 border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-sky-600 text-white font-extrabold flex items-center justify-center text-sm mb-4">
                02
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Book an Appointment</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Select your preferred calendar date and specific morning or afternoon time slot.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative bg-slate-50 rounded-2xl p-7 border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-sky-600 text-white font-extrabold flex items-center justify-center text-sm mb-4">
                03
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Get Consultation</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Visit our outpatient center or connect for clinical reviews with immediate triage.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative bg-slate-50 rounded-2xl p-7 border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-sky-600 text-white font-extrabold flex items-center justify-center text-sm mb-4">
                04
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Manage Your Healthcare</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Access digitised prescriptions, test results, pharmacy items, and bills in one portal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PATIENT STATISTICS */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            <div className="pt-4 lg:pt-0">
              <div className="text-4xl lg:text-5xl font-black text-sky-400 tabular-nums mb-1">
                50+
              </div>
              <div className="text-base font-semibold text-white">Doctors & Surgeons</div>
              <div className="text-xs text-slate-400 mt-1">Across 12 Major Disciplines</div>
            </div>

            <div className="pt-4 lg:pt-0">
              <div className="text-4xl lg:text-5xl font-black text-sky-400 tabular-nums mb-1">
                10+
              </div>
              <div className="text-base font-semibold text-white">Clinical Departments</div>
              <div className="text-xs text-slate-400 mt-1">Full Inpatient & Outpatient Units</div>
            </div>

            <div className="pt-4 lg:pt-0">
              <div className="text-4xl lg:text-5xl font-black text-sky-400 tabular-nums mb-1">
                10,000+
              </div>
              <div className="text-base font-semibold text-white">Patients Cared For</div>
              <div className="text-xs text-slate-400 mt-1">With 99.4% Reported Satisfaction</div>
            </div>

            <div className="pt-4 lg:pt-0">
              <div className="text-4xl lg:text-5xl font-black text-sky-400 tabular-nums mb-1">
                24/7
              </div>
              <div className="text-base font-semibold text-white">Emergency Support</div>
              <div className="text-xs text-slate-400 mt-1">Level 1 Trauma & Mobile Ambulance</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold tracking-wider text-sky-700 uppercase mb-2">
              Patient Experiences
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              What Our Patients Say
            </h3>
            <p className="mt-3 text-slate-600 text-base">
              Real accounts of recovery, diagnosis, and patient-centered hospital attention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 italic leading-relaxed mb-6">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {t.age} yrs · {t.city}
                  </div>
                  <div className="text-xs font-medium text-sky-700 mt-1">
                    {t.treatment}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. QUICK CTA SECTION */}
      <section className="py-16 bg-gradient-to-r from-sky-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Need Immediate Medical Consultation?
              </h3>
              <p className="text-sky-100 text-base max-w-xl">
                Our specialists and 24/7 emergency trauma team are ready to assist you anytime.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('appointments')}
                className="px-6 py-3.5 rounded-xl bg-white text-sky-800 font-bold hover:bg-sky-50 transition-colors shadow-md shadow-black/10 whitespace-nowrap"
              >
                Book Appointment Online
              </button>
              <a
                href="tel:18005552273"
                className="px-6 py-3.5 rounded-xl bg-sky-800/80 hover:bg-sky-800 text-white font-semibold border border-sky-400/30 transition-colors inline-flex items-center gap-2 whitespace-nowrap"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call +1 (800) 555-CARE</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Profile Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xl">
                {selectedDoctor.name.split(' ')[1]?.[0] || 'D'}
                {selectedDoctor.name.split(' ')[2]?.[0] || 'R'}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{selectedDoctor.name}</h3>
                <p className="text-xs text-sky-700 font-semibold">{selectedDoctor.title}</p>
                <p className="text-xs text-slate-500">{selectedDoctor.department}</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-700 border-t border-b border-slate-100 py-4 my-4">
              <div>
                <span className="font-semibold text-slate-900 block mb-0.5">Clinical Biography:</span>
                <p className="text-slate-600 leading-relaxed">{selectedDoctor.bio}</p>
              </div>
              <div>
                <span className="font-semibold text-slate-900 block mb-0.5">Education & Credentials:</span>
                <p className="text-slate-600">{selectedDoctor.education}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div>
                  <span className="text-slate-500 block">Consultation Fee:</span>
                  <span className="font-bold text-slate-900 text-sm">${selectedDoctor.consultationFee}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Available Hours:</span>
                  <span className="font-medium text-slate-900">{selectedDoctor.availableHours}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const doc = selectedDoctor;
                  setSelectedDoctor(null);
                  handleBookDoctor(doc);
                }}
                className="flex-1 py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                Book with {selectedDoctor.name.split(' ')[1] || selectedDoctor.name}
              </button>
              <button
                onClick={() => setSelectedDoctor(null)}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
