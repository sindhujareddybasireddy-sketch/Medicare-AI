import React, { useState } from 'react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { NotificationToast, ToastMessage } from './components/NotificationToast';
import { N8nChatWidget } from './components/N8nChatWidget';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { ServicesPage } from './pages/ServicesPage';
import { PharmacyPage } from './pages/PharmacyPage';
import { MedicalTestsPage } from './pages/MedicalTestsPage';
import { PrescriptionAnalyzerPage } from './pages/PrescriptionAnalyzerPage';
import { MedicalReportAnalyzerPage } from './pages/MedicalReportAnalyzerPage';
import { BillingPage } from './pages/BillingPage';
import { PatientDashboardPage } from './pages/PatientDashboardPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<{
    name: string;
    department: string;
  }>({ name: '', department: '' });

  // Toast Notification System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (type: 'success' | 'info' | 'warning', title: string, message?: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastMessage = { id, type, title, message };
    setToasts((prev) => [...prev, newToast]);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDoctorForBooking = (doctorName: string, department: string) => {
    setSelectedDoctorForBooking({ name: doctorName, department });
  };

  const handleAppointmentBooked = (appointment: any) => {
    showToast(
      'success',
      'Appointment Confirmed',
      `Reference ID: ${appointment.appointmentId} with ${appointment.doctorName}`
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
      {/* Toast Notification Container */}
      <NotificationToast toasts={toasts} onDismiss={dismissToast} />

      {/* Global Navigation Bar */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Page Body */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectDoctorForBooking={handleSelectDoctorForBooking}
          />
        )}

        {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}

        {currentPage === 'doctors' && (
          <DoctorsPage
            onNavigate={handleNavigate}
            onSelectDoctorForBooking={handleSelectDoctorForBooking}
          />
        )}

        {currentPage === 'appointments' && (
          <AppointmentsPage
            onNavigate={handleNavigate}
            preselectedDoctorName={selectedDoctorForBooking.name}
            preselectedDepartment={selectedDoctorForBooking.department}
            onAppointmentBooked={handleAppointmentBooked}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onNavigate={handleNavigate}
            onSelectDoctorForBooking={handleSelectDoctorForBooking}
          />
        )}

        {currentPage === 'pharmacy' && (
          <PharmacyPage onNavigate={handleNavigate} onShowToast={showToast} />
        )}

        {currentPage === 'tests' && (
          <MedicalTestsPage onNavigate={handleNavigate} onShowToast={showToast} />
        )}

        {currentPage === 'prescription-analyzer' && (
          <PrescriptionAnalyzerPage
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {currentPage === 'report-analyzer' && (
          <MedicalReportAnalyzerPage
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {currentPage === 'billing' && (
          <BillingPage onNavigate={handleNavigate} onShowToast={showToast} />
        )}

        {currentPage === 'dashboard' && (
          <PatientDashboardPage
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage onNavigate={handleNavigate} onShowToast={showToast} />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* n8n Chat Assistant Integration */}
      <N8nChatWidget />
    </div>
  );
}
