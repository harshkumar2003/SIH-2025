import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {
  en: {
    common: {
      nav: {
        home: "Home",
        report: "Report Hazard",
        dashboard: "Dashboard",
        analytics: "Analytics",
        login: "Login",
        logout: "Logout",
        language: "Language",
      },
      landing: {
        title: "Integrated Ocean Hazard Reporting Platform",
        subtitle: "Indian National Centre for Ocean Information Services",
        description:
          "Report ocean hazards, monitor coastal threats, and stay informed about marine safety conditions along India's coastline.",
        reportButton: "Report Hazard",
        dashboardButton: "Official Dashboard",
        features: {
          realtime: "Real-time Monitoring",
          realtimeDesc: "24/7 surveillance of ocean conditions",
          community: "Community Reports",
          communityDesc: "Citizen-powered hazard detection",
          analytics: "Advanced Analytics",
          analyticsDesc: "AI-powered threat assessment",
        },
      },
      report: {
        title: "Report Ocean Hazard",
        hazardType: "Hazard Type",
        description: "Description",
        location: "Location",
        media: "Upload Photo/Video",
        submit: "Submit Report",
        success: "Report submitted successfully",
        offline: "Saved offline - will sync when connected",
      },
      dashboard: {
        title: "Hazard Dashboard",
        filters: "Filters",
        stats: "Statistics",
        reports: "Reports",
        verified: "Verified",
        pending: "Pending",
      },
      auth: {
        login: "Login",
        register: "Register",
        email: "Email",
        password: "Password",
        role: "Role",
        citizen: "Citizen",
        official: "Official",
      },
    },
  },
  hi: {
    common: {
      nav: {
        home: "होम",
        report: "खतरे की रिपोर्ट करें",
        dashboard: "डैशबोर्ड",
        analytics: "विश्लेषण",
        login: "लॉगिन",
        logout: "लॉगआउट",
        language: "भाषा",
      },
      landing: {
        title: "एकीकृत समुद्री खतरा रिपोर्टिंग प्लेटफॉर्म",
        subtitle: "भारतीय राष्ट्रीय समुद्री सूचना सेवा केंद्र",
        description:
          "समुद्री खतरों की रिपोर्ट करें, तटीय खतरों की निगरानी करें, और भारत की तटरेखा के साथ समुद्री सुरक्षा स्थितियों के बारे में जानकारी रखें।",
        reportButton: "खतरे की रिपोर्ट करें",
        dashboardButton: "आधिकारिक डैशबोर्ड",
        features: {
          realtime: "वास्तविक समय निगरानी",
          realtimeDesc: "समुद्री स्थितियों की 24/7 निगरानी",
          community: "सामुदायिक रिपोर्ट",
          communityDesc: "नागरिक-संचालित खतरा पहचान",
          analytics: "उन्नत विश्लेषण",
          analyticsDesc: "AI-संचालित खतरा मूल्यांकन",
        },
      },
      report: {
        title: "समुद्री खतरे की रिपोर्ट करें",
        hazardType: "खतरे का प्रकार",
        description: "विवरण",
        location: "स्थान",
        media: "फोटो/वीडियो अपलोड करें",
        submit: "रिपोर्ट जमा करें",
        success: "रिपोर्ट सफलतापूर्वक जमा की गई",
        offline: "ऑफलाइन सहेजा गया - कनेक्ट होने पर सिंक होगा",
      },
      dashboard: {
        title: "खतरा डैशबोर्ड",
        filters: "फिल्टर",
        stats: "आंकड़े",
        reports: "रिपोर्ट",
        verified: "सत्यापित",
        pending: "लंबित",
      },
      auth: {
        login: "लॉगिन",
        register: "पंजीकरण",
        email: "ईमेल",
        password: "पासवर्ड",
        role: "भूमिका",
        citizen: "नागरिक",
        official: "अधिकारी",
      },
    },
  },
  ta: {
    common: {
      nav: {
        home: "முகப்பு",
        report: "ஆபத்தை புகாரளிக்கவும்",
        dashboard: "டாஷ்போர்டு",
        analytics: "பகுப்பாய்வு",
        login: "உள்நுழைவு",
        logout: "வெளியேறு",
        language: "மொழி",
      },
      landing: {
        title: "ஒருங்கிணைந்த கடல் ஆபத்து அறிக்கை தளம்",
        subtitle: "இந்திய தேசிய கடல் தகவல் சேவைகள் மையம்",
        description:
          "கடல் ஆபத்துகளை புகாரளிக்கவும், கடலோர அச்சுறுத்தல்களை கண்காணிக்கவும், இந்தியாவின் கடற்கரையோரம் கடல் பாதுகாப்பு நிலைமைகள் பற்றி அறிந்து கொள்ளவும்.",
        reportButton: "ஆபத்தை புகாரளிக்கவும்",
        dashboardButton: "அதிகாரப்பூர்வ டாஷ்போர்டு",
        features: {
          realtime: "நேரடி கண்காணிப்பு",
          realtimeDesc: "கடல் நிலைமைகளின் 24/7 கண்காணிப்பு",
          community: "சமூக அறிக்கைகள்",
          communityDesc: "குடிமக்கள் இயக்கும் ஆபத்து கண்டறிதல்",
          analytics: "மேம்பட்ட பகுப்பாய்வு",
          analyticsDesc: "AI-இயக்கும் அச்சுறுத்தல் மதிப்பீடு",
        },
      },
      report: {
        title: "கடல் ஆபத்தை புகாரளிக்கவும்",
        hazardType: "ஆபத்து வகை",
        description: "விளக்கம்",
        location: "இடம்",
        media: "புகைப்படம்/வீடியோ பதிவேற்றவும்",
        submit: "அறிக்கை சமர்ப்பிக்கவும்",
        success: "அறிக்கை வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது",
        offline: "ஆஃப்லைனில் சேமிக்கப்பட்டது - இணைக்கப்படும்போது ஒத்திசைக்கும்",
      },
      dashboard: {
        title: "ஆபத்து டாஷ்போர்டு",
        filters: "வடிகட்டிகள்",
        stats: "புள்ளிவிவரங்கள்",
        reports: "அறிக்கைகள்",
        verified: "சரிபார்க்கப்பட்டது",
        pending: "நிலுவையில்",
      },
      auth: {
        login: "உள்நுழைவு",
        register: "பதிவு",
        email: "மின்னஞ்சல்",
        password: "கடவுச்சொல்",
        role: "பங்கு",
        citizen: "குடிமகன்",
        official: "அதிகாரி",
      },
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
