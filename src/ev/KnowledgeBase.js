// ============================================================
//  EV Knowledge Base - Model Primary School
//  Encoding: UTF-8  |  No emojis (TTS-safe)
// ============================================================

export const knowledgeBase = [
  {
    id: "greet",
    category: "Greeting",
    keywords: ["hi", "hello", "hey", "नमस्ते", "नमस्कार", "हेलो", "सुनो"],
    answerHin: "नमस्ते! मैं EV हूँ, मॉडल प्राइमरी स्कूल की डिजिटल असिस्टेंट। मैं आपकी क्या मदद कर सकती हूँ?",
    answerEng: "Hello! I am EV, the digital assistant for Model Primary School. How can I help you today?"
  },
  {
    id: "contact_phone",
    category: "Contact",
    keywords: ["phone", "number", "call", "contact", "फ़ोन", "नंबर", "कॉल", "संपर्क", "बात"],
    answerHin: "आप स्कूल से सीधे संपर्क करने के लिए 9 4 5 4 8 2 6 9 2 1 पर कॉल कर सकते हैं।",
    answerEng: "You can call the school directly at 9 4 5 4 8 2 6 9 2 1."
  },
  {
    id: "principal",
    category: "Leadership",
    keywords: ["principal", "head", "manager", "प्रिंसिपल", "प्रधानाचार्य", "मैनेजर", "हेड"],
    answerHin: "स्कूल की प्रिंसिपल श्रीमती वंदना यादव जी हैं। उन्हें उत्तर प्रदेश सरकार द्वारा 'स्टेट टीचर अवार्ड' से सम्मानित किया गया है।",
    answerEng: "The Principal of the school is Smt. Vandana Yadav. She is a recipient of the State Teacher Award from the UP Government."
  },
  {
    id: "faculty",
    category: "Academics",
    keywords: ["teachers", "staff", "faculty", "टीचर", "अध्यापक", "स्टाफ", "पढ़ाता", "कौन"],
    answerHin: "हमारे पास बहुत ही अनुभवी शिक्षक हैं, जिनमें दीक्षा श्रीवास्तव (स्टेट ICT अवार्ड विजेता), सुनील सिंह और जानकी देवी जी शामिल हैं।",
    answerEng: "We have a highly experienced faculty, including Diksha Shrivastav (State ICT Awardee), Sunil Singh, and Janki Devi."
  },
  {
    id: "timings",
    category: "Academics",
    keywords: ["time", "timing", "open", "close", "समय", "बजे", "कब", "खुलता", "टाइम"],
    answerHin: "स्कूल सोमवार से शनिवार, सुबह 8 बजे से दोपहर 2 बजे तक खुलता है।",
    answerEng: "The school is open from Monday to Saturday, 8:00 AM to 2:00 PM."
  },
  {
    id: "admission_fees",
    category: "Admissions",
    keywords: ["admission", "fees", "fee", "cost", "एडमिशन", "दाखिला", "फीस", "पैसा", "खर्च"],
    answerHin: "2026-27 सेशन के लिए एडमिशन खुले हैं! फीस और दाखिले की पूरी जानकारी के लिए कृपया स्कूल आएं या 9 4 5 4 8 2 6 9 2 1 पर कॉल करें।",
    answerEng: "Admissions for the 2026-27 session are open! For exact fee and admission details, please visit the campus or call 9 4 5 4 8 2 6 9 2 1."
  },
  {
    id: "classes",
    category: "Academics",
    keywords: ["class", "classes", "age", "क्लास", "कक्षा", "उम्र", "साल"],
    answerHin: "हमारा स्कूल इंग्लिश मीडियम है और यहाँ LKG से लेकर कक्षा 5 तक की पढ़ाई होती है।",
    answerEng: "We are an English medium school offering classes from LKG up to Class 5."
  },
  {
    id: "facilities",
    category: "Infrastructure",
    keywords: ["facility", "facilities", "cctv", "suvidha", "सुविधा", "कैमरा", "बस", "bus", "transport"],
    answerHin: "बच्चों की सुरक्षा के लिए पूरा कैंपस CCTV की निगरानी में है। इसके अलावा स्मार्ट क्लास, कंप्यूटर लैब और ट्रांसपोर्ट की सुविधा भी उपलब्ध है।",
    answerEng: "The entire campus is under CCTV surveillance for safety. We also provide Smart Classrooms, a Computer Lab, and Transport facilities."
  }
];

export const KB = knowledgeBase;

export const GREETING = {
  hin: "नमस्ते! मैं EV हूँ, मॉडल प्राइमरी स्कूल की डिजिटल असिस्टेंट। मैं आपकी क्या मदद कर सकती हूँ?",
  eng: "Hello! I am EV, the digital assistant of Model Primary School. How can I help you today?",
};

export const FALLBACK = {
  hin: "मुझे खेद है, मैं इसका जवाब नहीं दे पाई। कृपया स्कूल से सीधे संपर्क करें: 9 4 5 4 8 2 6 9 2 1",
  eng: "I am sorry, I could not find an answer to that. Please contact the school directly at 9 4 5 4 8 2 6 9 2 1.",
};
