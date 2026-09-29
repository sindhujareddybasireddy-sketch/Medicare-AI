import React, { useState } from 'react';
import { PageId, Service } from '../types';
import { SERVICES } from '../data/mockData';
import { 
  Stethoscope, 
  HeartPulse, 
  Brain, 
  Baby, 
  Bone, 
  Sparkles, 
  Activity, 
  Smile, 
  Ear, 
  HeartHandshake, 
  Ambulance, 
  Microscope, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  X, 
  Calendar 
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
  onSelectDoctorForBooking: (doctorName: string, department: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onSelectDoctorForBooking,
}) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
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
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-sky-600" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-sky-600" />;
      case 'Ear':
        return <Ear className="w-6 h-6 text-sky-600" />;
      case 'Smile':
        return <Smile className="w-6 h-6 text-sky-600" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-sky-600" />;
      case 'Ambulance':
        return <Ambulance className="w-6 h-6 text-rose-600" />;
      case 'Microscope':
        return <Microscope className="w-6 h-6 text-sky-600" />;
      default:
        return <Activity className="w-6 h-6 text-sky-600" />;
    }
  };

  const handleBookService = (service: Service) => {
    // Map service to department
    onSelectDoctorForBooking('', service.name.split(' ')[0]);
    onNavigate('appointments');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Page Header */}
      <section className="bg-white border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-md">
              Centers of Clinical Excellence
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-3 mb-4">
              Comprehensive Hospital Services
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              MediCare AI provides a complete continuum of primary, surgical, emergency, and rehabilitative disciplines powered by accredited medical staff and advanced diagnostics.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid (12 Services) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className={`bg-white rounded-2xl p-7 border transition-all flex flex-col justify-between ${
                service.name.includes('Emergency')
                  ? 'border-rose-200 hover:border-rose-400 shadow-sm'
                  : 'border-slate-200 hover:border-sky-300 shadow-sm hover:shadow-md'
              }`}
            >
              <div>
                {/* Header Icon + Category */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      service.name.includes('Emergency')
                        ? 'bg-rose-50 text-rose-600'
                        : 'bg-sky-50 text-sky-600'
                    }`}
                  >
                    {getServiceIcon(service.iconName)}
                  </div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {service.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {service.name}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Key clinical capabilities */}
                <div className="space-y-2 mb-6">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Core Procedures & Focus
                  </span>
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Department Head</span>
                  <span className="text-xs font-semibold text-slate-800">
                    {service.headDoctor}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedService(service)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-sky-700 hover:bg-sky-50 transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center">
                {getServiceIcon(selectedService.iconName)}
              </div>
              <div>
                <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">
                  {selectedService.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {selectedService.name}
                </h3>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 border-t border-b border-slate-100 py-4 my-4">
              <p className="text-slate-600 leading-relaxed">
                {selectedService.description}
              </p>

              <div>
                <h4 className="font-bold text-slate-900 mb-2">Specialized Diagnostic & Treatment Capabilities:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedService.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg text-xs font-medium text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Clinical Lead</span>
                  </div>
                  <div className="font-semibold text-slate-900 text-xs">{selectedService.headDoctor}</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Operating Hours</span>
                  </div>
                  <div className="font-semibold text-slate-900 text-xs">{selectedService.operatingHours}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const srv = selectedService;
                  setSelectedService(null);
                  handleBookService(srv);
                }}
                className="flex-1 py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-md shadow-sky-600/20"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Consultation for this Service</span>
              </button>
              <button
                onClick={() => setSelectedService(null)}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
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
