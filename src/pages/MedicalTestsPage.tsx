import React, { useState, useMemo } from 'react';
import { PageId, MedicalTest } from '../types';
import { MEDICAL_TESTS } from '../data/mockData';
import { 
  Search, 
  Microscope, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Activity, 
  ShieldCheck, 
  DollarSign, 
  FileText, 
  Filter, 
  X 
} from 'lucide-react';

interface MedicalTestsPageProps {
  onNavigate: (page: PageId) => void;
  onShowToast: (type: 'success' | 'info' | 'warning', title: string, message?: string) => void;
}

export const MedicalTestsPage: React.FC<MedicalTestsPageProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTestModal, setActiveTestModal] = useState<MedicalTest | null>(null);

  // Extract categories
  const categories = useMemo(() => {
    const list = Array.from(new Set(MEDICAL_TESTS.map((t) => t.category)));
    return ['All', ...list];
  }, []);

  // Filter tests
  const filteredTests = useMemo(() => {
    return MEDICAL_TESTS.filter((t) => {
      const matchesSearch =
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === 'All' || t.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  const handleBookTest = (test: MedicalTest) => {
    onShowToast(
      'success',
      'Diagnostic Scheduled',
      `${test.name} booked. Confirmation code #${test.code} sent to your patient profile.`
    );
    setActiveTestModal(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Top Banner with Diagnostics Lab Visual */}
      <section className="bg-white border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-md">
                Automated Clinical Pathology & Imaging
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                Medical Tests & Diagnostics
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Accredited clinical biochemistry, hematology panels, 3.0T MRI, high-resolution CT, and cardiac telemetry with rapid digital dispatch.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-sky-600" />
                  <span>NABL & CAP Certified Laboratories</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-4 h-4 text-sky-600" />
                  <span>Same-Day Digital PDF Reports</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 aspect-[4/3] bg-slate-100">
                <img
                  src="/src/assets/images/hospital_diagnostics_lab_1790688899993.jpg"
                  alt="MediCare AI State of the Art Diagnostics Center"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm p-3 rounded-xl border border-white/80 flex items-center justify-between text-xs">
                  <div className="font-semibold text-slate-900">
                    Pathology & 3T MRI Diagnostics Wing
                  </div>
                  <span className="text-sky-700 font-bold bg-sky-50 px-2 py-0.5 rounded">
                    Open 24/7
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-8 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search diagnostic test (e.g. CBC, Glucose, Lipid, Thyroid, MRI, CT)..."
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Category Filter */}
            <div className="md:col-span-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-300 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? 'All Diagnostic Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <div>
              Showing <span className="font-bold text-slate-900">{filteredTests.length}</span> accredited clinical diagnostic tests
            </div>

            {(searchQuery || selectedCategory !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="text-sky-700 font-semibold hover:underline"
              >
                Reset Diagnostic Filters
              </button>
            )}
          </div>
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-sky-700">
                    {test.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {test.code}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {test.name}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {test.description}
                </p>

                <div className="space-y-2 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs mb-4">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-slate-500">Sample / Method</span>
                    <span className="font-medium text-slate-800">{test.sampleType}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-slate-500">Fasting Requirement</span>
                    <span className="font-medium text-slate-800">{test.fastingRequired}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-slate-500">Turnaround Time</span>
                    <span className="font-bold text-sky-700">{test.estimatedReportTime}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 mb-4">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Diagnostic Fee</span>
                    <span className="text-xl font-bold text-slate-900">${test.price}</span>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md ${
                      test.availability === 'Emergency 24/7'
                        ? 'bg-rose-50 text-rose-700'
                        : test.availability === 'Available Daily'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        test.availability === 'Emergency 24/7'
                          ? 'bg-rose-500'
                          : test.availability === 'Available Daily'
                          ? 'bg-emerald-500'
                          : 'bg-amber-500'
                      }`}
                    ></span>
                    {test.availability}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleBookTest(test)}
                    className="flex-1 py-2 px-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Test</span>
                  </button>

                  <button
                    onClick={() => setActiveTestModal(test)}
                    className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Test Detail Modal */}
      {activeTestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setActiveTestModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
                {activeTestModal.category} · {activeTestModal.code}
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                {activeTestModal.name}
              </h3>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 border-t border-b border-slate-100 py-4 my-4">
              <p className="text-slate-600 leading-relaxed">
                {activeTestModal.description}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 text-xs block">Sample Type</span>
                  <span className="font-semibold text-slate-900 text-xs">{activeTestModal.sampleType}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 text-xs block">Preparation / Fasting</span>
                  <span className="font-semibold text-slate-900 text-xs">{activeTestModal.fastingRequired}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 text-xs block">Turnaround Time</span>
                  <span className="font-semibold text-slate-900 text-xs">{activeTestModal.estimatedReportTime}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 text-xs block">Laboratory Fee</span>
                  <span className="font-bold text-slate-900 text-sm">${activeTestModal.price}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleBookTest(activeTestModal)}
                className="flex-1 py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-md shadow-sky-600/20"
              >
                <Calendar className="w-4 h-4" />
                <span>Confirm Diagnostic Booking</span>
              </button>
              <button
                onClick={() => setActiveTestModal(null)}
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
