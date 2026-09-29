import React, { useState } from 'react';
import { PageId } from '../types';
import { PATIENT_HISTORY } from '../data/mockData';
import { 
  User, 
  Calendar, 
  FileText, 
  Activity, 
  Receipt, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  ArrowRight, 
  UploadCloud, 
  ExternalLink, 
  Phone, 
  Mail, 
  MapPin, 
  Pill, 
  X 
} from 'lucide-react';

interface PatientDashboardPageProps {
  onNavigate: (page: PageId) => void;
  onShowToast: (type: 'success' | 'info' | 'warning', title: string, message?: string) => void;
}

export const PatientDashboardPage: React.FC<PatientDashboardPageProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [profile, setProfile] = useState(PATIENT_HISTORY.profile);
  const [upcoming, setUpcoming] = useState(PATIENT_HISTORY.upcomingAppointment);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [activeReportModal, setActiveReportModal] = useState<any | null>(null);

  const handleCancelAppointment = () => {
    setShowCancelModal(false);
    setUpcoming(null as any);
    onShowToast('info', 'Appointment Cancelled', 'Your upcoming consultation has been removed from the schedule.');
  };

  const handleDownloadPrescription = (rxId: string) => {
    onShowToast('success', 'Prescription Downloaded', `Document #${rxId} saved to your device.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Top Banner */}
      <section className="bg-white border-b border-slate-200 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-md">
                Patient Health Portal
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
                Welcome back, {profile.name}
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Medical Record ID: <span className="font-mono font-bold text-slate-700">{profile.patientId}</span> · Blood Group: <span className="font-semibold text-rose-600">{profile.bloodGroup}</span>
              </p>
            </div>

            {/* Quick Action Bar */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => onNavigate('appointments')}
                className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>

              <button
                onClick={() => onNavigate('prescription-analyzer')}
                className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5"
              >
                <UploadCloud className="w-4 h-4 text-sky-600" />
                <span>Upload Rx</span>
              </button>

              <button
                onClick={() => onNavigate('report-analyzer')}
                className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5"
              >
                <Activity className="w-4 h-4 text-sky-600" />
                <span>Upload Report</span>
              </button>

              <button
                onClick={() => onNavigate('billing')}
                className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5"
              >
                <Receipt className="w-4 h-4 text-sky-600" />
                <span>View Bills</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 space-y-8">
        {/* Row 1: Profile Card + Upcoming Appointment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Patient Profile Snapshot (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-lg">
                  AH
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{profile.name}</h3>
                  <div className="text-xs text-slate-500">{profile.age} Years · {profile.gender}</div>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{profile.address}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Primary Attending</span>
                <span className="font-semibold text-slate-900">{profile.primaryDoctor}</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold text-[11px]">
                Active Inpatient / Outpatient File
              </span>
            </div>
          </div>

          {/* Upcoming Appointment (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-sky-600" />
                  <h3 className="font-bold text-slate-900 text-base">
                    Upcoming Consultation
                  </h3>
                </div>
                {upcoming && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    {upcoming.status}
                  </span>
                )}
              </div>

              {upcoming ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200">
                    <div className="text-base font-bold text-slate-900">{upcoming.doctor}</div>
                    <div className="text-xs text-sky-800 font-semibold mt-0.5">{upcoming.department}</div>
                    <div className="text-xs text-slate-500 mt-1">{upcoming.location}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-500 block">Scheduled Date</span>
                      <span className="font-bold text-slate-900 text-sm">{upcoming.date}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Time Slot</span>
                      <span className="font-bold text-sky-800 text-sm">{upcoming.time}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 text-xs">
                  No upcoming appointments scheduled.
                </div>
              )}
            </div>

            {upcoming && (
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
                <span className="text-slate-500">Consultation Fee: ${upcoming.fee}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('appointments')}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 font-semibold text-slate-700"
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={() => setShowCancelModal(true)}
                    className="px-3 py-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Row 2: Previous Consultations Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Clock className="w-5 h-5 text-sky-600" />
              <span>Previous Consultations History</span>
            </h3>
            <span className="text-xs text-slate-500">
              {PATIENT_HISTORY.previousAppointments.length} past visits recorded
            </span>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                    <th className="py-3 px-4">Visit ID</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Doctor</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-6">Clinical Diagnosis / Purpose</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PATIENT_HISTORY.previousAppointments.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-mono font-bold text-sky-700">{item.id}</td>
                      <td className="py-3 px-4 text-slate-600">{item.date}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{item.doctor}</td>
                      <td className="py-3 px-4 text-slate-700">{item.department}</td>
                      <td className="py-3 px-6 text-slate-600">{item.diagnosis}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Row 3: Recent Prescriptions & Recent Medical Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Prescriptions */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Pill className="w-5 h-5 text-sky-600" />
                <span>Recent Prescriptions</span>
              </h3>
              <button
                onClick={() => onNavigate('prescription-analyzer')}
                className="text-xs font-semibold text-sky-700 hover:underline"
              >
                Scan New Rx
              </button>
            </div>

            <div className="space-y-3">
              {PATIENT_HISTORY.recentPrescriptions.map((rx) => (
                <div
                  key={rx.id}
                  className="p-4 rounded-xl border border-slate-200 hover:border-sky-300 transition-colors bg-slate-50/50 flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-sky-700 text-xs">{rx.id}</span>
                      <h4 className="font-bold text-slate-900 text-sm mt-0.5">{rx.doctor}</h4>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {rx.status}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600">
                    <span className="font-medium text-slate-500">Meds ({rx.itemsCount}):</span>{' '}
                    {rx.medicines.join(', ')}
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Date: {rx.date}</span>
                    <button
                      onClick={() => handleDownloadPrescription(rx.id)}
                      className="inline-flex items-center gap-1 font-semibold text-sky-700 hover:text-sky-800"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Medical Reports */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Activity className="w-5 h-5 text-sky-600" />
                <span>Recent Diagnostic Reports</span>
              </h3>
              <button
                onClick={() => onNavigate('report-analyzer')}
                className="text-xs font-semibold text-sky-700 hover:underline"
              >
                Analyze Lab Report
              </button>
            </div>

            <div className="space-y-3">
              {PATIENT_HISTORY.recentReports.map((rep) => (
                <div
                  key={rep.id}
                  className="p-4 rounded-xl border border-slate-200 hover:border-sky-300 transition-colors bg-slate-50/50 flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-sky-700 text-xs">{rep.id}</span>
                      <h4 className="font-bold text-slate-900 text-sm mt-0.5">{rep.title}</h4>
                    </div>
                    <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                      {rep.status}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500">
                    {rep.lab} · Attending: {rep.doctor}
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Date: {rep.date}</span>
                    <button
                      onClick={() => setActiveReportModal(rep)}
                      className="inline-flex items-center gap-1 font-semibold text-sky-700 hover:text-sky-800"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View Breakdown</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 4: Recent Invoices & Bills */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Receipt className="w-5 h-5 text-sky-600" />
              <span>Recent Hospital Bills</span>
            </h3>
            <button
              onClick={() => onNavigate('billing')}
              className="text-xs font-semibold text-sky-700 hover:underline"
            >
              Go to Full Billing Page →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PATIENT_HISTORY.recentBills.map((bill) => (
              <div
                key={bill.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-slate-700">{bill.id}</span>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                        bill.status === 'Paid'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {bill.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 line-clamp-2 mt-1">
                    {bill.serviceDescription}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{bill.date}</span>
                  <span className="text-sm font-bold text-slate-900">${bill.amount.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Cancel Consultation Appointment?
            </h3>
            <p className="text-xs text-slate-600 mt-1 mb-6">
              Are you sure you want to cancel your upcoming appointment with {upcoming?.doctor} on {upcoming?.date}? This cannot be undone.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleCancelAppointment}
                className="flex-1 py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Yes, Cancel Appointment
              </button>
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
              >
                Keep Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {activeReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setActiveReportModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-slate-900 mb-1">{activeReportModal.title}</h3>
            <p className="text-xs text-slate-500 mb-4">{activeReportModal.id} · {activeReportModal.date}</p>
            <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-700 space-y-2 mb-4">
              <div><strong>Laboratory:</strong> {activeReportModal.lab}</div>
              <div><strong>Reviewing Physician:</strong> {activeReportModal.doctor}</div>
              <div><strong>Status:</strong> {activeReportModal.status}</div>
              <p className="text-slate-600 pt-2 border-t border-slate-200">
                Detailed quantitative telemetry and parameter reference ranges are archived in the Hospital Central Pathology Repository.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setActiveReportModal(null);
                  onNavigate('report-analyzer');
                }}
                className="flex-1 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-xl"
              >
                Open in Report Analyzer
              </button>
              <button
                onClick={() => setActiveReportModal(null)}
                className="py-2 px-4 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl"
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
