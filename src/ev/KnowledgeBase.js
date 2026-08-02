// ============================================================
//  EV Knowledge Base - Model Primary School
//  Full Menu-Driven, Bilingual (Hindi/English) Flow Tree
//  Every node: { text: { hi, en }, options: [ { label: { hi, en }, next } ] }
//  Terminal nodes (no options or options=[] routing to CONTACT) always
//  include the full contact block.
// ============================================================

// ── SHARED CONTACT NODE ─────────────────────────────────────
export const CONTACT_NODE = {
  text: {
    hi: "📞 हमसे संपर्क करें\n\n📱 फ़ोन: 9454826921\n💬 WhatsApp: 9454826921\n📧 ईमेल: psbharsare@gmail.com\n📍 पता: भरसरे, भदैयाँ, सुल्तानपुर, उत्तर प्रदेश\n⏰ समय: सोम–शनि, सुबह 8 बजे – दोपहर 2 बजे\n\n🌐 सोशल मीडिया:\n📸 Instagram: mpsbharsare\n👍 Facebook: Model Primary School\n▶️ YouTube: vandanayadav7071\n💬 WhatsApp पर लिखें",
    en: "📞 Contact Us\n\n📱 Phone: 9454826921\n💬 WhatsApp: 9454826921\n📧 Email: psbharsare@gmail.com\n📍 Address: Bharsare, Bhadaiyan, Sultanpur, Uttar Pradesh\n⏰ Hours: Mon–Sat, 8:00 AM – 2:00 PM\n\n🌐 Social Media:\n📸 Instagram: mpsbharsare\n👍 Facebook: Model Primary School\n▶️ YouTube: vandanayadav7071\n💬 Chat on WhatsApp",
  },
  options: [
    {
      label: { hi: "🏠 मुख्य मेनू पर वापस", en: "🏠 Back to Main Menu" },
      next: "ROOT",
    },
  ],
};

// ── FLOW DATA TREE ───────────────────────────────────────────
export const flowData = {

  ROOT: {
    text: {
      hi: "🏠 मुख्य मेनू: आप क्या जानना चाहते हैं?",
      en: "🏠 Main Menu: What would you like to know?",
    },
    options: [
      { label: { hi: "🏫 स्कूल के बारे में", en: "🏫 About the School" }, next: "ABOUT" },
      { label: { hi: "📚 प्रवेश (Admission)", en: "📚 Admissions" }, next: "ADMISSIONS" },
      { label: { hi: "🎓 कक्षाएं और पाठ्यक्रम", en: "🎓 Classes & Curriculum" }, next: "CLASSES" },
      { label: { hi: "👨‍🏫 प्रिंसिपल और शिक्षक", en: "👨‍🏫 Principal & Faculty" }, next: "FACULTY" },
      { label: { hi: "🏛️ सुविधाएं और बुनियादी ढाँचा", en: "🏛️ Facilities & Infrastructure" }, next: "FACILITIES" },
      { label: { hi: "🕐 स्कूल का समय", en: "🕐 School Timings" }, next: "TIMINGS" },
      { label: { hi: "🌐 सोशल मीडिया", en: "🌐 Social Media" }, next: "SOCIALS" },
      { label: { hi: "📞 संपर्क करें", en: "📞 Contact Us" }, next: "CONTACT" },
    ],
  },

  // ── ABOUT ────────────────────────────────────────────────
  ABOUT: {
    text: {
      hi: "🏫 मॉडल प्राइमरी स्कूल के बारे में\n\n1988 में स्थापित, यह विद्यालय भरसरे, भदैयाँ, सुल्तानपुर में स्थित एक सरकार मान्यता प्राप्त अंग्रेज़ी माध्यम स्कूल है। LKG से कक्षा 5 तक शिक्षा प्रदान करते हुए, हम 350 से अधिक बच्चों की नींव सँवारते हैं। आप क्या जानना चाहते हैं?",
      en: "🏫 About Model Primary School\n\nFounded in 1988, we are a government-recognized English medium school in Bharsare, Bhadaiyan, Sultanpur. Offering classes from LKG to Class 5, we have been shaping the foundations of 350+ children for over 38 years. What would you like to know?",
    },
    options: [
      { label: { hi: "📜 हमारी कहानी (इतिहास)", en: "📜 Our Story & History" }, next: "ABOUT_STORY" },
      { label: { hi: "🏆 पुरस्कार और सम्मान", en: "🏆 Awards & Recognition" }, next: "AWARDS" },
      { label: { hi: "🎯 दृष्टि (Vision) और मिशन", en: "🎯 Vision & Mission" }, next: "VISION" },
      { label: { hi: "📊 स्कूल के आंकड़े", en: "📊 School Statistics" }, next: "STATS" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  ABOUT_STORY: {
    text: {
      hi: "📜 हमारी कहानी\n\nमॉडल प्राइमरी स्कूल की स्थापना 1988 में हुई थी — भरसरे और भदैयाँ के बच्चों को घर के पास गुणवत्तापूर्ण अंग्रेज़ी-माध्यम शिक्षा देने के उद्देश्य से। आज यह सुल्तानपुर जिले का सबसे भरोसेमंद प्राथमिक विद्यालय है। एक छोटे से विद्यालय से शुरू होकर, हम आज 350+ परिवारों के विश्वास का केंद्र बन चुके हैं।",
      en: "📜 Our Story\n\nModel Primary School was founded in 1988 with a simple purpose — to give children of Bharsare and Bhadaiyan access to quality English-medium education close to home. From a small neighbourhood school, we have grown into the most trusted primary school in Sultanpur district, trusted by 350+ families.",
    },
    options: [
      { label: { hi: "🏆 हमारे पुरस्कार देखें", en: "🏆 See Our Awards" }, next: "AWARDS" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
      { label: { hi: "📞 संपर्क करें", en: "📞 Contact Us" }, next: "CONTACT" },
    ],
  },

  AWARDS: {
    text: {
      hi: "🏆 पुरस्कार एवं सम्मान\n\nहमारी प्रधानाचार्य श्रीमती वंदना यादव जी को:\n\n🥇 राज्य शिक्षक पुरस्कार — उत्तर प्रदेश सरकार\n👑 राज्यपाल उत्कृष्टता सम्मान — माननीय राज्यपाल (UP)\n🎖️ राष्ट्रीय विशेष सम्मान — सांसद श्रीमती मेनका गांधी\n⭐ DM C. Indumati, DM Ravish Gupta, DM Kritika Jyotsna द्वारा सम्मानित\n⭐ नारी सशक्तिकरण पुरस्कार\n⭐ Amar Ujala द्वारा मान्यता प्राप्त\n\nशिक्षिका दीक्षा श्रीवास्तव को राज्य ICT पुरस्कार से सम्मानित किया गया है।",
      en: "🏆 Awards & Recognition\n\nOur Principal Smt. Vandana Yadav has received:\n\n🥇 State Teacher Award — UP Government\n👑 Governor's Excellence Award — Governor of Uttar Pradesh\n🎖️ National Recognition — MP Smt. Maneka Gandhi\n⭐ Honoured by DM C. Indumati, DM Ravish Gupta, DM Kritika Jyotsna\n⭐ Nari Sashaktikaran Award\n⭐ Recognised by Team Amar Ujala\n\nTeacher Diksha Shrivastav is also a State ICT Award winner.",
    },
    options: [
      { label: { hi: "👩‍🏫 शिक्षकों के बारे में जानें", en: "👩‍🏫 Meet Our Faculty" }, next: "FACULTY" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
      { label: { hi: "📞 संपर्क करें", en: "📞 Contact Us" }, next: "CONTACT" },
    ],
  },

  VISION: {
    text: {
      hi: "🎯 दृष्टि और मिशन\n\n🌟 हमारी दृष्टि:\nसुल्तानपुर का सबसे भरोसेमंद प्राथमिक विद्यालय बनना, जहाँ भरसरे और आसपास के गाँवों के हर बच्चे को उच्च गुणवत्ता वाली अंग्रेज़ी शिक्षा मिले।\n\n💪 हमारा मिशन:\nआनंदमयी, गतिविधि-आधारित शिक्षा के माध्यम से हर बच्चे की क्षमता निखारना — एक सुरक्षित, अनुशासित और प्रेमपूर्ण वातावरण में।",
      en: "🎯 Vision & Mission\n\n🌟 Our Vision:\nTo be the most trusted primary school in Sultanpur — a place where every child from Bharsare and surrounding villages can access quality English-medium education.\n\n💪 Our Mission:\nTo nurture every child's potential through joyful, activity-based learning in a safe, disciplined and loving environment.",
    },
    options: [
      { label: { hi: "📚 पाठ्यक्रम देखें", en: "📚 See Our Curriculum" }, next: "CLASSES" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  STATS: {
    text: {
      hi: "📊 मॉडल स्कूल एक नज़र में\n\n📅 स्थापना: 1988 (38+ वर्ष)\n👦 खुशहाल विद्यार्थी: 350+\n👨‍🏫 समर्पित शिक्षक: 4\n📚 कक्षाएं: 7 स्तर (LKG से कक्षा 5)\n🏛️ मान्यता: सरकार मान्यता प्राप्त (UP सरकार)\n🌐 माध्यम: अंग्रेज़ी माध्यम\n📍 स्थान: भरसरे, भदैयाँ, सुल्तानपुर",
      en: "📊 Model School at a Glance\n\n📅 Established: 1988 (38+ Years)\n👦 Happy Students: 350+\n👨‍🏫 Dedicated Teachers: 4\n📚 Grade Levels: 7 (LKG to Class 5)\n🏛️ Recognition: Government Recognised (UP Govt.)\n🌐 Medium: English Medium\n📍 Location: Bharsare, Bhadaiyan, Sultanpur",
    },
    options: [
      { label: { hi: "📚 प्रवेश के बारे में जानें", en: "📚 Learn About Admissions" }, next: "ADMISSIONS" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
      { label: { hi: "📞 संपर्क करें", en: "📞 Contact Us" }, next: "CONTACT" },
    ],
  },

  // ── ADMISSIONS ───────────────────────────────────────────
  ADMISSIONS: {
    text: {
      hi: "📚 प्रवेश 2026-27 — अभी खुले हैं!\n\nसीमित सीटें उपलब्ध हैं। आप क्या जानना चाहते हैं?",
      en: "📚 Admissions 2026-27 — Now Open!\n\nLimited seats available. What would you like to know?",
    },
    options: [
      { label: { hi: "📋 प्रवेश प्रक्रिया (5 चरण)", en: "📋 5-Step Admission Process" }, next: "ADM_PROCESS" },
      { label: { hi: "📄 जरूरी दस्तावेज़", en: "📄 Required Documents" }, next: "ADM_DOCS" },
      { label: { hi: "🎂 आयु पात्रता (Age Eligibility)", en: "🎂 Age Eligibility by Class" }, next: "ADM_AGE" },
      { label: { hi: "💰 फीस की जानकारी", en: "💰 Fee Information" }, next: "ADM_FEES" },
      { label: { hi: "🤝 PTM और अभिभावक सहभागिता", en: "🤝 PTM & Parent Partnership" }, next: "ADM_PARENTS" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  ADM_PROCESS: {
    text: {
      hi: "📋 प्रवेश की 5 सरल प्रक्रिया\n\n1️⃣ स्कूल आएं और जानकारी लें\n   भरसरे स्कूल कार्यालय आएं या कॉल करें।\n\n2️⃣ फॉर्म लें\n   स्कूल रिसेप्शन से प्रवेश फॉर्म प्राप्त करें।\n\n3️⃣ फॉर्म और दस्तावेज़ जमा करें\n   भरा हुआ फॉर्म और जरूरी कागज़ात जमा करें।\n\n4️⃣ मिलिए और मुस्कुराइए\n   बच्चे और माता-पिता की एक छोटी, मैत्रीपूर्ण मुलाकात।\n\n5️⃣ सीट कन्फर्म करें\n   औपचारिकताएं और फीस भुगतान कर सीट सुनिश्चित करें।",
      en: "📋 5 Simple Steps to Enroll\n\n1️⃣ Visit & Enquire\n   Visit the school office in Bharsare or call us.\n\n2️⃣ Collect the Form\n   Collect the admission form from school reception.\n\n3️⃣ Submit Form & Documents\n   Fill the form and submit with required documents.\n\n4️⃣ Meet & Greet\n   A short, friendly interaction with child and parents.\n\n5️⃣ Confirm the Seat\n   Complete formalities and fee payment to confirm.",
    },
    options: [
      { label: { hi: "📄 जरूरी दस्तावेज़", en: "📄 Required Documents" }, next: "ADM_DOCS" },
      { label: { hi: "📞 अभी कॉल करें", en: "📞 Call Now" }, next: "CONTACT" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  ADM_DOCS: {
    text: {
      hi: "📄 प्रवेश के लिए जरूरी दस्तावेज़\n\n✅ बच्चे का जन्म प्रमाण पत्र (मूल + फोटोकॉपी)\n✅ बच्चे की 4 पासपोर्ट साइज़ फ़ोटो\n✅ बच्चे और माता-पिता का आधार कार्ड\n✅ माता-पिता का पता प्रमाण\n✅ स्थानांतरण प्रमाण पत्र (TC) — कक्षा 1 और ऊपर के लिए, यदि लागू हो\n✅ पिछले स्कूल की रिपोर्ट कार्ड, यदि उपलब्ध हो",
      en: "📄 Required Documents for Admission\n\n✅ Child's birth certificate (original + photocopy)\n✅ 4 recent passport-size photographs of the child\n✅ Aadhar card — child and parent/guardian\n✅ Address proof of parent/guardian\n✅ Transfer Certificate (TC) — for Class 1 and above, if applicable\n✅ Previous school report card, if available",
    },
    options: [
      { label: { hi: "🎂 आयु पात्रता देखें", en: "🎂 See Age Eligibility" }, next: "ADM_AGE" },
      { label: { hi: "📞 संपर्क करें", en: "📞 Contact School" }, next: "CONTACT" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  ADM_AGE: {
    text: {
      hi: "🎂 आयु पात्रता (प्रवेश के समय)\n\n🌱 LKG — 3+ वर्ष\n🌿 UKG — 4+ वर्ष\n📖 कक्षा 1 — 5+ वर्ष\n📗 कक्षा 2 — 6+ वर्ष\n📘 कक्षा 3 — 7+ वर्ष\n📙 कक्षा 4 — 8+ वर्ष\n📕 कक्षा 5 — 9+ वर्ष",
      en: "🎂 Age Eligibility (as of intake date)\n\n🌱 LKG — 3+ years\n🌿 UKG — 4+ years\n📖 Class 1 — 5+ years\n📗 Class 2 — 6+ years\n📘 Class 3 — 7+ years\n📙 Class 4 — 8+ years\n📕 Class 5 — 9+ years",
    },
    options: [
      { label: { hi: "📋 प्रवेश प्रक्रिया देखें", en: "📋 See Admission Process" }, next: "ADM_PROCESS" },
      { label: { hi: "📞 अभी संपर्क करें", en: "📞 Contact Now" }, next: "CONTACT" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  ADM_FEES: {
    text: {
      hi: "💰 फीस की जानकारी\n\nफीस और दाखिले की विस्तृत जानकारी के लिए कृपया सीधे स्कूल से संपर्क करें।\n\n📱 फ़ोन: 9454826921\n💬 WhatsApp: 9454826921\n📧 ईमेल: psbharsare@gmail.com\n📍 भरसरे, भदैयाँ, सुल्तानपुर",
      en: "💰 Fee Information\n\nFor detailed fee and admission information, please contact the school directly.\n\n📱 Phone: 9454826921\n💬 WhatsApp: 9454826921\n📧 Email: psbharsare@gmail.com\n📍 Bharsare, Bhadaiyan, Sultanpur",
    },
    options: [
      { label: { hi: "📞 अभी कॉल करें", en: "📞 Call Now" }, next: "CONTACT" },
      { label: { hi: "📋 प्रवेश प्रक्रिया", en: "📋 Admission Process" }, next: "ADM_PROCESS" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  ADM_PARENTS: {
    text: {
      hi: "🤝 अभिभावक सहभागिता\n\n👨‍👩‍👧 PTM (Parent-Teacher Meeting):\nनियमित अभिभावक-शिक्षक बैठकें जहाँ आपके बच्चे की प्रगति पर चर्चा होती है।\n\n👩‍👧 MTA (Mother-Teacher Association):\nमाँ और शिक्षक मिलकर बच्चे के विकास की योजना बनाते हैं।\n\n🍱 Mid-Day Meal (MDM):\nसरकार द्वारा समर्थित पौष्टिक भोजन — हर दिन बच्चों को ऊर्जावान बनाए रखने के लिए।",
      en: "🤝 Parent Partnership\n\n👨‍👩‍👧 PTM (Parent-Teacher Meeting):\nRegular meetings where your child's progress is discussed.\n\n👩‍👧 MTA (Mother-Teacher Association):\nMothers and teachers working together for each child's development.\n\n🍱 Mid-Day Meal (MDM):\nGovernment-supported nutritious meals provided daily to keep every child nourished and energized.",
    },
    options: [
      { label: { hi: "📚 प्रवेश प्रक्रिया", en: "📚 Admission Process" }, next: "ADM_PROCESS" },
      { label: { hi: "📞 संपर्क करें", en: "📞 Contact Us" }, next: "CONTACT" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  // ── CLASSES & CURRICULUM ─────────────────────────────────
  CLASSES: {
    text: {
      hi: "🎓 कक्षाएं और पाठ्यक्रम\n\nहम LKG से कक्षा 5 तक शिक्षा प्रदान करते हैं — अंग्रेज़ी माध्यम में। आप किस बारे में जानना चाहते हैं?",
      en: "🎓 Classes & Curriculum\n\nWe offer classes from LKG to Class 5 — in English medium. What would you like to know?",
    },
    options: [
      { label: { hi: "🌱 LKG–UKG (3–5 वर्ष)", en: "🌱 LKG–UKG (Ages 3–5)" }, next: "CLASS_PREPRIMARY" },
      { label: { hi: "📖 कक्षा 1–2 (6–7 वर्ष)", en: "📖 Class 1–2 (Ages 6–7)" }, next: "CLASS_PRIMARY1" },
      { label: { hi: "📚 कक्षा 3–5 (8–10 वर्ष)", en: "📚 Class 3–5 (Ages 8–10)" }, next: "CLASS_PRIMARY2" },
      { label: { hi: "⏰ दैनिक दिनचर्या", en: "⏰ Daily Routine" }, next: "DAILY_ROUTINE" },
      { label: { hi: "🎨 पाठ्येतर गतिविधियाँ", en: "🎨 Co-Curricular Activities" }, next: "EXTRACURRICULAR" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  CLASS_PREPRIMARY: {
    text: {
      hi: "🌱 LKG – UKG (आयु 3–5 वर्ष)\n\nचरण 01: प्री-प्राइमरी\n\n✨ खेल, फ़ोनिक्स और प्रारंभिक लेखन की नींव\n\n📌 विषय:\n• कविताएँ और कहानियाँ\n• फ़ोनिक्स और उच्चारण\n• प्रारंभिक लेखन अभ्यास\n• अंकों का ज्ञान\n• कला और शिल्प\n• खेल और मुक्त खेलकूद\n\n100% गतिविधि और कहानियों पर आधारित शुरुआत",
      en: "🌱 LKG – UKG (Ages 3–5 Years)\n\nStage 01: Pre-Primary\n\n✨ Foundational Play, Phonics & Pre-Writing\n\n📌 Subjects:\n• Rhymes & Stories\n• Phonics & Speech\n• Pre-Writing Skills\n• Number Sense\n• Art & Craft\n• Free Play & Games\n\n✨ 100% Activity & Story-Based Foundation",
    },
    options: [
      { label: { hi: "📖 कक्षा 1-2 देखें", en: "📖 See Class 1-2" }, next: "CLASS_PRIMARY1" },
      { label: { hi: "📚 प्रवेश जानकारी", en: "📚 Admission Info" }, next: "ADMISSIONS" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  CLASS_PRIMARY1: {
    text: {
      hi: "📖 कक्षा 1 – 2 (आयु 6–7 वर्ष)\n\nचरण 02: प्राइमरी I\n\n📌 विषय:\n• अंग्रेज़ी साहित्य\n• हिंदी भाषा\n• गणित\n• पर्यावरण अध्ययन (EVS)\n• सामान्य ज्ञान (GK)\n• कला और शारीरिक शिक्षा\n\nमज़बूत शैक्षणिक पठन और गणित की आदतें बनाना",
      en: "📖 Class 1 – 2 (Ages 6–7 Years)\n\nStage 02: Primary I\n\n📌 Subjects:\n• English Literature\n• Hindi Language\n• Mathematics\n• Environmental Studies (EVS)\n• General Knowledge (GK)\n• Art & Physical Education\n\n📚 Building strong academic reading and math habits",
    },
    options: [
      { label: { hi: "📚 कक्षा 3-5 देखें", en: "📚 See Class 3-5" }, next: "CLASS_PRIMARY2" },
      { label: { hi: "📚 प्रवेश जानकारी", en: "📚 Admission Info" }, next: "ADMISSIONS" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  CLASS_PRIMARY2: {
    text: {
      hi: "📚 कक्षा 3 – 5 (आयु 8–10 वर्ष)\n\nचरण 03: प्राइमरी II\n\n📌 विषय:\n• अंग्रेज़ी व्याकरण\n• हिंदी साहित्य\n• उन्नत गणित\n• EVS / विज्ञान\n• कंप्यूटर बेसिक्स\n• GK, कला और खेलकूद\n\nकंप्यूटर-तैयार और परीक्षा-तैयार दिमाग बनाना",
      en: "📚 Class 3 – 5 (Ages 8–10 Years)\n\nStage 03: Primary II\n\n📌 Subjects:\n• English Grammar\n• Hindi Literature\n• Advanced Mathematics\n• EVS / Science\n• Computer Basics\n• GK, Art & Sports\n\n🚀 Building Computer-Ready & Exam-Prepared Minds",
    },
    options: [
      { label: { hi: "💻 स्मार्ट क्लास और सुविधाएं", en: "💻 Smart Class & Facilities" }, next: "FACILITIES" },
      { label: { hi: "📚 प्रवेश जानकारी", en: "📚 Admission Info" }, next: "ADMISSIONS" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  DAILY_ROUTINE: {
    text: {
      hi: "⏰ स्कूल की दैनिक दिनचर्या\n\nसुबह 8 बजे — प्रातः कालीन प्रार्थना सभा\nसुबह 8 बज कर 20 मिनट — पहली शिक्षण अवधि\nसुबह 9 बज कर 50 मिनट — लघु अवकाश\nसुबह 10 बजे — मुख्य विषयों की कक्षाएं\nदोपहर 12 बजे — भोजन और मैदान खेल\nदोपहर 12 बज कर 40 मिनट — गतिविधि / सह-पाठ्यक्रम अवधि\nदोपहर 1 बज कर 30 मिनट — समापन प्रार्थना और विसर्जन\n\n(यह एक नमूना कार्यक्रम है, वास्तविक समय कक्षा के अनुसार भिन्न हो सकता है।)",
      en: "⏰ Daily School Routine\n\n8:00 AM — Morning Assembly & Prayer\n8:20 AM — First Teaching Period\n9:50 AM — Short Break\n10:00 AM — Core Subject Periods\n12:00 PM — Lunch & Outdoor Play\n12:40 PM — Activity / Co-Curricular Period\n1:30 PM — Closing Assembly & Dismissal\n\n(Sample schedule — actual timings may vary by class.)",
    },
    options: [
      { label: { hi: "🎨 पाठ्येतर गतिविधियाँ", en: "🎨 Co-Curricular Activities" }, next: "EXTRACURRICULAR" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  EXTRACURRICULAR: {
    text: {
      hi: "🎨 पाठ्येतर गतिविधियाँ\n\n🖌️ कला और शिल्प:\nचित्रकारी, रंगाई और हस्त-कला से रचनात्मक अभिव्यक्ति।\n\n💃 नृत्य और सांस्कृतिक कार्यक्रम:\nमंच प्रदर्शन से आत्मविश्वास और अभिव्यक्ति का विकास।\n\n⚽ खेलकूद और शारीरिक शिक्षा:\nदैनिक खेल, मैदान और झूले — फिटनेस और टीमवर्क।\n\n🚌 शैक्षिक भ्रमण और ग्राम जागरूकता:\nऐतिहासिक स्थलों की यात्राएं और सामुदायिक जागरूकता रैलियां।",
      en: "🎨 Co-Curricular Activities\n\n🖌️ Art & Craft:\nCreative sessions with drawing, painting and handcrafting.\n\n💃 Dance & Cultural Arts:\nVibrant performances building confidence and stage expression.\n\n⚽ Sports & Physical Education:\nDaily games, outdoor swing areas — fitness and teamwork.\n\n🚌 Educational Tours & Village Awareness:\nField trips to cultural sites and community awareness rallies.",
    },
    options: [
      { label: { hi: "🏛️ सुविधाएं देखें", en: "🏛️ See Facilities" }, next: "FACILITIES" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  // ── FACULTY ──────────────────────────────────────────────
  FACULTY: {
    text: {
      hi: "👨‍🏫 प्रिंसिपल और शिक्षक दल\n\nआप किनके बारे में जानना चाहते हैं?",
      en: "👨‍🏫 Principal & Faculty Team\n\nWho would you like to know about?",
    },
    options: [
      { label: { hi: "👩‍💼 प्रिंसिपल — श्रीमती वंदना यादव", en: "👩‍💼 Principal — Smt. Vandana Yadav" }, next: "PRINCIPAL" },
      { label: { hi: "👩‍🏫 दीक्षा श्रीवास्तव (ICT Award)", en: "👩‍🏫 Diksha Shrivastav (ICT Award)" }, next: "TEACHER_DIKSHA" },
      { label: { hi: "👨‍🏫 सुनील सिंह", en: "👨‍🏫 Sunil Singh" }, next: "TEACHER_SUNIL" },
      { label: { hi: "👩‍🏫 जानकी देवी", en: "👩‍🏫 Janki Devi" }, next: "TEACHER_JANKI" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  PRINCIPAL: {
    text: {
      hi: "👩‍💼 श्रीमती वंदना यादव — प्रधानाचार्य\n\n1988 में विद्यालय की स्थापना से ही उनका नेतृत्व हमें प्रेरित करता है। उनके मार्गदर्शन में स्कूल सुल्तानपुर के सबसे भरोसेमंद विद्यालयों में से एक बन चुका है।\n\n🏆 प्रमुख पुरस्कार:\n🥇 राज्य शिक्षक पुरस्कार — UP सरकार\n👑 राज्यपाल उत्कृष्टता सम्मान\n🎖️ राष्ट्रीय सम्मान — सांसद श्रीमती मेनका गांधी\n⭐ नारी सशक्तिकरण पुरस्कार",
      en: "👩‍💼 Smt. Vandana Yadav — Principal\n\nA visionary leader since the school's founding in 1988. Under her guidance, the school has become one of the most trusted institutions in Sultanpur district.\n\n🏆 Key Awards:\n🥇 State Teacher Award — UP Government\n👑 Governor's Excellence Award\n🎖️ National Recognition — MP Smt. Maneka Gandhi\n⭐ Nari Sashaktikaran Award",
    },
    options: [
      { label: { hi: "🏆 सभी पुरस्कार देखें", en: "🏆 See All Awards" }, next: "AWARDS" },
      { label: { hi: "👩‍🏫 अन्य शिक्षक", en: "👩‍🏫 Other Teachers" }, next: "FACULTY" },
      { label: { hi: "📞 संपर्क करें", en: "📞 Contact Us" }, next: "CONTACT" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  TEACHER_DIKSHA: {
    text: {
      hi: "👩‍🏫 दीक्षा श्रीवास्तव\n\n🎖️ पद: सहायक अध्यापक\n⭐ सम्मान: राज्य ICT पुरस्कार विजेता\n\nदीक्षा जी हमारे विद्यालय की तकनीकी शिक्षा की धुरी हैं। उन्हें राज्य ICT पुरस्कार से सम्मानित किया गया है, जो प्रौद्योगिकी के माध्यम से शिक्षा को बेहतर बनाने के लिए दिया जाता है।",
      en: "👩‍🏫 Diksha Shrivastav\n\n🎖️ Role: Assistant Teacher\n⭐ Award: State ICT Award Winner\n\nDiksha is the cornerstone of tech-integrated education at our school. She has been honoured with the State ICT Award for her outstanding contribution to technology-enhanced learning.",
    },
    options: [
      { label: { hi: "👨‍🏫 सुनील सिंह के बारे में", en: "👨‍🏫 About Sunil Singh" }, next: "TEACHER_SUNIL" },
      { label: { hi: "👩‍🏫 जानकी देवी के बारे में", en: "👩‍🏫 About Janki Devi" }, next: "TEACHER_JANKI" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  TEACHER_SUNIL: {
    text: {
      hi: "👨‍🏫 सुनील सिंह\n\n🎖️ पद: सहायक अध्यापक\n\nसुनील सिंह जी हमारे विद्यालय के अनुभवी और समर्पित शिक्षक हैं। वे बच्चों को विषयों को बेहतर ढंग से समझाने में निपुण हैं।",
      en: "👨‍🏫 Sunil Singh\n\n🎖️ Role: Assistant Teacher\n\nSunil Singh is an experienced and dedicated teacher at our school. He is skilled at making complex subjects accessible and enjoyable for young learners.",
    },
    options: [
      { label: { hi: "👩‍🏫 दीक्षा श्रीवास्तव के बारे में", en: "👩‍🏫 About Diksha Shrivastav" }, next: "TEACHER_DIKSHA" },
      { label: { hi: "👩‍🏫 जानकी देवी के बारे में", en: "👩‍🏫 About Janki Devi" }, next: "TEACHER_JANKI" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  TEACHER_JANKI: {
    text: {
      hi: "👩‍🏫 जानकी देवी\n\n🎖️ पद: शिक्षा मित्र\n\nजानकी देवी जी हमारे विद्यालय की शिक्षा मित्र हैं। वे बच्चों के सर्वांगीण विकास और सामुदायिक जुड़ाव में महत्वपूर्ण भूमिका निभाती हैं।",
      en: "👩‍🏫 Janki Devi\n\n🎖️ Role: Shiksha Mitra\n\nJanki Devi serves as a Shiksha Mitra at our school. She plays a vital role in holistic student development and community engagement.",
    },
    options: [
      { label: { hi: "👩‍🏫 दीक्षा श्रीवास्तव के बारे में", en: "👩‍🏫 About Diksha Shrivastav" }, next: "TEACHER_DIKSHA" },
      { label: { hi: "👨‍🏫 सुनील सिंह के बारे में", en: "👨‍🏫 About Sunil Singh" }, next: "TEACHER_SUNIL" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  // ── FACILITIES ───────────────────────────────────────────
  FACILITIES: {
    text: {
      hi: "🏛️ सुविधाएं और बुनियादी ढाँचा\n\nआप किस सुविधा के बारे में जानना चाहते हैं?",
      en: "🏛️ Facilities & Infrastructure\n\nWhich facility would you like to know about?",
    },
    options: [
      { label: { hi: "📹 CCTV सुरक्षा", en: "📹 CCTV Security" }, next: "FAC_CCTV" },
      { label: { hi: "💻 स्मार्ट क्लास और कंप्यूटर लैब", en: "💻 Smart Class & Computer Lab" }, next: "FAC_SMART" },
      { label: { hi: "🚌 परिवहन सेवा", en: "🚌 Transport Facility" }, next: "FAC_TRANSPORT" },
      { label: { hi: "🌳 खेल का मैदान", en: "🌳 Play Area" }, next: "FAC_PLAY" },
      { label: { hi: "💧 पानी और स्वच्छता", en: "💧 Water & Sanitation" }, next: "FAC_WATER" },
      { label: { hi: "📚 पुस्तकालय", en: "📚 Library" }, next: "FAC_LIBRARY" },
      { label: { hi: "🍱 मध्याह्न भोजन (MDM)", en: "🍱 Mid-Day Meal (MDM)" }, next: "FAC_MDM" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  FAC_CCTV: {
    text: {
      hi: "📹 CCTV सुरक्षा\n\n🛡️ हमारा पूरा कैंपस CCTV कैमरों की निगरानी में है — जो माता-पिता को स्कूल के पूरे समय पूर्ण निश्चिंतता देता है।\n\nइसके अलावा:\n🚪 सुरक्षित मुख्य द्वार व आगंतुक सत्यापन\n👮 प्रशिक्षित और सत्यापित सहयोगी स्टाफ\n🏥 प्राथमिक चिकित्सा और आपातकालीन तैयारी",
      en: "📹 CCTV Security\n\n🛡️ Our entire campus is under CCTV surveillance — giving parents complete peace of mind throughout the school day.\n\nAdditionally:\n🚪 Gated entry & visitor verification\n👮 Trained & verified support staff\n🏥 First-aid & emergency readiness",
    },
    options: [
      { label: { hi: "🚌 परिवहन सेवा", en: "🚌 Transport Facility" }, next: "FAC_TRANSPORT" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  FAC_SMART: {
    text: {
      hi: "💻 स्मार्ट क्लास और कंप्यूटर लैब\n\n🖥️ स्मार्ट प्रोजेक्टर कक्षाएं:\nप्रोजेक्टर-सक्षम इंटरेक्टिव शिक्षा — हर पाठ रोचक और जीवंत।\n\n💻 कंप्यूटर शिक्षा लैब:\nबच्चों को शुरू से ही कंप्यूटर का परिचय देने के लिए समर्पित तकनीकी लैब।\n\n🧠 GK और विशेष कक्षाएं:\nकोई बच्चा पीछे न रहे — इसके लिए विशेष GK और रेमेडियल सपोर्ट।",
      en: "💻 Smart Class & Computer Lab\n\n🖥️ Smart Projector Classrooms:\nProjector-enabled interactive learning that makes every lesson vivid.\n\n💻 Computer Education Lab:\nDedicated tech-ready labs to introduce students to computers from an early age.\n\n🧠 GK & Remedial Classes:\nSpecialised GK enrichment and remedial support so no child is left behind.",
    },
    options: [
      { label: { hi: "📚 पुस्तकालय", en: "📚 Library" }, next: "FAC_LIBRARY" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  FAC_TRANSPORT: {
    text: {
      hi: "🚌 परिवहन सेवा\n\nहमारे विद्यालय में छात्रों के लिए सुरक्षित और सुविधाजनक परिवहन सुविधा उपलब्ध है — ताकि हर दिन उनका आवागमन सुरक्षित और आरामदायक हो।\n\nपरिवहन की विस्तृत जानकारी के लिए कृपया हमसे संपर्क करें:\n📱 9454826921",
      en: "🚌 Transport Facility\n\nWe provide safe and convenient transport facilities for students to ensure a comfortable and safe commute every day.\n\nFor detailed transport route information, please contact us:\n📱 9454826921",
    },
    options: [
      { label: { hi: "📞 संपर्क करें", en: "📞 Contact Us" }, next: "CONTACT" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  FAC_PLAY: {
    text: {
      hi: "🌳 खेल का मैदान\n\nहमारे पास एक विशाल और हरा-भरा खेल मैदान है जहाँ बच्चे प्रतिदिन:\n🤸 दौड़ते और खेलते हैं\n🛝 सुरक्षित झूले का आनंद लेते हैं\n⚽ दैनिक खेलकूद में भाग लेते हैं\n\nयह खेल का मैदान बच्चों के शारीरिक और मानसिक विकास के लिए आवश्यक है।",
      en: "🌳 Play Area\n\nOur generous, green outdoor play area where children every day:\n🤸 Run, climb and play freely\n🛝 Enjoy safe outdoor swings\n⚽ Participate in daily sports activities\n\nThis play area is essential for children's physical and mental development.",
    },
    options: [
      { label: { hi: "🏛️ अन्य सुविधाएं", en: "🏛️ Other Facilities" }, next: "FACILITIES" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  FAC_WATER: {
    text: {
      hi: "💧 पानी और स्वच्छता\n\n✅ 24/7 पानी की व्यवस्था\n✅ कैंपस में RO वॉटर कूलर\n✅ स्वच्छ और आरोग्यप्रद शौचालय\n\nहमारे बच्चों का स्वास्थ्य और स्वच्छता हमारी सर्वोच्च प्राथमिकता है।",
      en: "💧 Water & Sanitation\n\n✅ 24/7 running water supply\n✅ RO water coolers on campus\n✅ Clean & hygienic sanitation facilities\n\nThe health and hygiene of our children is our top priority.",
    },
    options: [
      { label: { hi: "🏛️ अन्य सुविधाएं", en: "🏛️ Other Facilities" }, next: "FACILITIES" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  FAC_LIBRARY: {
    text: {
      hi: "📚 पुस्तकालय\n\nज्ञान का एक समृद्ध केंद्र — हमारा पुस्तकालय बच्चों में जिज्ञासा और पढ़ने के प्रति प्रेम जगाता है। विविध पुस्तकें और संसाधन हर उम्र और रुचि के लिए उपलब्ध हैं।",
      en: "📚 Library\n\nA curated knowledge hub — our library sparks curiosity and instills a love of reading from an early age. A wide range of books and resources are available for every age and interest.",
    },
    options: [
      { label: { hi: "💻 स्मार्ट क्लास देखें", en: "💻 See Smart Class" }, next: "FAC_SMART" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  FAC_MDM: {
    text: {
      hi: "🍱 मध्याह्न भोजन (Mid-Day Meal)\n\nसरकार द्वारा समर्थित पौष्टिक भोजन — हर दिन हर बच्चे को ऊर्जावान और स्वस्थ रखने के लिए प्रदान किया जाता है। यह बच्चों के शारीरिक विकास और एकाग्रता के लिए अत्यंत महत्वपूर्ण है।",
      en: "🍱 Mid-Day Meal Programme (MDM)\n\nGovernment-supported, nutritious meals provided daily to ensure every child is nourished and energized to learn. This programme is vital for children's physical development and concentration.",
    },
    options: [
      { label: { hi: "🤝 अभिभावक सहभागिता", en: "🤝 Parent Partnership" }, next: "ADM_PARENTS" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  // ── TIMINGS ──────────────────────────────────────────────
  TIMINGS: {
    text: {
      hi: "🕐 स्कूल का समय\n\n📅 सोमवार से शनिवार\n⏰ सुबह 8 बजे से दोपहर 2 बजे तक\n\n🏫 स्कूल कार्यालय का समय:\nसोम–शनि, सुबह 8 बजे से दोपहर 2 बजे तक\n\n📞 किसी भी प्रश्न के लिए: 9454826921\n\nरविवार और सरकारी छुट्टियों पर स्कूल बंद रहता है।",
      en: "🕐 School Timings\n\n📅 Monday to Saturday\n⏰ 8:00 AM to 2:00 PM\n\n🏫 School Office Hours:\nMon–Sat, 8:00 AM – 2:00 PM\n\n📞 For any queries: 9454826921\n\nSchool is closed on Sundays and government holidays.",
    },
    options: [
      { label: { hi: "⏰ दैनिक दिनचर्या", en: "⏰ Daily Routine" }, next: "DAILY_ROUTINE" },
      { label: { hi: "📞 संपर्क करें", en: "📞 Contact Us" }, next: "CONTACT" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  // ── SOCIALS ──────────────────────────────────────────────
  SOCIALS: {
    text: {
      hi: "🌐 हमें सोशल मीडिया पर फॉलो करें\n\n📸 Instagram: @mpsbharsare\nhttps://www.instagram.com/mpsbharsare\n\n👍 Facebook: Model Primary School\nhttps://www.facebook.com/profile.php?id=61564437598896\n\n▶️ YouTube: @vandanayadav7071\nhttps://www.youtube.com/@vandanayadav7071\n\n💬 WhatsApp: +91 9454826921\nhttps://wa.me/919454826921\n\nहमसे जुड़ें और स्कूल के नवीनतम अपडेट पाएं!",
      en: "🌐 Follow Us on Social Media\n\n📸 Instagram: @mpsbharsare\nhttps://www.instagram.com/mpsbharsare\n\n👍 Facebook: Model Primary School\nhttps://www.facebook.com/profile.php?id=61564437598896\n\n▶️ YouTube: @vandanayadav7071\nhttps://www.youtube.com/@vandanayadav7071\n\n💬 WhatsApp: +91 9454826921\nhttps://wa.me/919454826921\n\nFollow us for school updates and activities!",
    },
    options: [
      { label: { hi: "📞 संपर्क करें", en: "📞 Contact Us" }, next: "CONTACT" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  // ── CONTACT (terminal, always available) ─────────────────
  CONTACT: CONTACT_NODE,
};

// ── GREETING ─────────────────────────────────────────────────
export const GREETING = {
  hi: "🙏 नमस्ते! मैं EVI हूँ — मॉडल प्राइमरी स्कूल, भरसरे की डिजिटल सहायक। नीचे दिए गए बटनों से मुझसे कुछ भी पूछें!",
  en: "🙏 Hello! I'm EVI — the digital assistant of Model Primary School, Bharsare. Tap any button below to get started!",
};
