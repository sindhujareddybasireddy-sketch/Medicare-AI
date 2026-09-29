import React, { useState, useEffect, useMemo } from 'react';
import { PageId, Doctor } from '../types';
import { DOCTORS } from '../data/mockData';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  CheckCircle2, 
  Printer, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  X 
} from 'lucide-react';

interface AppointmentsPageProps {
  onNavigate: (page: PageId) => void;
  preselectedDoctorName?: string;
  preselectedDepartment?: string;
  onAppointmentBooked?: (appointment: any) => void;
}

interface ConfirmedAppointmentData {
  appointmentId: string;
  patientName: string;
  age: string;
  gender: string;
  phone: string;
  email: string;
  department: string;
  doctorName: string;
  date: string;
  time: string;
  reason: string;
  fee: number;
}

export const AppointmentsPage: React.FC<AppointmentsPageProps> = ({
  onNavigate,
  preselectedDoctorName,
  preselectedDepartment,
  onAppointmentBooked,
}) => {
  // Form State
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState(preselectedDepartment || 'Cardiology');
  const [selectedDoctorName, setSelectedDoctorName] = useState(preselectedDoctorName || '');
  const [appointmentDate, setAppointmentDate] = useState('2026-10-08');
  const [appointmentTime, setAppointmentTime] = useState('09:30 AM');
  const [reason, setReason] = useState('');
  
  // Validation / Confirmation modal state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedData, setConfirmedData] = useState<ConfirmedAppointmentData | null>(null);

  // Departments list
  const departments = useMemo(() => {
    return Array.from(new Set(DOCTORS.map((d) => d.specialization)));
  }, []);

  // Doctors filtered by current department
  const availableDoctors = useMemo(() => {
    return DOCTORS.filter((d) => d.specialization === department);
  }, [department]);

  // Set default doctor when department changes or upon initialization
  useEffect(() => {
    if (preselectedDoctorName) {
      const match = DOCTORS.find((d) => d.name === preselectedDoctorName);
      if (match) {
        setDepartment(match.specialization);
        setSelectedDoctorName(match.name);
        return;
      }
    }

    if (availableDoctors.length > 0 && !availableDoctors.some((d) => d.name === selectedDoctorName)) {
      setSelectedDoctorName(availableDoctors[0].name);
    }
  }, [department, availableDoctors, preselectedDoctorName]);

  const activeDoctorObj = useMemo(() => {
    return DOCTORS.find((d) => d.name === selectedDoctorName) || availableDoctors[0];
  }, [selectedDoctorName, availableDoctors]);

  const timeSlots = [
    '08:30 AM',
    '09:00 AM',
    '09:30 AM',
    '10:15 AM',
    '11:00 AM',
    '11:45 AM',
    '02:00 PM',
    '02:45 PM',
    '03:30 PM',
    '04:15 PM',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!patientName.trim()) errs.patientName = 'Please enter patient name';
    if (!age || Number(age) <= 0) errs.age = 'Valid age is required';
    if (!phone.trim()) errs.phone = 'Phone number is required';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email is required';
    if (!appointmentDate) errs.appointmentDate = 'Please select a date';
    if (!reason.trim()) errs.reason = 'Brief reason for consultation is required';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    const randomId = `MCA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const fee = activeDoctorObj ? activeDoctorObj.consultationFee : 120;

    const data: ConfirmedAppointmentData = {
      appointmentId: randomId,
      patientName,
      age,
      gender,
      phone,
      email,
      department,
      doctorName: activeDoctorObj ? activeDoctorObj.name : selectedDoctorName,
      date: appointmentDate,
      time: appointmentTime,
      reason,
      fee,
    };

    setConfirmedData(data);
    if (onAppointmentBooked) {
      onAppointmentBooked(data);
    }
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Top Banner */}
      <section className="bg-white border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-md">
              Hospital Outpatient Services
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-3 mb-4">
              Book a Medical Appointment
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Schedule direct face-to-face or clinical review consultations with our board-certified physicians. Confirmation slips are issued immediately.
            </p>
          </div>
        </div>
      </section>

      {/* Main Booking Form Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. Patient Identification */}
            <div>
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
                <User className="w-5 h-5 text-sky-600" />
                <h3 className="text-base font-bold text-slate-900">
                  1. Patient Information
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Alexander Hayes"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                      errors.patientName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    }`}
                  />
                  {errors.patientName && (
                    <span className="text-xs text-rose-600 mt-1 block">{errors.patientName}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Age *
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="e.g. 43"
                    min="1"
                    max="120"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                      errors.age ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    }`}
                  />
                  {errors.age && (
                    <span className="text-xs text-rose-600 mt-1 block">{errors.age}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Gender *
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                      errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    }`}
                  />
                  {errors.phone && (
                    <span className="text-xs text-rose-600 mt-1 block">{errors.phone}</span>
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
                    placeholder="patient@example.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                      errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-xs text-rose-600 mt-1 block">{errors.email}</span>
                  )}
                </div>
              </div>
            </div>

            {/* 2. Clinical Department & Doctor Selection */}
            <div>
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
                <ShieldCheck className="w-5 h-5 text-sky-600" />
                <h3 className="text-base font-bold text-slate-900">
                  2. Select Department & Doctor
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Select Department *
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Select Doctor *
                  </label>
                  <select
                    value={selectedDoctorName}
                    onChange={(e) => setSelectedDoctorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    {availableDoctors.map((doc) => (
                      <option key={doc.id} value={doc.name}>
                        {doc.name} (${doc.consultationFee})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active Doctor Snapshot */}
              {activeDoctorObj && (
                <div className="mt-4 p-4 rounded-xl bg-sky-50/70 border border-sky-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block text-sm">
                      {activeDoctorObj.name}
                    </span>
                    <span className="text-slate-600">
                      {activeDoctorObj.title} · {activeDoctorObj.experience}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-700">
                    <div>
                      <span className="text-slate-500 block">Consultation Fee</span>
                      <span className="font-bold text-sky-800 text-sm">
                        ${activeDoctorObj.consultationFee}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Availability</span>
                      <span className="font-medium text-emerald-700">
                        {activeDoctorObj.availabilityStatus}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Schedule & Slot */}
            <div>
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
                <Clock className="w-5 h-5 text-sky-600" />
                <h3 className="text-base font-bold text-slate-900">
                  3. Select Date & Time Slot
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Appointment Date *
                  </label>
                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  {errors.appointmentDate && (
                    <span className="text-xs text-rose-600 mt-1 block">{errors.appointmentDate}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Select Available Time Slot *
                  </label>
                  <select
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 4. Reason for Visit */}
            <div>
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
                <FileText className="w-5 h-5 text-sky-600" />
                <h3 className="text-base font-bold text-slate-900">
                  4. Reason for Visit
                </h3>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Describe symptoms, existing condition, or required follow-up *
                </label>
                <textarea
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g. Experiencing mild shortness of breath upon exertion and irregular morning heartbeats. Requesting routine follow-up evaluation."
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                    errors.reason ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                  }`}
                ></textarea>
                {errors.reason && (
                  <span className="text-xs text-rose-600 mt-1 block">{errors.reason}</span>
                )}
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                Appointments are held for 15 minutes. No upfront prepayment required.
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all shadow-md shadow-sky-600/25 active:scale-95"
              >
                Confirm Appointment
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Confirmation Modal */}
      {confirmedData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95">
            <button
              onClick={() => setConfirmedData(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="text-center pb-6 border-b border-slate-100">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-3">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Appointment Confirmed
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Your consultation has been successfully logged with our hospital registry.
              </p>
            </div>

            {/* Modal Details Summary */}
            <div className="py-5 space-y-3 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Appointment ID:</span>
                <span className="font-mono font-bold text-sky-700 text-sm">
                  {confirmedData.appointmentId}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-slate-500 block text-xs">Patient Name</span>
                  <span className="font-semibold text-slate-900">{confirmedData.patientName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Age / Gender</span>
                  <span className="font-semibold text-slate-900">
                    {confirmedData.age} yrs · {confirmedData.gender}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-500 block text-xs">Doctor</span>
                  <span className="font-semibold text-slate-900">{confirmedData.doctorName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Department</span>
                  <span className="font-semibold text-slate-900">{confirmedData.department}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-sky-50/60 border border-sky-200">
                <div>
                  <span className="text-slate-500 block text-xs">Scheduled Date</span>
                  <span className="font-bold text-slate-900">{confirmedData.date}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Time Slot</span>
                  <span className="font-bold text-sky-800">{confirmedData.time}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-500 text-xs">Consultation Fee</span>
                <span className="text-base font-bold text-slate-900">${confirmedData.fee}</span>
              </div>
            </div>

            {/* Modal Action Buttons */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handlePrintSlip}
                className="w-full sm:flex-1 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Booking Slip</span>
              </button>

              <button
                onClick={() => {
                  setConfirmedData(null);
                  onNavigate('dashboard');
                }}
                className="w-full sm:flex-1 py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <span>Go to Dashboard</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
