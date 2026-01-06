import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    // Navigation
    home: 'Home',
    portfolio: 'Portfolio',
    about: 'About',
    services: 'Services',
    gallery: 'Gallery',
    contact: 'Contact',
    bookNow: 'Book Now',
    admin: 'Admin',
    adminDashboard: 'Admin Dashboard',
    
    // Services
    ourServices: 'Our Services',
    servicesTitle: 'PROFESSIONAL PHOTOGRAPHY SERVICES',
    servicesSubtitle: 'Tailored packages designed to capture your vision with precision and artistry',
    customPackages: 'CUSTOM PACKAGES',
    customPackagesDesc: 'Need something specific? We create bespoke photography packages tailored to your unique requirements.',
    getInTouch: 'Get in Touch',
    startingFrom: 'Starting from',
    bookThisService: 'Book This Service',
    
    // Service types
    portraitSession: 'Portrait Session',
    fashionShoot: 'Fashion Shoot',
    editorial: 'Editorial',
    commercial: 'Commercial',
    eventCoverage: 'Event Coverage',
    
    // Gallery
    ourWork: 'Our Work',
    galleryTitle: 'GALLERY',
    gallerySubtitle: 'A curated collection of our finest work across portrait, fashion, commercial, and event photography.',
    allWork: 'All Work',
    portrait: 'Portrait',
    fashion: 'Fashion',
    event: 'Event',
    
    // Booking
    bookASession: 'Book a Session',
    scheduleYourShoot: 'SCHEDULE YOUR SHOOT',
    bookingSubtitle: 'Select your preferred service, date, and time. We\'ll send you a confirmation email with all the details.',
    fullName: 'Full Name',
    email: 'Email',
    phone: 'Phone',
    serviceType: 'Service Type',
    date: 'Date',
    timeSlot: 'Time Slot',
    location: 'Location',
    additionalNotes: 'Additional Notes',
    bookSession: 'BOOK SESSION',
    confirming: 'CONFIRMING...',
    bookingConfirmed: 'BOOKING CONFIRMED',
    bookingConfirmedMsg: 'A confirmation email has been sent to',
    lookingForward: 'We look forward to your session!',
    addToCalendar: 'ADD TO CALENDAR',
    bookAnother: 'Book Another Session',
    
    // Contact
    getInTouchTitle: 'GET IN TOUCH',
    getInTouchSubtitle: 'Ready to capture something extraordinary? Let\'s discuss your next project.',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    locationLabel: 'Location',
    followUs: 'Follow us',
    
    // Placeholders
    yourName: 'Your name',
    yourEmail: 'your@email.com',
    phoneNumber: '+48 123 456 789',
    selectService: 'Select a service',
    pickDate: 'Pick a date',
    selectTime: 'Select time',
    selectDateFirst: 'Select date first',
    studioLocation: 'Studio or on-location address',
    tellUsVision: 'Tell us about your vision, requirements, or any special requests...',
  },
  pl: {
    // Navigation
    home: 'Strona Główna',
    portfolio: 'Portfolio',
    about: 'O Nas',
    services: 'Usługi',
    gallery: 'Galeria',
    contact: 'Kontakt',
    bookNow: 'Zarezerwuj',
    admin: 'Admin',
    adminDashboard: 'Panel Admina',
    
    // Services
    ourServices: 'Nasze Usługi',
    servicesTitle: 'PROFESJONALNE USŁUGI FOTOGRAFICZNE',
    servicesSubtitle: 'Pakiety dostosowane do Twoich potrzeb, łączące precyzję z artystycznym podejściem',
    customPackages: 'PAKIETY INDYWIDUALNE',
    customPackagesDesc: 'Potrzebujesz czegoś szczególnego? Tworzymy spersonalizowane pakiety fotograficzne dostosowane do Twoich unikalnych wymagań.',
    getInTouch: 'Skontaktuj się',
    startingFrom: 'Od',
    bookThisService: 'Zarezerwuj Usługę',
    
    // Service types
    portraitSession: 'Sesja Portretowa',
    fashionShoot: 'Sesja Modowa',
    editorial: 'Editorial',
    commercial: 'Komercyjna',
    eventCoverage: 'Obsługa Eventi',
    
    // Gallery
    ourWork: 'Nasze Prace',
    galleryTitle: 'GALERIA',
    gallerySubtitle: 'Wybrana kolekcja naszych najlepszych prac obejmująca fotografię portretową, modową, komercyjną i eventową.',
    allWork: 'Wszystkie Prace',
    portrait: 'Portret',
    fashion: 'Moda',
    event: 'Event',
    
    // Booking
    bookASession: 'Zarezerwuj Sesję',
    scheduleYourShoot: 'ZAPLANUJ SWOJĄ SESJĘ',
    bookingSubtitle: 'Wybierz preferowaną usługę, datę i godzinę. Wyślemy Ci e-mail z potwierdzeniem ze wszystkimi szczegółami.',
    fullName: 'Imię i Nazwisko',
    email: 'E-mail',
    phone: 'Telefon',
    serviceType: 'Typ Usługi',
    date: 'Data',
    timeSlot: 'Godzina',
    location: 'Lokalizacja',
    additionalNotes: 'Dodatkowe Uwagi',
    bookSession: 'ZAREZERWUJ SESJĘ',
    confirming: 'POTWIERDZAM...',
    bookingConfirmed: 'REZERWACJA POTWIERDZONA',
    bookingConfirmedMsg: 'E-mail potwierdzający został wysłany na adres',
    lookingForward: 'Czekamy na Twoją sesję!',
    addToCalendar: 'DODAJ DO KALENDARZA',
    bookAnother: 'Zarezerwuj Kolejną Sesję',
    
    // Contact
    getInTouchTitle: 'SKONTAKTUJ SIĘ',
    getInTouchSubtitle: 'Gotowy na uchwycenie czegoś niezwykłego? Porozmawiajmy o Twoim następnym projekcie.',
    emailLabel: 'E-mail',
    phoneLabel: 'Telefon',
    locationLabel: 'Lokalizacja',
    followUs: 'Śledź nas',
    
    // Placeholders
    yourName: 'Twoje imię i nazwisko',
    yourEmail: 'twoj@email.com',
    phoneNumber: '+48 123 456 789',
    selectService: 'Wybierz usługę',
    pickDate: 'Wybierz datę',
    selectTime: 'Wybierz godzinę',
    selectDateFirst: 'Najpierw wybierz datę',
    studioLocation: 'Studio lub adres plenerowy',
    tellUsVision: 'Opowiedz nam o swojej wizji, wymaganiach lub specjalnych życzeniach...',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('pl');

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};