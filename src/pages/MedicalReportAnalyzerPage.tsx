import React, { useState, useRef } from 'react';
import { PageId } from '../types';
import { DEMO_REPORT_RESULTS } from '../data/mockData';
import { 
  UploadCloud, 
  FileText, 
  X, 
  Sparkles, 
  Download, 
  Send, 
  Loader2, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  HelpCircle, 
  Printer 
} from 'lucide-react';

interface MedicalReportAnalyzerPageProps {
  onNavigate: (page: PageId) => void;
  onShowToast: (type: 'success' | 'info' | 'warning', title: string, message?: string) => void;
}

export const MedicalReportAnalyzerPage: React.FC<MedicalReportAnalyzerPageProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; type: string } | null>(null);
  const [patientName, setPatientName] = useState('Alexander Hayes');
  const [patientEmail, setPatientEmail] = useState('alexander.hayes@example.com');
  const [reportDate, setReportDate] = useState('2026-09-22');
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
      type: file.type || 'Clinical Document',
    });
    onShowToast('info', 'Report Attached', `${file.name} ready for diagnostic assessment.`);
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
      setUploadedFile({
        name: 'comprehensive_blood_biochemistry_panel.pdf',
        size: '2.1 MB',
        type: 'application/pdf',
      });
    }

    setIsAnalyzing(true);
    setShowResults(false);

    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
      onShowToast(
        'success',
        'Clinical Analysis Completed',
        '10 biomarker parameters extracted and cross-referenced with standard laboratory ranges.'
      );
    }, 1300);
  };

  const handleGenerateReport = () => {
    onShowToast(
      'success',
      'Clinical Report PDF Created',
      'Comprehensive report summary with marked observations downloaded.'
    );
  };

  const handleSendReport = () => {
    onShowToast(
      'success',
      'Analysis Forwarded',
      `Analysis report forwarded to ${patientEmail} and logged to attending physician.`
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Page Header */}
      <section className="bg-white border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-md">
              Diagnostic Insights
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-3 mb-4">
              Medical Report Analyzer
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Upload laboratory blood tests, pathology panels, and imaging reports. Review observed values, reference parameters, flagged abnormalities, and physician-oriented summaries.
            </p>
          </div>
        </div>
      </section>

      {/* Upload and Inputs Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
          {/* Upload Area */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-slate-900">
                Upload Diagnostic Report (PDF, JPG, PNG)
              </label>
              <span className="text-xs text-slate-500">Max file size 25MB</span>
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
                Drag and drop your medical report here
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                or click below to browse files from your computer
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

            {/* Uploaded File Item */}
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
                      {uploadedFile.size} · Medical Document
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors rounded-lg hover:bg-white"
                  aria-label="Remove document"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Form Fields: Patient Name, Email, Report Date */}
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
                Report Date
              </label>
              <input
                type="date"
                value={reportDate}
                onChange={(e) => setReportDate(e.target.value)}
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
                  <span>Cross-referencing laboratory values against normal clinical ranges...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Analyze Report</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {showResults && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 animate-in fade-in slide-in-from-bottom-4 space-y-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                  Clinical Evaluation Completed
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">
                  Comprehensive Diagnostic Breakdown
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

            {/* 1. Patient & Report Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] text-slate-400">
                  Patient Information
                </h4>
                <div className="flex justify-between">
                  <span className="text-slate-500">Name:</span>
                  <span className="font-bold text-slate-900">{patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Patient ID:</span>
                  <span className="font-mono text-slate-900">MCA-PT-49210</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Email:</span>
                  <span className="text-slate-700">{patientEmail}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] text-slate-400">
                  Report Information
                </h4>
                <div className="flex justify-between">
                  <span className="text-slate-500">Report Date:</span>
                  <span className="font-bold text-slate-900">{reportDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Diagnostic Unit:</span>
                  <span className="text-slate-900 font-medium">Automated Clinical Pathology Lab</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Reviewed By:</span>
                  <span className="text-sky-700 font-semibold">Dr. Hannah Aris, MD</span>
                </div>
              </div>
            </div>

            {/* 2. Test Results Table */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Laboratory Test Parameters & Reference Comparison
                </h4>
                <span className="text-xs text-slate-500">10 parameters tested</span>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                        <th className="py-3 px-4">Test Parameter</th>
                        <th className="py-3 px-4 text-center">Observed Value</th>
                        <th className="py-3 px-4 text-center">Reference Range</th>
                        <th className="py-3 px-4 text-center">Unit</th>
                        <th className="py-3 px-4 text-center">Clinical Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {DEMO_REPORT_RESULTS.map((res, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                          <td className="py-3.5 px-4 font-bold text-slate-900">
                            {res.test}
                          </td>
                          <td className="py-3.5 px-4 text-center tabular-nums font-extrabold text-slate-900 text-sm">
                            {res.observedValue}
                          </td>
                          <td className="py-3.5 px-4 text-center font-medium text-slate-600">
                            {res.referenceRange}
                          </td>
                          <td className="py-3.5 px-4 text-center text-slate-500">
                            {res.unit}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            {res.status === 'Normal' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                Normal
                              </span>
                            )}
                            {res.status === 'High' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                                High
                              </span>
                            )}
                            {res.status === 'Low' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                                Low
                              </span>
                            )}
                            {res.status === 'Review Required' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                                Review Required
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

            {/* 3. Report Summary */}
            <div className="p-6 rounded-2xl bg-sky-50/60 border border-sky-200 space-y-2">
              <div className="flex items-center gap-2 text-sky-900 font-bold text-sm">
                <Activity className="w-4 h-4 text-sky-600" />
                <span>Clinical Report Summary</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                The comprehensive panel indicates physiological stability across renal filtration indices (eGFR 96 mL/min/1.73m², Serum Creatinine 0.94 mg/dL) and hepatic transaminases. Mild borderline elevation noted in Fasting Plasma Glucose (104 mg/dL) and Glycated Hemoglobin (HbA1c 5.9%), suggesting early impaired fasting glycemia. Total Leukocyte Count (11,400 cells/mcL) exhibits mild reactive leukocytosis consistent with recent transient seasonal inflammation.
              </p>
            </div>

            {/* 4. Important Observations */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Important Clinical Observations & Next Steps</span>
              </h4>

              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-1.5 shrink-0"></span>
                  <span><strong>Metabolic Monitoring:</strong> Repeat Fasting Glucose and 2-hour postprandial evaluation in 90 days. Focus on dietary carbohydrate moderation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-1.5 shrink-0"></span>
                  <span><strong>Lipid Management:</strong> Total Cholesterol (218 mg/dL) reflects mild hypercholesterolemia. Consider evaluating HDL/LDL fractionations with Dr. Sarah Mitchell or Dr. Arthur Pendelton.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-1.5 shrink-0"></span>
                  <span><strong>Thyroid & Renal Health:</strong> TSH (2.45 mIU/L) and renal markers are strictly within standard physiological limits. No intervention indicated.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
