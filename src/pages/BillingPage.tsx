import React, { useState, useMemo } from 'react';
import { PageId } from '../types';
import { 
  Receipt, 
  User, 
  Printer, 
  Download, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  CreditCard, 
  X 
} from 'lucide-react';

interface BillingPageProps {
  onNavigate: (page: PageId) => void;
  onShowToast: (type: 'success' | 'info' | 'warning', title: string, message?: string) => void;
}

interface ConsultationRow {
  id: string;
  doctor: string;
  type: string;
  fee: number;
}

interface MedicineRow {
  id: string;
  medicine: string;
  quantity: number;
  unitPrice: number;
}

interface TestRow {
  id: string;
  test: string;
  quantity: number;
  price: number;
}

interface ServiceRow {
  id: string;
  service: string;
  quantity: number;
  price: number;
}

export const BillingPage: React.FC<BillingPageProps> = ({
  onNavigate,
  onShowToast,
}) => {
  // Patient Details
  const [patientName, setPatientName] = useState('Alexander Hayes');
  const [patientId, setPatientId] = useState('MCA-PT-49210');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [email, setEmail] = useState('alexander.hayes@example.com');
  const [invoiceId, setInvoiceId] = useState('INV-2026-0892');
  const [invoiceDate, setInvoiceDate] = useState('2026-09-29');

  // 1. Consultation Items
  const [consultations, setConsultations] = useState<ConsultationRow[]>([
    {
      id: 'c1',
      doctor: 'Dr. Sarah Mitchell, MD (Cardiology)',
      type: 'Outpatient Comprehensive Evaluation',
      fee: 150.00,
    },
  ]);

  // 2. Medicine Items
  const [medicines, setMedicines] = useState<MedicineRow[]>([
    {
      id: 'm1',
      medicine: 'Atorvastatin Calcium 20mg (30 Tablets)',
      quantity: 1,
      unitPrice: 24.00,
    },
    {
      id: 'm2',
      medicine: 'Amoxicillin & Clavulanate 625mg (14 Tablets)',
      quantity: 1,
      unitPrice: 18.50,
    },
  ]);

  // 3. Medical Tests
  const [tests, setTests] = useState<TestRow[]>([
    {
      id: 't1',
      test: 'Comprehensive Lipid Profile (LAB-LIP-03)',
      quantity: 1,
      price: 55.00,
    },
    {
      id: 't2',
      test: 'Complete Blood Count (CBC) with Differential',
      quantity: 1,
      price: 35.00,
    },
  ]);

  // 4. Other Services
  const [otherServices, setOtherServices] = useState<ServiceRow[]>([
    {
      id: 's1',
      service: 'Clinical Nursing & Phlebotomy Processing Fee',
      quantity: 1,
      price: 15.00,
    },
  ]);

  // Financial calculations
  const [discountAmount, setDiscountAmount] = useState<number>(20.00); // e.g. health membership discount
  const [otherCharges, setOtherCharges] = useState<number>(10.00); // hospital facility maintenance
  const taxRate = 0.05; // 5% state medical surcharge

  const subtotal = useMemo(() => {
    const consultTotal = consultations.reduce((acc, c) => acc + c.fee, 0);
    const medTotal = medicines.reduce((acc, m) => acc + m.quantity * m.unitPrice, 0);
    const testTotal = tests.reduce((acc, t) => acc + t.quantity * t.price, 0);
    const servTotal = otherServices.reduce((acc, s) => acc + s.quantity * s.price, 0);
    return consultTotal + medTotal + testTotal + servTotal;
  }, [consultations, medicines, tests, otherServices]);

  const tax = useMemo(() => {
    return Math.max(0, subtotal - discountAmount) * taxRate;
  }, [subtotal, discountAmount]);

  const grandTotal = useMemo(() => {
    return Math.max(0, subtotal - discountAmount + tax + otherCharges);
  }, [subtotal, discountAmount, tax, otherCharges]);

  // Print & Download simulation
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    onShowToast(
      'success',
      'Invoice PDF Downloaded',
      `Hospital Bill #${invoiceId} generated for ${patientName}.`
    );
  };

  const handleGenerateBill = () => {
    const newId = `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setInvoiceId(newId);
    onShowToast(
      'success',
      'Bill Generated & Finalized',
      `Official hospital statement #${newId} with total $${grandTotal.toFixed(2)} updated.`
    );
  };

  // Add Item Helpers
  const addConsultation = () => {
    setConsultations((prev) => [
      ...prev,
      {
        id: `c-${Date.now()}`,
        doctor: 'Dr. Arthur Pendelton (General Medicine)',
        type: 'Routine Follow-up',
        fee: 100.00,
      },
    ]);
  };

  const addMedicine = () => {
    setMedicines((prev) => [
      ...prev,
      {
        id: `m-${Date.now()}`,
        medicine: 'Vitamin D3 60,000 IU Softgels',
        quantity: 1,
        unitPrice: 11.00,
      },
    ]);
  };

  const addTest = () => {
    setTests((prev) => [
      ...prev,
      {
        id: `t-${Date.now()}`,
        test: '12-Lead Electrocardiogram (ECG)',
        quantity: 1,
        price: 40.00,
      },
    ]);
  };

  const addService = () => {
    setOtherServices((prev) => [
      ...prev,
      {
        id: `s-${Date.now()}`,
        service: 'Digital Medical Records Archival',
        quantity: 1,
        price: 8.00,
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-md">
                Hospital Finance & Accounts
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-3 mb-2">
                Patient Invoices & Billing
              </h1>
              <p className="text-base text-slate-600">
                Itemized hospital consultation fees, pharmacy items, laboratory diagnostics, and hospital services.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Print Bill</span>
              </button>

              <button
                onClick={handleDownload}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download Bill</span>
              </button>

              <button
                onClick={handleGenerateBill}
                className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 shadow-sm"
              >
                <Receipt className="w-4 h-4" />
                <span>Generate Bill</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Billing Paper / Container */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-10">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
          {/* Hospital Brand & Bill Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-200">
            <div>
              <div className="text-xl font-bold tracking-tight text-slate-900">
                MediCare<span className="text-sky-600"> AI</span> Hospital
              </div>
              <div className="text-xs text-slate-500 mt-1">
                100 Healthcare Boulevard, Medical District, Suite 400
              </div>
              <div className="text-xs text-slate-500">
                Phone: +1 (800) 555-CARE · billing@medicare-ai.org
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded">
                Official Statement
              </span>
              <div className="text-base font-bold text-slate-900 mt-2">
                Invoice #{invoiceId}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Billing Date: {invoiceDate}
              </div>
            </div>
          </div>

          {/* Patient Information Fields */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Patient Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                  Patient Full Name
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                  Patient ID
                </label>
                <input
                  type="text"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-mono text-slate-900 bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                  Contact Phone
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                  Billing Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>
          </div>

          {/* Section 1: Consultation */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                1. Doctor Consultations
              </h4>
              <button
                onClick={addConsultation}
                className="text-xs font-semibold text-sky-700 hover:text-sky-800 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Consultation</span>
              </button>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                      <th className="py-2.5 px-4">Doctor</th>
                      <th className="py-2.5 px-4">Consultation Type</th>
                      <th className="py-2.5 px-4 text-right">Fee</th>
                      <th className="py-2.5 px-2 text-center w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {consultations.map((c) => (
                      <tr key={c.id}>
                        <td className="py-2.5 px-4 font-bold text-slate-900">{c.doctor}</td>
                        <td className="py-2.5 px-4 text-slate-600">{c.type}</td>
                        <td className="py-2.5 px-4 text-right font-bold text-slate-900 tabular-nums">
                          ${c.fee.toFixed(2)}
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          {consultations.length > 1 && (
                            <button
                              onClick={() => setConsultations(consultations.filter((x) => x.id !== c.id))}
                              className="text-slate-400 hover:text-rose-600 p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Section 2: Medicines */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                2. Pharmacy Dispensary
              </h4>
              <button
                onClick={addMedicine}
                className="text-xs font-semibold text-sky-700 hover:text-sky-800 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Medicine</span>
              </button>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                      <th className="py-2.5 px-4">Medicine Name</th>
                      <th className="py-2.5 px-4 text-center">Quantity</th>
                      <th className="py-2.5 px-4 text-right">Unit Price</th>
                      <th className="py-2.5 px-4 text-right">Total</th>
                      <th className="py-2.5 px-2 text-center w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {medicines.map((m) => (
                      <tr key={m.id}>
                        <td className="py-2.5 px-4 font-bold text-slate-900">{m.medicine}</td>
                        <td className="py-2.5 px-4 text-center tabular-nums text-slate-800">
                          {m.quantity}
                        </td>
                        <td className="py-2.5 px-4 text-right tabular-nums text-slate-600">
                          ${m.unitPrice.toFixed(2)}
                        </td>
                        <td className="py-2.5 px-4 text-right font-bold text-slate-900 tabular-nums">
                          ${(m.quantity * m.unitPrice).toFixed(2)}
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          {medicines.length > 1 && (
                            <button
                              onClick={() => setMedicines(medicines.filter((x) => x.id !== m.id))}
                              className="text-slate-400 hover:text-rose-600 p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Section 3: Medical Tests */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                3. Clinical Diagnostics & Pathology
              </h4>
              <button
                onClick={addTest}
                className="text-xs font-semibold text-sky-700 hover:text-sky-800 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Diagnostic Test</span>
              </button>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                      <th className="py-2.5 px-4">Test Name</th>
                      <th className="py-2.5 px-4 text-center">Quantity</th>
                      <th className="py-2.5 px-4 text-right">Price</th>
                      <th className="py-2.5 px-4 text-right">Total</th>
                      <th className="py-2.5 px-2 text-center w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {tests.map((t) => (
                      <tr key={t.id}>
                        <td className="py-2.5 px-4 font-bold text-slate-900">{t.test}</td>
                        <td className="py-2.5 px-4 text-center tabular-nums text-slate-800">
                          {t.quantity}
                        </td>
                        <td className="py-2.5 px-4 text-right tabular-nums text-slate-600">
                          ${t.price.toFixed(2)}
                        </td>
                        <td className="py-2.5 px-4 text-right font-bold text-slate-900 tabular-nums">
                          ${(t.quantity * t.price).toFixed(2)}
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          {tests.length > 1 && (
                            <button
                              onClick={() => setTests(tests.filter((x) => x.id !== t.id))}
                              className="text-slate-400 hover:text-rose-600 p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Section 4: Other Services */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                4. Other Hospital Services
              </h4>
              <button
                onClick={addService}
                className="text-xs font-semibold text-sky-700 hover:text-sky-800 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Service</span>
              </button>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                      <th className="py-2.5 px-4">Service Description</th>
                      <th className="py-2.5 px-4 text-center">Quantity</th>
                      <th className="py-2.5 px-4 text-right">Price</th>
                      <th className="py-2.5 px-4 text-right">Total</th>
                      <th className="py-2.5 px-2 text-center w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {otherServices.map((s) => (
                      <tr key={s.id}>
                        <td className="py-2.5 px-4 font-bold text-slate-900">{s.service}</td>
                        <td className="py-2.5 px-4 text-center tabular-nums text-slate-800">
                          {s.quantity}
                        </td>
                        <td className="py-2.5 px-4 text-right tabular-nums text-slate-600">
                          ${s.price.toFixed(2)}
                        </td>
                        <td className="py-2.5 px-4 text-right font-bold text-slate-900 tabular-nums">
                          ${(s.quantity * s.price).toFixed(2)}
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          {otherServices.length > 1 && (
                            <button
                              onClick={() => setOtherServices(otherServices.filter((x) => x.id !== s.id))}
                              className="text-slate-400 hover:text-rose-600 p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Bottom Financial Summary Breakdown */}
          <div className="pt-6 border-t border-slate-200">
            <div className="max-w-xs ml-auto space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-emerald-700">
                <span>Healthcare Membership Discount</span>
                <span className="font-bold tabular-nums">
                  -${discountAmount.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>State Health Tax (5%)</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  ${tax.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Facility Maintenance & Archival</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  ${otherCharges.toFixed(2)}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-black text-slate-900">
                <span>Grand Total</span>
                <span className="text-base text-sky-700 tabular-nums">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Status Notice */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <CreditCard className="w-4 h-4 text-sky-600" />
              <span>Payments accepted: Major Credit/Debit cards, Health Savings Accounts (HSA/FSA), and insurance direct billing.</span>
            </div>
            <span className="font-bold text-emerald-700 whitespace-nowrap">
              Status: Verified Final
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
