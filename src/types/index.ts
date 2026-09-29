export type PageId =
  | 'home'
  | 'about'
  | 'doctors'
  | 'appointments'
  | 'services'
  | 'pharmacy'
  | 'tests'
  | 'prescription-analyzer'
  | 'report-analyzer'
  | 'billing'
  | 'dashboard'
  | 'contact';

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialization: string;
  department: string;
  experience: string;
  consultationFee: number;
  availableDays: string[];
  availableHours: string;
  availabilityStatus: 'Available Today' | 'Available Tomorrow' | 'Next Available Mon';
  education: string;
  languages: string[];
  rating: number;
  reviewCount: number;
  bio: string;
  image?: string;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  headDoctor: string;
  iconName: string;
  operatingHours: string;
}

export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  category: string;
  dosage: string;
  availableQuantity: number;
  price: number;
  availability: 'In Stock' | 'Low Stock' | 'Out of Stock';
  manufacturer: string;
  requiresPrescription: boolean;
}

export interface MedicalTest {
  id: string;
  name: string;
  code: string;
  category: string;
  description: string;
  sampleType: string;
  fastingRequired: string;
  price: number;
  estimatedReportTime: string;
  availability: 'Available Daily' | 'Prior Booking Required' | 'Emergency 24/7';
}

export interface AppointmentRecord {
  id: string;
  patientName: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  type: 'In-Person' | 'Video Follow-up';
  status: 'Confirmed' | 'Completed' | 'Rescheduled' | 'Cancelled';
  fee: number;
}

export interface TestResultItem {
  test: string;
  observedValue: string;
  referenceRange: string;
  status: 'Normal' | 'High' | 'Low' | 'Review Required';
  unit: string;
}

export interface PrescriptionMedicineItem {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  quantity: number;
  price: number;
  availability: 'Available' | 'Low Stock' | 'Out of Stock';
}

export interface BillItem {
  id: string;
  description: string;
  category: 'Consultation' | 'Medicine' | 'Medical Test' | 'Other Service';
  quantity: number;
  unitPrice: number;
  total: number;
}
