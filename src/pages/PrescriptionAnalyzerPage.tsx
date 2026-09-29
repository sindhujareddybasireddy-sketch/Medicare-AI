import React, { useState, useRef } from 'react';
import { PageId } from '../types';
import { DEMO_PRESCRIPTION_MEDS } from '../data/mockData';
import { 
  UploadCloud, 
  FileText, 
  Image as ImageIcon, 
  X, 
  CheckCircle2, 
  Sparkles, 
  Download, 
  Send, 
  AlertCircle, 
  Loader2, 
  ShieldCheck, 
  Printer 
} from 'lucide-react';

interface PrescriptionAnalyzerPageProps {
  onNavigate: (page: PageId) => void;
  onShowToast: (type: 'success' | 'info' | 'warning', title: string, message?: string) => void;
}

export const PrescriptionAnalyzerPage: React.FC<PrescriptionAnalyzerPageProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; type: string } | null>(null);
  const [patientName, setPatientName] = useState('Alexander Hayes');
  const [patientEmail, setPatientEmail] = useState('alexander.hayes@example.com');
  const [prescriptionDate, setPrescriptionDate] = useState('2026-09-24');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  const handleFiles = (file: File) => {
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
    setUploadedFile({
      name: file.name,
      size: sizeInMB,
      type: file.type || 'Document',
    });
    onShowToast('info', 'Prescription Document Attached', `${file.name} ready for clinical scan.`);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setShowResults(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = () => {
    if (!uploadedFile) {
      // For demo convenience, let's load a sample file if none uploaded
      setUploadedFile({
        name: 'sample_clinical_rx_dr_pendelton.pdf',
        size: '1.4 MB',
        type: 'application/pdf',
      });
    }

    setIsAnalyzing(true);
    setShowResults(false);

    // Simulate scanning
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
      onShowToast(
        'success',
        'Prescription Digitized Successfully',
        'Extracted 4 medications with dosage and pharmacy availability.'
      );
    }, 1200);
  };

  const handleGenerateReport = () => {
    onShowToast(
      'success',
      'Prescription Summary Generated',
      'Clinical medication schedule downloaded as PDF.'
    );
  };

  const handleSendReport = () => {
    onShowToast(
      'success',
      'Report Dispatched',
      `Medication summary sent to ${patientEmail}.`
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Page Header */}
      <section className="bg-white border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-md">
              Clinical Document Analysis
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-3 mb-4">
              Prescription Analyzer
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Upload prescription photographs or clinical PDFs. Review digitized medicine names, dosage frequencies, course durations, and dispensary inventory status.
            </p>
          </div>
        </div>
      </section>

      {/* Main Upload & Form Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
          {/* Upload Area */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-slate-900">
                Upload Prescription Document
              </label>
              <span className="text-xs text-slate-500">Supports PDF, JPG, PNG (Max 15MB)</span>
            </div>

            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-colors ${
                dragActive
                  ? 'border-sky-500 bg-sky-50/60'
                  : 'border-slate-300 hover:border-sky-400 bg-slate-50/50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileInputChange}
                className="hidden"
              />

              <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 mx-auto flex items-center justify-center mb-4 shadow-sm">
                <UploadCloud className="w-7 h-7" />
              </div>

              <h4 className="text-base font-semibold text-slate-900 mb-1">
                Drag and drop your prescription here
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                or click below to choose a file from your device
              </p>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-semibold shadow-sm transition-colors"
              >
                Browse Files
              </button>
            </div>

            {/* Uploaded File Preview Badge */}
            {uploadedFile && (
              <div className="mt-4 p-4 rounded-xl bg-sky-50/80 border border-sky-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-600 text-white flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 truncate max-w-xs sm:max-w-md">
                      {uploadedFile.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {uploadedFile.size} · Document Attached
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors rounded-lg hover:bg-white"
                  aria-label="Remove file"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Form Fields: Patient Name, Email, Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Patient Name
              </label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Patient Full Name"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Patient Email
              </label>
              <input
                type="email"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                placeholder="patient@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Prescription Date
              </label>
              <input
                type="date"
                value={prescriptionDate}
                onChange={(e) => setPrescriptionDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          {/* Large Action Button */}
          <div className="pt-2">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full py-4 px-6 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all shadow-md shadow-sky-600/25 active:scale-98 flex items-center justify-center gap-2.5 text-base"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Scanning & Extracting Prescription Data...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Analyze Prescription</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {showResults && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                  Clinical Extraction Complete
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">
                  Prescription Analysis Report
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleGenerateReport}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Generate Report</span>
                </button>
                <button
                  onClick={handleSendReport}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Report</span>
                </button>
              </div>
            </div>

            {/* 1. Patient Information */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Patient & Prescribing Doctor Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500 block">Patient Name</span>
                  <span className="font-bold text-slate-900 text-sm">{patientName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Prescription Date</span>
                  <span className="font-bold text-slate-900 text-sm">{prescriptionDate}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Prescribing Doctor</span>
                  <span className="font-bold text-slate-900 text-sm">Dr. Arthur Pendelton, MD</span>
                </div>
              </div>
            </div>

            {/* 2. Extracted Medicines Table */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Prescribed Medications & Pharmacy Dispense Status
                </h4>
                <span className="text-xs text-slate-500">4 items recognized</span>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                        <th className="py-3 px-4">Medicine Name</th>
                        <th className="py-3 px-3">Dosage</th>
                        <th className="py-3 px-4">Frequency</th>
                        <th className="py-3 px-3">Duration</th>
                        <th className="py-3 px-3 text-center">Qty</th>
                        <th className="py-3 px-3 text-right">Price</th>
                        <th className="py-3 px-4 text-center">Availability</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {DEMO_PRESCRIPTION_MEDS.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="py-3.5 px-4 font-bold text-slate-900">
                            {item.name}
                          </td>
                          <td className="py-3.5 px-3 font-medium text-slate-700">
                            {item.dosage}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">
                            {item.frequency}
                          </td>
                          <td className="py-3.5 px-3 font-medium text-slate-800">
                            {item.duration}
                          </td>
                          <td className="py-3.5 px-3 text-center tabular-nums font-semibold text-slate-800">
                            {item.quantity}
                          </td>
                          <td className="py-3.5 px-3 text-right tabular-nums font-bold text-slate-900">
                            ${item.price.toFixed(2)}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            {item.availability === 'Available' && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                Available
                              </span>
                            )}
                            {item.availability === 'Low Stock' && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                                Low Stock
                              </span>
                            )}
                            {item.availability === 'Out of Stock' && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                                Out of Stock
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Note & Direct Pharmacy link */}
            <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>All items validated against MediCare AI Hospital Formulary. Ready for counter pickup.</span>
              </div>
              <button
                onClick={() => onNavigate('pharmacy')}
                className="text-sky-700 font-bold hover:underline whitespace-nowrap"
              >
                Go to Pharmacy Inventory →
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
