import React, { useState, useMemo } from 'react';
import { PageId, Doctor } from '../types';
import { DOCTORS } from '../data/mockData';
import { 
  Search, 
  Calendar, 
  Clock, 
  DollarSign, 
  Star, 
  Filter, 
  CheckCircle2, 
  X, 
  Award, 
  Languages, 
  GraduationCap 
} from 'lucide-react';

interface DoctorsPageProps {
  onNavigate: (page: PageId) => void;
  onSelectDoctorForBooking: (doctorName: string, department: string) => void;
}

export const DoctorsPage: React.FC<DoctorsPageProps> = ({
  onNavigate,
  onSelectDoctorForBooking,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');
  const [activeDoctorModal, setActiveDoctorModal] = useState<Doctor | null>(null);

  // Extract unique specializations
  const specializations = useMemo(() => {
    const list = Array.from(new Set(DOCTORS.map((d) => d.specialization)));
    return ['All', ...list];
  }, []);

  const availabilityOptions = ['All', 'Available Today', 'Available Tomorrow', 'Next Available Mon'];

  // Filter doctors
  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.bio.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSpec =
        selectedSpecialization === 'All' || doc.specialization === selectedSpecialization;

      const matchesAvail =
        selectedAvailability === 'All' || doc.availabilityStatus === selectedAvailability;

      return matchesSearch && matchesSpec && matchesAvail;
    });
  }, [searchQuery, selectedSpecialization, selectedAvailability]);

  const handleBookDoctor = (doc: Doctor) => {
    onSelectDoctorForBooking(doc.name, doc.specialization);
    onNavigate('appointments');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Page Header */}
      <section className="bg-white border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-md">
              Medical Directory
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-3 mb-4">
              Find a Specialist Doctor
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Explore our team of board-certified clinicians, professors, and surgeons. Schedule an outpatient consultation with transparent fees and immediate availability.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-6">
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-200 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by doctor name, specialty, condition, or keyword..."
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-semibold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Specialization Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-300 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec === 'All' ? 'All Specializations' : spec}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-300 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {availabilityOptions.map((avail) => (
                  <option key={avail} value={avail}>
                    {avail === 'All' ? 'All Availability' : avail}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Active Filter Badges */}
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <div>
              Showing <span className="font-bold text-slate-900">{filteredDoctors.length}</span> of {DOCTORS.length} qualified specialists
            </div>
            {(searchQuery || selectedSpecialization !== 'All' || selectedAvailability !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSpecialization('All');
                  setSelectedAvailability('All');
                }}
                className="text-sky-700 hover:underline font-semibold"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 p-8">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No doctors match your criteria</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
              Try adjusting your specialty filter, availability setting, or search query.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSpecialization('All');
                setSelectedAvailability('All');
              }}
              className="mt-4 px-4 py-2 bg-sky-600 text-white rounded-xl text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between"
              >
                {/* Header Profile Info */}
                <div>
                  <div className="p-6 border-b border-slate-100 flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-600 to-blue-700 text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0">
                      {doc.name.split(' ')[1]?.[0] || 'D'}
                      {doc.name.split(' ')[2]?.[0] || 'R'}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-semibold text-sky-700">
                          {doc.specialization}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-amber-600 font-semibold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{doc.rating}</span>
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 truncate mt-0.5">
                        {doc.name}
                      </h3>
                      <p className="text-xs text-slate-500 truncate">
                        {doc.title}
                      </p>
                    </div>
                  </div>

                  {/* Body Specs */}
                  <div className="p-6 space-y-3.5 text-xs">
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-slate-500">Experience</span>
                      <span className="font-semibold text-slate-900">{doc.experience}</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-slate-500">Consultation Fee</span>
                      <span className="font-bold text-slate-900 text-sm">${doc.consultationFee}</span>
                    </div>

                    <div className="flex items-start justify-between text-slate-600">
                      <span className="text-slate-500">Available Days</span>
                      <div className="flex flex-wrap gap-1 justify-end max-w-[180px]">
                        {doc.availableDays.map((day) => (
                          <span
                            key={day}
                            className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[10px]"
                          >
                            {day}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-slate-500">Hours</span>
                      <span className="font-medium text-slate-800">{doc.availableHours}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-slate-500">Current Status</span>
                      <span
                        className={`inline-flex items-center gap-1.5 font-semibold text-xs ${
                          doc.availabilityStatus === 'Available Today'
                            ? 'text-emerald-700'
                            : doc.availabilityStatus === 'Available Tomorrow'
                            ? 'text-sky-700'
                            : 'text-slate-600'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            doc.availabilityStatus === 'Available Today'
                              ? 'bg-emerald-500'
                              : 'bg-sky-500'
                          }`}
                        ></span>
                        {doc.availabilityStatus}
                      </span>
                    </div>

                    <p className="text-slate-600 line-clamp-2 pt-2 border-t border-slate-100 leading-relaxed">
                      {doc.bio}
                    </p>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-6 pt-0 space-y-2">
                  <button
                    onClick={() => handleBookDoctor(doc)}
                    className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Appointment</span>
                  </button>

                  <button
                    onClick={() => setActiveDoctorModal(doc)}
                    className="w-full py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                  >
                    View Doctor Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Doctor Detailed Profile Modal */}
      {activeDoctorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveDoctorModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-sky-600 to-blue-700 text-white flex items-center justify-center font-bold text-2xl shadow-lg shrink-0">
                {activeDoctorModal.name.split(' ')[1]?.[0] || 'D'}
                {activeDoctorModal.name.split(' ')[2]?.[0] || 'R'}
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                  {activeDoctorModal.specialization} · {activeDoctorModal.department}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  {activeDoctorModal.name}
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  {activeDoctorModal.title}
                </p>

                <div className="flex items-center gap-3 mt-2 text-xs text-slate-600">
                  <div className="flex items-center gap-1 text-amber-500 font-semibold">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{activeDoctorModal.rating}</span>
                  </div>
                  <span>·</span>
                  <span>{activeDoctorModal.reviewCount} Verified Patient Reviews</span>
                </div>
              </div>
            </div>

            {/* Clinical Bio */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 border-t border-b border-slate-100 py-5 my-5">
              <div>
                <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <Award className="w-4 h-4 text-sky-600" />
                  Clinical Specialty & Focus
                </h4>
                <p className="text-slate-600 leading-relaxed">{activeDoctorModal.bio}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-sky-600" />
                  Academic Medical Training
                </h4>
                <p className="text-slate-600">{activeDoctorModal.education}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <Languages className="w-4 h-4 text-sky-600" />
                  Languages Spoken
                </h4>
                <p className="text-slate-600">{activeDoctorModal.languages.join(', ')}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-xs text-slate-500 block">Outpatient Consultation Fee</span>
                  <span className="text-lg font-bold text-slate-900">${activeDoctorModal.consultationFee}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Available Clinic Hours</span>
                  <span className="text-sm font-semibold text-slate-800">{activeDoctorModal.availableHours}</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const doc = activeDoctorModal;
                  setActiveDoctorModal(null);
                  handleBookDoctor(doc);
                }}
                className="flex-1 py-3 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-md shadow-sky-600/20"
              >
                Schedule Appointment With {activeDoctorModal.name.split(' ')[1] || activeDoctorModal.name}
              </button>
              <button
                onClick={() => setActiveDoctorModal(null)}
                className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-colors"
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
