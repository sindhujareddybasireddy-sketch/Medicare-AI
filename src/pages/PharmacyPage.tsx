import React, { useState, useMemo } from 'react';
import { PageId, Medicine } from '../types';
import { MEDICINES } from '../data/mockData';
import { 
  Search, 
  Pill, 
  ShoppingCart, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Filter, 
  FileText, 
  ShieldCheck, 
  Clock, 
  X 
} from 'lucide-react';

interface PharmacyPageProps {
  onNavigate: (page: PageId) => void;
  onShowToast: (type: 'success' | 'info' | 'warning', title: string, message?: string) => void;
}

export const PharmacyPage: React.FC<PharmacyPageProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStockStatus, setSelectedStockStatus] = useState('All');
  const [cartCount, setCartCount] = useState(0);
  const [selectedMedicineModal, setSelectedMedicineModal] = useState<Medicine | null>(null);

  // Extract categories
  const categories = useMemo(() => {
    const set = new Set(MEDICINES.map((m) => m.category));
    return ['All', ...Array.from(set)];
  }, []);

  const stockOptions = ['All', 'In Stock', 'Low Stock', 'Out of Stock'];

  // Filter medicines
  const filteredMedicines = useMemo(() => {
    return MEDICINES.filter((med) => {
      const matchSearch =
        med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCat =
        selectedCategory === 'All' || med.category === selectedCategory;

      const matchStock =
        selectedStockStatus === 'All' || med.availability === selectedStockStatus;

      return matchSearch && matchCat && matchStock;
    });
  }, [searchQuery, selectedCategory, selectedStockStatus]);

  const handleRequestDispense = (med: Medicine) => {
    if (med.availability === 'Out of Stock') {
      onShowToast(
        'warning',
        'Item Currently Out of Stock',
        `${med.name} is on backorder. Our pharmacy manager has been notified.`
      );
      return;
    }

    setCartCount((prev) => prev + 1);
    onShowToast(
      'success',
      'Added to Pharmacy Request',
      `${med.name} (${med.dosage}) added. Present your prescription ID at counter 3.`
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Top Banner with Pharmacy Visual */}
      <section className="bg-white border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-md">
                Licensed Hospital Dispensary
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                In-House Pharmacy & Inventory
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Browse our real-time inventory of verified clinical pharmaceuticals. Verify batch availability, dosage specifications, and counter dispensing status.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-sky-600" />
                  <span>FDA Verified Formulations</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-4 h-4 text-sky-600" />
                  <span>24/7 Priority Emergency Dispensing</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 aspect-[4/3] bg-slate-100">
                <img
                  src="/src/assets/images/pharmacy_modern_interior_1790688916307.jpg"
                  alt="MediCare AI Modern Pharmacy Dispensary"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm p-3 rounded-xl border border-white/80 flex items-center justify-between text-xs">
                  <div className="font-semibold text-slate-900">
                    Dispensary Counter #1 - #4
                  </div>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    Active & Dispensing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Search, Filter & Inventory Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
        {/* Controls Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search medicine by trade name, active generic, or manufacturer..."
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Category Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-300 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedStockStatus}
                onChange={(e) => setSelectedStockStatus(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-300 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {stockOptions.map((stk) => (
                  <option key={stk} value={stk}>
                    {stk === 'All' ? 'All Stock Status' : stk}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <div>
              Displaying <span className="font-bold text-slate-900">{filteredMedicines.length}</span> verified hospital pharmaceuticals
            </div>

            <div className="flex items-center gap-4">
              {cartCount > 0 && (
                <div className="flex items-center gap-1.5 text-sky-700 font-semibold">
                  <ShoppingCart className="w-4 h-4" />
                  <span>{cartCount} item(s) in requisition</span>
                </div>
              )}
              {(searchQuery || selectedCategory !== 'All' || selectedStockStatus !== 'All') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSelectedStockStatus('All');
                  }}
                  className="text-sky-700 font-semibold hover:underline"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Medicine Inventory Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Medicine Name & Formulation</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4 text-center">Available Qty</th>
                  <th className="py-4 px-4 text-right">Unit Price</th>
                  <th className="py-4 px-4 text-center">Availability</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMedicines.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-slate-500 text-sm">
                      No pharmaceuticals found matching current search and filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredMedicines.map((med) => (
                    <tr
                      key={med.id}
                      className="hover:bg-slate-50/60 transition-colors"
                    >
                      {/* Name & Generic */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-900">{med.name}</div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {med.genericName} · {med.dosage}
                        </div>
                        {med.requiresPrescription && (
                          <span className="inline-block mt-1 text-[10px] font-semibold text-sky-800 bg-sky-50 px-2 py-0.5 rounded">
                            Rx Required
                          </span>
                        )}
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4">
                        <span className="text-xs font-medium text-slate-700">
                          {med.category}
                        </span>
                        <div className="text-[11px] text-slate-400">
                          {med.manufacturer}
                        </div>
                      </td>

                      {/* Quantity */}
                      <td className="py-4 px-4 text-center tabular-nums font-medium text-slate-800 text-xs">
                        {med.availableQuantity} units
                      </td>

                      {/* Price */}
                      <td className="py-4 px-4 text-right tabular-nums font-bold text-slate-900">
                        ${med.price.toFixed(2)}
                      </td>

                      {/* Availability Badge */}
                      <td className="py-4 px-4 text-center">
                        {med.availability === 'In Stock' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            In Stock
                          </span>
                        )}
                        {med.availability === 'Low Stock' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            Low Stock
                          </span>
                        )}
                        {med.availability === 'Out of Stock' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                            Out of Stock
                          </span>
                        )}
                      </td>

                      {/* Action Button */}
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <button
                          onClick={() => handleRequestDispense(med)}
                          disabled={med.availability === 'Out of Stock'}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-1.5 ${
                            med.availability === 'Out of Stock'
                              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                              : 'bg-sky-600 hover:bg-sky-700 text-white shadow-sm'
                          }`}
                        >
                          <Pill className="w-3.5 h-3.5" />
                          <span>Request Dispense</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
