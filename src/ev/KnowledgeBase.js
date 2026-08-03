// ============================================================
//  EV Knowledge Base - Model Primary School
//  Full Menu-Driven, Bilingual (Hindi/English) Flow Tree
//
//  Each node.text[lang] is now: { display: string, speak: string }
//    display → safe HTML rendered in the chat bubble
//    speak   → clean plain text passed to speakEV() TTS engine
// ============================================================

// ── LINK STYLES (inline, Tailwind-purge-safe) ────────────────
const S = {
  phone:  "color:#1d4ed8;font-weight:700;text-decoration:underline;",
  wa:     "color:#16a34a;font-weight:700;text-decoration:underline;",
  email:  "color:#1d4ed8;text-decoration:underline;",
  ig:     "color:#db2777;text-decoration:underline;",
  fb:     "color:#1e40af;text-decoration:underline;",
  yt:     "color:#dc2626;text-decoration:underline;",
};

// ── SHARED CONTACT NODE ─────────────────────────────────────
export const CONTACT_NODE = {
  text: {
    hi: {
      display: `<b>📞 हमसे संपर्क करें</b><br/><br/>
📱 <b>फ़ोन:</b> <a href="tel:+919454826921" style="${S.phone}">9454826921</a><br/>
💬 <b>WhatsApp:</b> <a href="https://wa.me/919454826921" target="_blank" rel="noopener" style="${S.wa}">WhatsApp पर लिखें</a><br/>
📧 <b>ईमेल:</b> <a href="mailto:psbharsare@gmail.com" style="${S.email}">psbharsare@gmail.com</a><br/>
📍 <b>पता:</b> भरसारे, भदैयाँ, सुल्तानपुर, उत्तर प्रदेश<br/>
⏰ <b>समय:</b> सोम-शनि, सुबह 8 बजे से दोपहर 2 बजे<br/><br/>
🌐 <b>सोशल मीडिया:</b><br/>
📸 <a href="https://instagram.com/mpsbharsare" target="_blank" rel="noopener" style="${S.ig}">Instagram: @mpsbharsare</a><br/>
👍 <a href="https://www.facebook.com/profile.php?id=61564437598896" target="_blank" rel="noopener" style="${S.fb}">Facebook: Model Primary School</a><br/>
▶️ <a href="https://youtube.com/@vandanayadav7071" target="_blank" rel="noopener" style="${S.yt}">YouTube: @vandanayadav7071</a>`,
      speak: "हमसे संपर्क करने की सारी जानकारी आपकी स्क्रीन पर है। आप दिए गए लिंक पर क्लिक करके हमें सीधे कॉल, व्हाट्सएप या ईमेल कर सकते हैं। हमारा फ़ोन नंबर 9454826921 है। हमारे सोशल मीडिया पेज से भी ज़रूर जुड़ें।",
    },
    en: {
      display: `<b>📞 Contact Us</b><br/><br/>
📱 <b>Phone:</b> <a href="tel:+919454826921" style="${S.phone}">9454826921</a><br/>
💬 <b>WhatsApp:</b> <a href="https://wa.me/919454826921" target="_blank" rel="noopener" style="${S.wa}">Message on WhatsApp</a><br/>
📧 <b>Email:</b> <a href="mailto:psbharsare@gmail.com" style="${S.email}">psbharsare@gmail.com</a><br/>
📍 <b>Address:</b> Bharsare, Bhadaiyan, Sultanpur, Uttar Pradesh<br/>
⏰ <b>Hours:</b> Mon-Sat, 8 AM to 2 PM<br/><br/>
🌐 <b>Social Media:</b><br/>
📸 <a href="https://instagram.com/mpsbharsare" target="_blank" rel="noopener" style="${S.ig}">Instagram: @mpsbharsare</a><br/>
👍 <a href="https://www.facebook.com/profile.php?id=61564437598896" target="_blank" rel="noopener" style="${S.fb}">Facebook: Model Primary School</a><br/>
▶️ <a href="https://youtube.com/@vandanayadav7071" target="_blank" rel="noopener" style="${S.yt}">YouTube: @vandanayadav7071</a>`,
      speak: "All our contact details are on your screen. Click the links to call, WhatsApp, or email us directly. Our phone number is 9454826921. Don't forget to connect with us on social media!",
    },
  },
  options: [
    { label: { hi: "🏠 मुख्य मेनू पर वापस", en: "🏠 Back to Main Menu" }, next: "ROOT" },
  ],
};

// ── FLOW DATA TREE ───────────────────────────────────────────
export const flowData = {

  ROOT: {
    text: {
      hi: {
        display: "🏠 <b>मुख्य मेनू</b>: आप क्या जानना चाहते हैं?",
        speak: "मुख्य मेनू। आप किस विषय के बारे में जानना चाहते हैं?",
      },
      en: {
        display: "🏠 <b>Main Menu</b>: What would you like to know?",
        speak: "Main Menu. What would you like to know about?",
      },
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
      hi: {
        display: `<b>🏫 मॉडल प्राइमरी स्कूल के बारे में</b><br/><br/>
1988 में स्थापित, यह विद्यालय भरसारे, भदैयाँ, सुल्तानपुर में एक सरकार मान्यता प्राप्त अंग्रेज़ी माध्यम स्कूल है। LKG से कक्षा 5 तक शिक्षा प्रदान करते हुए, हम 350 से अधिक बच्चों की नींव सँवारते हैं।<br/><br/>
आप क्या जानना चाहते हैं?`,
        speak: "मॉडल प्राइमरी स्कूल 1988 में भरसारे, सुल्तानपुर में स्थापित हुआ। यह एल.के.जी. से कक्षा 5 तक अंग्रेज़ी माध्यम में शिक्षा देने वाला सरकार मान्यता प्राप्त विद्यालय है, जहाँ 350 से अधिक बच्चे पढ़ते हैं।",
      },
      en: {
        display: `<b>🏫 About Model Primary School</b><br/><br/>
Founded in 1988, we are a government-recognised English medium school in Bharsare, Bhadaiyan, Sultanpur. Offering classes from LKG to Class 5, we have been shaping the foundations of 350+ children for over 38 years.<br/><br/>
What would you like to know?`,
        speak: "Model Primary School was founded in 1988 in Bharsare, Sultanpur. It is a government-recognised English medium school for LKG to Class 5, with over 350 students and 38 years of excellence.",
      },
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
      hi: {
        display: `<b>📜 हमारी कहानी</b><br/><br/>
मॉडल प्राइमरी स्कूल की स्थापना 1988 में हुई - भरसारे और भदैयाँ के बच्चों को घर के पास गुणवत्तापूर्ण अंग्रेज़ी-माध्यम शिक्षा देने के उद्देश्य से।<br/><br/>
आज यह सुल्तानपुर जिले का सबसे भरोसेमंद प्राथमिक विद्यालय है - 350 से अधिक परिवारों के विश्वास का केंद्र।`,
        speak: "मॉडल प्राइमरी स्कूल की शुरुआत 1988 में हुई, भरसारे और भदैयाँ के बच्चों को घर के पास गुणवत्तापूर्ण शिक्षा देने के लिए। आज यह सुल्तानपुर जिले का सबसे भरोसेमंद प्राथमिक विद्यालय है।",
      },
      en: {
        display: `<b>📜 Our Story</b><br/><br/>
Model Primary School was founded in 1988 with a simple purpose - to give children of Bharsare and Bhadaiyan access to quality English-medium education close to home.<br/><br/>
From a small neighbourhood school, we have grown into the most trusted primary school in Sultanpur district, trusted by 350+ families.`,
        speak: "Model Primary School was founded in 1988 to give children of Bharsare and Bhadaiyan quality English-medium education close to home. Today we are the most trusted primary school in Sultanpur district.",
      },
    },
    options: [
      { label: { hi: "🏆 हमारे पुरस्कार देखें", en: "🏆 See Our Awards" }, next: "AWARDS" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
      { label: { hi: "📞 संपर्क करें", en: "📞 Contact Us" }, next: "CONTACT" },
    ],
  },

  AWARDS: {
    text: {
      hi: {
        display: `<b>🏆 पुरस्कार एवं सम्मान</b><br/><br/>
हमारी प्रधानाचार्य <b>श्रीमती वंदना यादव</b> जी को:<br/><br/>
🥇 राज्य शिक्षक पुरस्कार - उत्तर प्रदेश सरकार<br/>
👑 राज्यपाल उत्कृष्टता सम्मान - माननीय राज्यपाल (UP)<br/>
🎖️ राष्ट्रीय सम्मान - सांसद श्रीमती मेनका गांधी<br/>
⭐ DM C. Indumati, DM Ravish Gupta, DM Kritika Jyotsna द्वारा सम्मानित<br/>
⭐ नारी सशक्तिकरण पुरस्कार<br/>
⭐ Amar Ujala द्वारा मान्यता प्राप्त<br/><br/>
शिक्षिका <b>दीक्षा श्रीवास्तव</b> को राज्य ICT पुरस्कार से सम्मानित किया गया है।`,
        speak: "हमारी प्रधानाचार्य श्रीमती वंदना यादव को राज्य शिक्षक पुरस्कार, राज्यपाल उत्कृष्टता सम्मान और सांसद मेनका गांधी द्वारा राष्ट्रीय सम्मान मिल चुका है। शिक्षिका दीक्षा श्रीवास्तव राज्य आई.सी.टी. पुरस्कार विजेता हैं।",
      },
      en: {
        display: `<b>🏆 Awards & Recognition</b><br/><br/>
Our Principal <b>Smt. Vandana Yadav</b> has received:<br/><br/>
🥇 State Teacher Award - UP Government<br/>
👑 Governor's Excellence Award - Governor of Uttar Pradesh<br/>
🎖️ National Recognition - MP Smt. Maneka Gandhi<br/>
⭐ Honoured by DM C. Indumati, DM Ravish Gupta, DM Kritika Jyotsna<br/>
⭐ Nari Sashaktikaran Award<br/>
⭐ Recognised by Team Amar Ujala<br/><br/>
Teacher <b>Diksha Shrivastav</b> is a State ICT Award winner.`,
        speak: "Our Principal Smt. Vandana Yadav has received the State Teacher Award, the Governor's Excellence Award, and national recognition from MP Maneka Gandhi. Teacher Diksha Shrivastav is a State ICT Award winner.",
      },
    },
    options: [
      { label: { hi: "👩‍🏫 शिक्षकों के बारे में जानें", en: "👩‍🏫 Meet Our Faculty" }, next: "FACULTY" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
      { label: { hi: "📞 संपर्क करें", en: "📞 Contact Us" }, next: "CONTACT" },
    ],
  },

  VISION: {
    text: {
      hi: {
        display: `<b>🎯 दृष्टि और मिशन</b><br/><br/>
🌟 <b>हमारी दृष्टि:</b><br/>
सुल्तानपुर का सबसे भरोसेमंद प्राथमिक विद्यालय बनना, जहाँ भरसारे और आसपास के गाँवों के हर बच्चे को उच्च गुणवत्ता वाली अंग्रेज़ी शिक्षा मिले।<br/><br/>
💪 <b>हमारा मिशन:</b><br/>
आनंदमयी, गतिविधि-आधारित शिक्षा के माध्यम से हर बच्चे की क्षमता निखारना - एक सुरक्षित, अनुशासित और प्रेमपूर्ण वातावरण में।`,
        speak: "हमारी दृष्टि है कि सुल्तानपुर का हर बच्चा गुणवत्तापूर्ण अंग्रेज़ी शिक्षा पाए। हमारा मिशन है आनंदमयी और गतिविधि आधारित शिक्षा के माध्यम से हर बच्चे की क्षमता निखारना।",
      },
      en: {
        display: `<b>🎯 Vision & Mission</b><br/><br/>
🌟 <b>Our Vision:</b><br/>
To be the most trusted primary school in Sultanpur - where every child from Bharsare and surrounding villages can access quality English-medium education.<br/><br/>
💪 <b>Our Mission:</b><br/>
To nurture every child's potential through joyful, activity-based learning in a safe, disciplined and loving environment.`,
        speak: "Our vision is to be the most trusted primary school in Sultanpur. Our mission is to nurture every child's potential through joyful, activity-based learning in a safe and loving environment.",
      },
    },
    options: [
      { label: { hi: "📚 पाठ्यक्रम देखें", en: "📚 See Our Curriculum" }, next: "CLASSES" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  STATS: {
    text: {
      hi: {
        display: `<b>📊 मॉडल स्कूल एक नज़र में</b><br/><br/>
📅 <b>स्थापना:</b> 1988 (38+ वर्ष)<br/>
👦 <b>खुशहाल विद्यार्थी:</b> 350+<br/>
👨‍🏫 <b>समर्पित शिक्षक:</b> 4<br/>
📚 <b>कक्षाएं:</b> 7 स्तर (LKG से कक्षा 5)<br/>
🏛️ <b>मान्यता:</b> सरकार मान्यता प्राप्त (UP सरकार)<br/>
🌐 <b>माध्यम:</b> अंग्रेज़ी माध्यम<br/>
📍 <b>स्थान:</b> भरसारे, भदैयाँ, सुल्तानपुर`,
        speak: "मॉडल प्राइमरी स्कूल 1988 में स्थापित हुआ। यहाँ 350 से अधिक खुशहाल विद्यार्थी, 4 समर्पित शिक्षक और एल.के.जी. से कक्षा 5 तक की शिक्षा व्यवस्था है।",
      },
      en: {
        display: `<b>📊 Model School at a Glance</b><br/><br/>
📅 <b>Established:</b> 1988 (38+ Years)<br/>
👦 <b>Happy Students:</b> 350+<br/>
👨‍🏫 <b>Dedicated Teachers:</b> 4<br/>
📚 <b>Grade Levels:</b> 7 (LKG to Class 5)<br/>
🏛️ <b>Recognition:</b> Government Recognised (UP Govt.)<br/>
🌐 <b>Medium:</b> English Medium<br/>
📍 <b>Location:</b> Bharsare, Bhadaiyan, Sultanpur`,
        speak: "Model Primary School was established in 1988. We have over 350 happy students, 4 dedicated teachers, and offer 7 grade levels from LKG to Class 5.",
      },
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
      hi: {
        display: "<b>📚 प्रवेश 2026-27 - अभी खुले हैं!</b><br/><br/>सीमित सीटें उपलब्ध हैं। आप क्या जानना चाहते हैं?",
        speak: "प्रवेश 2026-27 के लिए अभी खुले हैं। सीमित सीटें हैं, जल्दी करें। आप क्या जानना चाहते हैं?",
      },
      en: {
        display: "<b>📚 Admissions 2026-27 - Now Open!</b><br/><br/>Limited seats available. What would you like to know?",
        speak: "Admissions for 2026-27 are now open with limited seats available. What would you like to know?",
      },
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
      hi: {
        display: `<b>📋 प्रवेश की 5 सरल प्रक्रिया</b><br/><br/>
1️⃣ <b>स्कूल आएं और जानकारी लें</b><br/>
भरसारे स्कूल कार्यालय आएं या कॉल करें।<br/><br/>
2️⃣ <b>फॉर्म लें</b><br/>
स्कूल रिसेप्शन से प्रवेश फॉर्म प्राप्त करें।<br/><br/>
3️⃣ <b>फॉर्म और दस्तावेज़ जमा करें</b><br/>
भरा हुआ फॉर्म और जरूरी कागज़ात जमा करें।<br/><br/>
4️⃣ <b>मिलिए और मुस्कुराइए</b><br/>
बच्चे और माता-पिता की एक मैत्रीपूर्ण मुलाकात।<br/><br/>
5️⃣ <b>सीट कन्फर्म करें</b><br/>
औपचारिकताएं और फीस भुगतान कर सीट सुनिश्चित करें।`,
        speak: "प्रवेश की पाँच सरल प्रक्रियाएं हैं। पहला, स्कूल आएं या कॉल करें। दूसरा, फॉर्म लें। तीसरा, फॉर्म और दस्तावेज़ जमा करें। चौथा, मुलाकात करें। पाँचवाँ, फीस देकर सीट कन्फर्म करें।",
      },
      en: {
        display: `<b>📋 5 Simple Steps to Enrol</b><br/><br/>
1️⃣ <b>Visit & Enquire</b><br/>
Visit the school office in Bharsare or call us.<br/><br/>
2️⃣ <b>Collect the Form</b><br/>
Collect the admission form from school reception.<br/><br/>
3️⃣ <b>Submit Form & Documents</b><br/>
Fill the form and submit with required documents.<br/><br/>
4️⃣ <b>Meet & Greet</b><br/>
A short, friendly interaction with child and parents.<br/><br/>
5️⃣ <b>Confirm the Seat</b><br/>
Complete formalities and fee payment to confirm.`,
        speak: "There are 5 simple steps to enrol. First, visit or call us. Second, collect the form. Third, submit the form and documents. Fourth, have a friendly meeting. Fifth, pay fees to confirm the seat.",
      },
    },
    options: [
      { label: { hi: "📄 जरूरी दस्तावेज़", en: "📄 Required Documents" }, next: "ADM_DOCS" },
      { label: { hi: "📞 अभी कॉल करें", en: "📞 Call Now" }, next: "CONTACT" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  ADM_DOCS: {
    text: {
      hi: {
        display: `<b>📄 प्रवेश के लिए जरूरी दस्तावेज़</b><br/><br/>
✅ बच्चे का जन्म प्रमाण पत्र (मूल + फोटोकॉपी)<br/>
✅ बच्चे की 4 पासपोर्ट साइज़ फ़ोटो<br/>
✅ बच्चे और माता-पिता का आधार कार्ड<br/>
✅ माता-पिता का पता प्रमाण<br/>
✅ स्थानांतरण प्रमाण पत्र (TC) - यदि लागू हो<br/>
✅ पिछले स्कूल की रिपोर्ट कार्ड, यदि उपलब्ध हो`,
        speak: "प्रवेश के लिए बच्चे का जन्म प्रमाण पत्र, चार पासपोर्ट फ़ोटो, आधार कार्ड, पते का प्रमाण और यदि पहले किसी स्कूल में थे तो ट्रांसफर सर्टिफिकेट की ज़रूरत होगी।",
      },
      en: {
        display: `<b>📄 Required Documents for Admission</b><br/><br/>
✅ Child's birth certificate (original + photocopy)<br/>
✅ 4 recent passport-size photographs of the child<br/>
✅ Aadhar card - child and parent/guardian<br/>
✅ Address proof of parent/guardian<br/>
✅ Transfer Certificate (TC) - if applicable<br/>
✅ Previous school report card, if available`,
        speak: "For admission you will need the child's birth certificate, four passport-size photos, Aadhar cards for child and parent, address proof, and a Transfer Certificate if applicable.",
      },
    },
    options: [
      { label: { hi: "🎂 आयु पात्रता देखें", en: "🎂 See Age Eligibility" }, next: "ADM_AGE" },
      { label: { hi: "📞 संपर्क करें", en: "📞 Contact School" }, next: "CONTACT" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  ADM_AGE: {
    text: {
      hi: {
        display: `<b>🎂 आयु पात्रता (प्रवेश के समय)</b><br/><br/>
🌱 <b>LKG</b> - 3+ वर्ष<br/>
🌿 <b>UKG</b> - 4+ वर्ष<br/>
📖 <b>कक्षा 1</b> - 5+ वर्ष<br/>
📗 <b>कक्षा 2</b> - 6+ वर्ष<br/>
📘 <b>कक्षा 3</b> - 7+ वर्ष<br/>
📙 <b>कक्षा 4</b> - 8+ वर्ष<br/>
📕 <b>कक्षा 5</b> - 9+ वर्ष`,
        speak: "एल.के.जी. के लिए 3 वर्ष, यू.के.जी. के लिए 4 वर्ष, कक्षा 1 के लिए 5 वर्ष, और आगे की कक्षाओं के लिए एक-एक वर्ष अधिक।",
      },
      en: {
        display: `<b>🎂 Age Eligibility (as of intake date)</b><br/><br/>
🌱 <b>LKG</b> - 3+ years<br/>
🌿 <b>UKG</b> - 4+ years<br/>
📖 <b>Class 1</b> - 5+ years<br/>
📗 <b>Class 2</b> - 6+ years<br/>
📘 <b>Class 3</b> - 7+ years<br/>
📙 <b>Class 4</b> - 8+ years<br/>
📕 <b>Class 5</b> - 9+ years`,
        speak: "LKG requires age 3 or above, UKG requires 4 or above, Class 1 requires 5 or above, and one additional year for each higher class.",
      },
    },
    options: [
      { label: { hi: "📋 प्रवेश प्रक्रिया देखें", en: "📋 See Admission Process" }, next: "ADM_PROCESS" },
      { label: { hi: "📞 अभी संपर्क करें", en: "📞 Contact Now" }, next: "CONTACT" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  ADM_FEES: {
    text: {
      hi: {
        display: `<b>💰 फीस की जानकारी</b><br/><br/>
फीस और दाखिले की विस्तृत जानकारी के लिए कृपया सीधे स्कूल से संपर्क करें:<br/><br/>
📱 <a href="tel:+919454826921" style="${S.phone}">9454826921</a><br/>
💬 <a href="https://wa.me/919454826921" target="_blank" rel="noopener" style="${S.wa}">WhatsApp पर लिखें</a><br/>
📧 <a href="mailto:psbharsare@gmail.com" style="${S.email}">psbharsare@gmail.com</a>`,
        speak: "फीस की जानकारी के लिए कृपया स्कूल से सीधे संपर्क करें। फ़ोन नंबर 9454826921 पर कॉल करें।",
      },
      en: {
        display: `<b>💰 Fee Information</b><br/><br/>
For detailed fee and admission information, please contact the school directly:<br/><br/>
📱 <a href="tel:+919454826921" style="${S.phone}">9454826921</a><br/>
💬 <a href="https://wa.me/919454826921" target="_blank" rel="noopener" style="${S.wa}">Message on WhatsApp</a><br/>
📧 <a href="mailto:psbharsare@gmail.com" style="${S.email}">psbharsare@gmail.com</a>`,
        speak: "For fee information, please contact the school directly. Call us on 9454826921.",
      },
    },
    options: [
      { label: { hi: "📞 अभी कॉल करें", en: "📞 Call Now" }, next: "CONTACT" },
      { label: { hi: "📋 प्रवेश प्रक्रिया", en: "📋 Admission Process" }, next: "ADM_PROCESS" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  ADM_PARENTS: {
    text: {
      hi: {
        display: `<b>🤝 अभिभावक सहभागिता</b><br/><br/>
👨‍👩‍👧 <b>PTM (Parent-Teacher Meeting):</b><br/>
नियमित बैठकें जहाँ आपके बच्चे की प्रगति पर चर्चा होती है।<br/><br/>
👩‍👧 <b>MTA (Mother-Teacher Association):</b><br/>
माँ और शिक्षक मिलकर बच्चे के विकास की योजना बनाते हैं।<br/><br/>
🍱 <b>Mid-Day Meal (MDM):</b><br/>
सरकार द्वारा समर्थित पौष्टिक भोजन - हर दिन।`,
        speak: "हम नियमित पैरेंट-टीचर मीटिंग और मदर-टीचर असोसिएशन के माध्यम से अभिभावकों को जोड़ते हैं। मध्याह्न भोजन कार्यक्रम में प्रतिदिन पौष्टिक भोजन दिया जाता है।",
      },
      en: {
        display: `<b>🤝 Parent Partnership</b><br/><br/>
👨‍👩‍👧 <b>PTM (Parent-Teacher Meeting):</b><br/>
Regular meetings where your child's progress is discussed.<br/><br/>
👩‍👧 <b>MTA (Mother-Teacher Association):</b><br/>
Mothers and teachers working together for each child's development.<br/><br/>
🍱 <b>Mid-Day Meal (MDM):</b><br/>
Government-supported nutritious meals provided daily.`,
        speak: "We hold regular Parent-Teacher Meetings and a Mother-Teacher Association to keep parents involved. A nutritious Mid-Day Meal is provided to every child daily.",
      },
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
      hi: {
        display: "<b>🎓 कक्षाएं और पाठ्यक्रम</b><br/><br/>हम LKG से कक्षा 5 तक अंग्रेज़ी माध्यम में शिक्षा प्रदान करते हैं। आप किस बारे में जानना चाहते हैं?",
        speak: "हम एल.के.जी. से कक्षा 5 तक अंग्रेज़ी माध्यम में शिक्षा देते हैं।",
      },
      en: {
        display: "<b>🎓 Classes & Curriculum</b><br/><br/>We offer classes from LKG to Class 5 in English medium. What would you like to know?",
        speak: "We offer classes from LKG to Class 5 in English medium. What would you like to know?",
      },
    },
    options: [
      { label: { hi: "🌱 LKG-UKG (3-5 वर्ष)", en: "🌱 LKG-UKG (Ages 3-5)" }, next: "CLASS_PREPRIMARY" },
      { label: { hi: "📖 कक्षा 1-2 (6-7 वर्ष)", en: "📖 Class 1-2 (Ages 6-7)" }, next: "CLASS_PRIMARY1" },
      { label: { hi: "📚 कक्षा 3-5 (8-10 वर्ष)", en: "📚 Class 3-5 (Ages 8-10)" }, next: "CLASS_PRIMARY2" },
      { label: { hi: "⏰ दैनिक दिनचर्या", en: "⏰ Daily Routine" }, next: "DAILY_ROUTINE" },
      { label: { hi: "🎨 पाठ्येतर गतिविधियाँ", en: "🎨 Co-Curricular Activities" }, next: "EXTRACURRICULAR" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  CLASS_PREPRIMARY: {
    text: {
      hi: {
        display: `<b>🌱 LKG - UKG (आयु 3-5 वर्ष)</b><br/><br/>
चरण 01: प्री-प्राइमरी<br/><br/>
<b>विषय:</b><br/>
• कविताएँ और कहानियाँ<br/>
• फ़ोनिक्स और उच्चारण<br/>
• प्रारंभिक लेखन अभ्यास<br/>
• अंकों का ज्ञान<br/>
• कला और शिल्प<br/>
• खेल और मुक्त खेलकूद<br/><br/>
100% गतिविधि और कहानियों पर आधारित शुरुआत।`,
        speak: "एल.के.जी. और यू.के.जी. में खेल, फ़ोनिक्स, कविताएँ, कला और प्रारंभिक लेखन सिखाया जाता है। यह पूरी तरह गतिविधि-आधारित शुरुआत है।",
      },
      en: {
        display: `<b>🌱 LKG - UKG (Ages 3-5 Years)</b><br/><br/>
Stage 01: Pre-Primary<br/><br/>
<b>Subjects:</b><br/>
• Rhymes & Stories<br/>
• Phonics & Speech<br/>
• Pre-Writing Skills<br/>
• Number Sense<br/>
• Art & Craft<br/>
• Free Play & Games<br/><br/>
100% Activity & Story-Based Foundation.`,
        speak: "LKG and UKG focus on play, phonics, rhymes, art and pre-writing skills. It is a fully activity and story-based foundation.",
      },
    },
    options: [
      { label: { hi: "📖 कक्षा 1-2 देखें", en: "📖 See Class 1-2" }, next: "CLASS_PRIMARY1" },
      { label: { hi: "📚 प्रवेश जानकारी", en: "📚 Admission Info" }, next: "ADMISSIONS" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  CLASS_PRIMARY1: {
    text: {
      hi: {
        display: `<b>📖 कक्षा 1 - 2 (आयु 6-7 वर्ष)</b><br/><br/>
चरण 02: प्राइमरी I<br/><br/>
<b>विषय:</b><br/>
• अंग्रेज़ी साहित्य<br/>
• हिंदी भाषा<br/>
• गणित<br/>
• पर्यावरण अध्ययन (EVS)<br/>
• सामान्य ज्ञान (GK)<br/>
• कला और शारीरिक शिक्षा`,
        speak: "कक्षा 1 और 2 में अंग्रेज़ी साहित्य, हिंदी, गणित, पर्यावरण अध्ययन, सामान्य ज्ञान और शारीरिक शिक्षा पढ़ाई जाती है।",
      },
      en: {
        display: `<b>📖 Class 1 - 2 (Ages 6-7 Years)</b><br/><br/>
Stage 02: Primary I<br/><br/>
<b>Subjects:</b><br/>
• English Literature<br/>
• Hindi Language<br/>
• Mathematics<br/>
• Environmental Studies (EVS)<br/>
• General Knowledge (GK)<br/>
• Art & Physical Education`,
        speak: "Class 1 and 2 cover English Literature, Hindi, Mathematics, Environmental Studies, General Knowledge and Physical Education.",
      },
    },
    options: [
      { label: { hi: "📚 कक्षा 3-5 देखें", en: "📚 See Class 3-5" }, next: "CLASS_PRIMARY2" },
      { label: { hi: "📚 प्रवेश जानकारी", en: "📚 Admission Info" }, next: "ADMISSIONS" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  CLASS_PRIMARY2: {
    text: {
      hi: {
        display: `<b>📚 कक्षा 3 - 5 (आयु 8-10 वर्ष)</b><br/><br/>
चरण 03: प्राइमरी II<br/><br/>
<b>विषय:</b><br/>
• अंग्रेज़ी व्याकरण<br/>
• हिंदी साहित्य<br/>
• उन्नत गणित<br/>
• EVS / विज्ञान<br/>
• कंप्यूटर बेसिक्स<br/>
• GK, कला और खेलकूद`,
        speak: "कक्षा 3 से 5 में अंग्रेज़ी व्याकरण, हिंदी साहित्य, उन्नत गणित, विज्ञान और कंप्यूटर बेसिक्स सिखाए जाते हैं।",
      },
      en: {
        display: `<b>📚 Class 3 - 5 (Ages 8-10 Years)</b><br/><br/>
Stage 03: Primary II<br/><br/>
<b>Subjects:</b><br/>
• English Grammar<br/>
• Hindi Literature<br/>
• Advanced Mathematics<br/>
• EVS / Science<br/>
• Computer Basics<br/>
• GK, Art & Sports`,
        speak: "Class 3 to 5 covers English Grammar, Hindi Literature, Advanced Mathematics, Science, Computer Basics, and Sports.",
      },
    },
    options: [
      { label: { hi: "💻 स्मार्ट क्लास और सुविधाएं", en: "💻 Smart Class & Facilities" }, next: "FACILITIES" },
      { label: { hi: "📚 प्रवेश जानकारी", en: "📚 Admission Info" }, next: "ADMISSIONS" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  DAILY_ROUTINE: {
    text: {
      hi: {
        display: `<b>⏰ स्कूल की दैनिक दिनचर्या</b><br/><br/>
सुबह 8 बजे - प्रातः कालीन प्रार्थना सभा<br/>
सुबह 8 बज कर 20 मिनट - पहली शिक्षण अवधि<br/>
सुबह 9 बज कर 50 मिनट - लघु अवकाश<br/>
सुबह 10 बजे - मुख्य विषयों की कक्षाएं<br/>
दोपहर 12 बजे - भोजन और मैदान खेल<br/>
दोपहर 12 बज कर 40 मिनट - गतिविधि / सह-पाठ्यक्रम<br/>
दोपहर 1 बज कर 30 मिनट - समापन प्रार्थना और विसर्जन<br/><br/>
<i>(यह एक नमूना कार्यक्रम है, वास्तविक समय कक्षा के अनुसार भिन्न हो सकता है।)</i>`,
        speak: "स्कूल सुबह 8 बजे प्रार्थना सभा से शुरू होता है। फिर पढ़ाई, दोपहर को भोजन और खेल, गतिविधि अवधि और दोपहर डेढ़ बजे छुट्टी होती है।",
      },
      en: {
        display: `<b>⏰ Daily School Routine</b><br/><br/>
8:00 AM - Morning Assembly & Prayer<br/>
8:20 AM - First Teaching Period<br/>
9:50 AM - Short Break<br/>
10:00 AM - Core Subject Periods<br/>
12:00 PM - Lunch & Outdoor Play<br/>
12:40 PM - Activity / Co-Curricular Period<br/>
1:30 PM - Closing Assembly & Dismissal<br/><br/>
<i>(Sample schedule - actual timings may vary by class.)</i>`,
        speak: "School starts with morning assembly at 8 AM, followed by teaching periods, a short break, core subjects, lunch and outdoor play at noon, activity time, and dismissal at 1:30 PM.",
      },
    },
    options: [
      { label: { hi: "🎨 पाठ्येतर गतिविधियाँ", en: "🎨 Co-Curricular Activities" }, next: "EXTRACURRICULAR" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  EXTRACURRICULAR: {
    text: {
      hi: {
        display: `<b>🎨 पाठ्येतर गतिविधियाँ</b><br/><br/>
🖌️ <b>कला और शिल्प:</b> चित्रकारी, रंगाई और हस्त-कला।<br/><br/>
💃 <b>नृत्य और सांस्कृतिक कार्यक्रम:</b> मंच प्रदर्शन से आत्मविश्वास और अभिव्यक्ति का विकास।<br/><br/>
⚽ <b>खेलकूद और शारीरिक शिक्षा:</b> दैनिक खेल, मैदान और झूले।<br/><br/>
🚌 <b>शैक्षिक भ्रमण:</b> ऐतिहासिक स्थलों की यात्राएं और सामुदायिक जागरूकता रैलियां।`,
        speak: "हमारे यहाँ कला, नृत्य और सांस्कृतिक कार्यक्रम, खेलकूद और शैक्षिक भ्रमण की सुविधा है।",
      },
      en: {
        display: `<b>🎨 Co-Curricular Activities</b><br/><br/>
🖌️ <b>Art & Craft:</b> Drawing, painting and handcrafting.<br/><br/>
💃 <b>Dance & Cultural Arts:</b> Vibrant performances building confidence and stage expression.<br/><br/>
⚽ <b>Sports & Physical Education:</b> Daily games, outdoor swing areas.<br/><br/>
🚌 <b>Educational Tours:</b> Field trips to cultural sites and community awareness rallies.`,
        speak: "We offer Art and Craft, Dance and Cultural performances, daily Sports, and Educational Tours to historical sites.",
      },
    },
    options: [
      { label: { hi: "🏛️ सुविधाएं देखें", en: "🏛️ See Facilities" }, next: "FACILITIES" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  // ── FACULTY ──────────────────────────────────────────────
  FACULTY: {
    text: {
      hi: {
        display: "<b>👨‍🏫 प्रिंसिपल और शिक्षक दल</b><br/><br/>हमारे स्कूल में बहुत ही अनुभवी स्टाफ है। आप किनके बारे में जानना चाहते हैं?",
        speak: "हमारे स्कूल में बहुत ही अनुभवी स्टाफ है। प्रिंसिपल श्रीमती वंदना यादव जी के नेतृत्व में दीक्षा श्रीवास्तव, सुनील सिंह, जानकी देवी, प्रदीप कुमार असिस्टेंट टीचर और डॉ. अशोक कुमार वर्मा (डिज़ाइनर एवं कोऑर्डिनेटर) शामिल हैं।",
      },
      en: {
        display: "<b>👨‍🏫 Principal &amp; Faculty Team</b><br/><br/>We have a highly experienced staff. Who would you like to know about?",
        speak: "We have a highly experienced staff led by Principal Smt. Vandana Yadav. Our faculty includes Diksha Shrivastav, Sunil Singh, Janki Devi, Pradeep Kumar Assistant Teacher, and Dr. Ashok Kumar Verma as our Designer and Coordinator.",
      },
    },
    options: [
      { label: { hi: "👩‍💼 प्रिंसिपल - श्रीमती वंदना यादव", en: "👩‍💼 Principal - Smt. Vandana Yadav" }, next: "PRINCIPAL" },
      { label: { hi: "👩‍🏫 दीक्षा श्रीवास्तव (ICT Award)", en: "👩‍🏫 Diksha Shrivastav (ICT Award)" }, next: "TEACHER_DIKSHA" },
      { label: { hi: "👨‍🏫 सुनील सिंह", en: "👨‍🏫 Sunil Singh" }, next: "TEACHER_SUNIL" },
      { label: { hi: "👩‍🏫 जानकी देवी", en: "👩‍🏫 Janki Devi" }, next: "TEACHER_JANKI" },
      { label: { hi: "👨‍🏫 प्रदीप कुमार", en: "👨‍🏫 Pradeep Kumar" }, next: "TEACHER_PRADEEP" },
      { label: { hi: "🎨 डॉ. अशोक कुमार वर्मा - डिज़ाइनर", en: "🎨 Dr. Ashok Kumar Verma - Designer" }, next: "TEACHER_DESIGNER" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  PRINCIPAL: {
    text: {
      hi: {
        display: `<b>👩‍💼 श्रीमती वंदना यादव - वर्तमान प्रधानाचार्य</b><br/><br/>
मॉडल प्राइमरी स्कूल (स्थापना 1988) की वर्तमान प्रधानाचार्य। उनके उत्कृष्ट मार्गदर्शन में स्कूल सुल्तानपुर के सबसे भरोसेमंद विद्यालयों में से एक बन चुका है।<br/><br/>
<b>🏆 प्रमुख पुरस्कार:</b><br/>
🥇 राज्य शिक्षक पुरस्कार - UP सरकार<br/>
👑 राज्यपाल उत्कृष्टता सम्मान<br/>
🎖️ राष्ट्रीय सम्मान - सांसद श्रीमती मेनका गांधी<br/>
⭐ नारी सशक्तिकरण पुरस्कार`,
        speak: "श्रीमती वंदना यादव विद्यालय की वर्तमान प्रधानाचार्य हैं। उनके मार्गदर्शन में स्कूल निरंतर प्रगति कर रहा है। उन्हें राज्य शिक्षक पुरस्कार, राज्यपाल उत्कृष्टता सम्मान और सांसद मेनका गांधी द्वारा राष्ट्रीय सम्मान मिल चुका है।",
      },
      en: {
        display: `<b>👩‍💼 Smt. Vandana Yadav - Current Principal</b><br/><br/>
Current Principal of Model Primary School (Est. 1988). Under her visionary leadership, the school has become one of the most trusted institutions in Sultanpur.<br/><br/>
<b>🏆 Key Awards:</b><br/>
🥇 State Teacher Award - UP Government<br/>
👑 Governor's Excellence Award<br/>
🎖️ National Recognition - MP Smt. Maneka Gandhi<br/>
⭐ Nari Sashaktikaran Award`,
        speak: "Smt. Vandana Yadav is the current Principal of Model Primary School. She has received the State Teacher Award, the Governor's Excellence Award, and national recognition from MP Maneka Gandhi.",
      },
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
      hi: {
        display: `<b>👩‍🏫 दीक्षा श्रीवास्तव</b><br/><br/>
🎖️ <b>पद:</b> सहायक अध्यापक<br/>
⭐ <b>सम्मान:</b> राज्य ICT पुरस्कार विजेता<br/><br/>
दीक्षा जी हमारे विद्यालय की तकनीकी शिक्षा की धुरी हैं। उन्हें प्रौद्योगिकी के माध्यम से शिक्षा को बेहतर बनाने के लिए राज्य ICT पुरस्कार से सम्मानित किया गया है।`,
        speak: "दीक्षा श्रीवास्तव जी सहायक शिक्षिका हैं और राज्य आई.सी.टी. पुरस्कार विजेता हैं।",
      },
      en: {
        display: `<b>👩‍🏫 Diksha Shrivastav</b><br/><br/>
🎖️ <b>Role:</b> Assistant Teacher<br/>
⭐ <b>Award:</b> State ICT Award Winner<br/><br/>
Diksha is the cornerstone of tech-integrated education at our school. She has been honoured with the State ICT Award for outstanding technology-enhanced learning.`,
        speak: "Diksha Shrivastav is an Assistant Teacher and a State ICT Award winner for outstanding technology-enhanced learning.",
      },
    },
    options: [
      { label: { hi: "👨‍🏫 सुनील सिंह के बारे में", en: "👨‍🏫 About Sunil Singh" }, next: "TEACHER_SUNIL" },
      { label: { hi: "👩‍🏫 जानकी देवी के बारे में", en: "👩‍🏫 About Janki Devi" }, next: "TEACHER_JANKI" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  TEACHER_SUNIL: {
    text: {
      hi: {
        display: `<b>👨‍🏫 सुनील सिंह</b><br/><br/>
🎖️ <b>पद:</b> सहायक अध्यापक<br/><br/>
सुनील सिंह जी हमारे विद्यालय के अनुभवी और समर्पित शिक्षक हैं। वे बच्चों को विषयों को बेहतर ढंग से समझाने में निपुण हैं।`,
        speak: "सुनील सिंह जी अनुभवी और समर्पित सहायक शिक्षक हैं।",
      },
      en: {
        display: `<b>👨‍🏫 Sunil Singh</b><br/><br/>
🎖️ <b>Role:</b> Assistant Teacher<br/><br/>
Sunil Singh is an experienced and dedicated teacher at our school, skilled at making complex subjects accessible and enjoyable for young learners.`,
        speak: "Sunil Singh is an experienced and dedicated Assistant Teacher, skilled at making subjects enjoyable for young learners.",
      },
    },
    options: [
      { label: { hi: "👩‍🏫 दीक्षा श्रीवास्तव के बारे में", en: "👩‍🏫 About Diksha Shrivastav" }, next: "TEACHER_DIKSHA" },
      { label: { hi: "👩‍🏫 जानकी देवी के बारे में", en: "👩‍🏫 About Janki Devi" }, next: "TEACHER_JANKI" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  TEACHER_JANKI: {
    text: {
      hi: {
        display: `<b>👩‍🏫 जानकी देवी</b><br/><br/>
🎖️ <b>पद:</b> शिक्षा मित्र<br/><br/>
जानकी देवी जी हमारे विद्यालय की शिक्षा मित्र हैं। वे बच्चों के सर्वांगीण विकास और सामुदायिक जुड़ाव में महत्वपूर्ण भूमिका निभाती हैं।`,
        speak: "जानकी देवी जी शिक्षा मित्र हैं और बच्चों के सर्वांगीण विकास में महत्वपूर्ण भूमिका निभाती हैं।",
      },
      en: {
        display: `<b>👩‍🏫 Janki Devi</b><br/><br/>
🎖️ <b>Role:</b> Shiksha Mitra<br/><br/>
Janki Devi serves as a Shiksha Mitra at our school. She plays a vital role in holistic student development and community engagement.`,
        speak: "Janki Devi serves as a Shiksha Mitra and plays a vital role in holistic student development and community engagement.",
      },
    },
    options: [
      { label: { hi: "👩‍🏫 दीक्षा श्रीवास्तव के बारे में", en: "👩‍🏫 About Diksha Shrivastav" }, next: "TEACHER_DIKSHA" },
      { label: { hi: "👨‍🏫 सुनील सिंह के बारे में", en: "👨‍🏫 About Sunil Singh" }, next: "TEACHER_SUNIL" },
      { label: { hi: "👨‍🏫 प्रदीप कुमार के बारे में", en: "👨‍🏫 About Pradeep Kumar" }, next: "TEACHER_PRADEEP" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  TEACHER_PRADEEP: {
    text: {
      hi: {
        display: `<b>👨‍🏫 प्रदीप कुमार</b><br/><br/>
🎖️ <b>पद:</b> सहायक अध्यापक<br/><br/>
प्रदीप कुमार जी हमारे विद्यालय के समर्पित सहायक अध्यापक हैं। वे बच्चों को बेहतर शिक्षा और व्यक्तिगत ध्यान देने के लिए पूरे उत्साह से कार्य करते हैं।`,
        speak: "प्रदीप कुमार जी हमारे विद्यालय के सहायक अध्यापक हैं। वे बच्चों को व्यक्तिगत ध्यान और बेहतरीन शिक्षा देने के लिए समर्पित हैं।",
      },
      en: {
        display: `<b>👨‍🏫 Pradeep Kumar</b><br/><br/>
🎖️ <b>Role:</b> Assistant Teacher<br/><br/>
Pradeep Kumar is a dedicated Assistant Teacher at our school. He works with great enthusiasm to provide quality education and personal attention to every child.`,
        speak: "Pradeep Kumar is a dedicated Assistant Teacher at Model Primary School, committed to providing quality education and personal attention to every child.",
      },
    },
    options: [
      { label: { hi: "🎨 डॉ. अशोक कुमार वर्मा के बारे में", en: "🎨 About Dr. Ashok Kumar Verma" }, next: "TEACHER_DESIGNER" },
      { label: { hi: "👩‍🏫 शिक्षक दल देखें", en: "👩‍🏫 See Full Faculty" }, next: "FACULTY" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  TEACHER_DESIGNER: {
    text: {
      hi: {
        display: `<b>🎨 डॉ. अशोक कुमार वर्मा</b><br/><br/>
🎖️ <b>पद:</b> डिज़ाइनर और कोऑर्डिनेटर<br/><br/>
डॉ. अशोक कुमार वर्मा जी हमारे विद्यालय के डिज़ाइनर और कोऑर्डिनेटर हैं। वे स्कूल की डिजिटल पहचान, सोशल मीडिया और सभी सांस्कृतिक कार्यक्रमों के समन्वय में अहम भूमिका निभाते हैं।`,
        speak: "डॉ. अशोक कुमार वर्मा जी हमारे विद्यालय के डिज़ाइनर और कोऑर्डिनेटर हैं। वे स्कूल की डिजिटल पहचान और सांस्कृतिक कार्यक्रमों के समन्वय में महत्वपूर्ण योगदान देते हैं।",
      },
      en: {
        display: `<b>🎨 Dr. Ashok Kumar Verma</b><br/><br/>
🎖️ <b>Role:</b> Designer &amp; Coordinator<br/><br/>
Dr. Ashok Kumar Verma plays a key role in shaping the school's digital identity, managing social media presence, and coordinating all cultural events and activities.`,
        speak: "Dr. Ashok Kumar Verma is our Designer and Coordinator. He plays a key role in the school's digital identity, social media, and coordinating all cultural events and activities.",
      },
    },
    options: [
      { label: { hi: "👨‍🏫 प्रदीप कुमार के बारे में", en: "👨‍🏫 About Pradeep Kumar" }, next: "TEACHER_PRADEEP" },
      { label: { hi: "👩‍🏫 शिक्षक दल देखें", en: "👩‍🏫 See Full Faculty" }, next: "FACULTY" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  // ── FACILITIES ───────────────────────────────────────────
  FACILITIES: {
    text: {
      hi: {
        display: "<b>🏛️ सुविधाएं और बुनियादी ढाँचा</b><br/><br/>आप किस सुविधा के बारे में जानना चाहते हैं?",
        speak: "हमारे विद्यालय में सीसीटीवी, स्मार्ट क्लास, कंप्यूटर लैब, परिवहन, खेल मैदान, पुस्तकालय और मध्याह्न भोजन की सुविधाएं हैं।",
      },
      en: {
        display: "<b>🏛️ Facilities & Infrastructure</b><br/><br/>Which facility would you like to know about?",
        speak: "We have CCTV security, Smart Class, Computer Lab, Transport, Play Area, Library and a Mid-Day Meal programme.",
      },
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
      hi: {
        display: `<b>📹 CCTV सुरक्षा</b><br/><br/>
🛡️ हमारा पूरा कैंपस CCTV कैमरों की निगरानी में है - माता-पिता को पूर्ण निश्चिंतता।<br/><br/>
🚪 सुरक्षित मुख्य द्वार व आगंतुक सत्यापन<br/>
👮 प्रशिक्षित और सत्यापित सहयोगी स्टाफ<br/>
🏥 प्राथमिक चिकित्सा और आपातकालीन तैयारी`,
        speak: "हमारा पूरा कैंपस सीसीटीवी कैमरों की निगरानी में है। सुरक्षित गेट, प्रशिक्षित स्टाफ और प्राथमिक चिकित्सा की भी व्यवस्था है।",
      },
      en: {
        display: `<b>📹 CCTV Security</b><br/><br/>
🛡️ Our entire campus is under CCTV surveillance - complete peace of mind for parents.<br/><br/>
🚪 Gated entry & visitor verification<br/>
👮 Trained & verified support staff<br/>
🏥 First-aid & emergency readiness`,
        speak: "Our entire campus is under CCTV surveillance. We also have gated entry, trained support staff, and first-aid readiness.",
      },
    },
    options: [
      { label: { hi: "🚌 परिवहन सेवा", en: "🚌 Transport Facility" }, next: "FAC_TRANSPORT" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  FAC_SMART: {
    text: {
      hi: {
        display: `<b>💻 स्मार्ट क्लास और कंप्यूटर लैब</b><br/><br/>
🖥️ <b>स्मार्ट प्रोजेक्टर कक्षाएं:</b><br/>
प्रोजेक्टर-सक्षम इंटरेक्टिव शिक्षा - हर पाठ रोचक और जीवंत।<br/><br/>
💻 <b>कंप्यूटर शिक्षा लैब:</b><br/>
बच्चों को शुरू से ही कंप्यूटर का परिचय देने वाली तकनीकी लैब।<br/><br/>
🧠 <b>GK और विशेष कक्षाएं:</b><br/>
विशेष GK और रेमेडियल सपोर्ट - कोई बच्चा पीछे न रहे।`,
        speak: "हमारे यहाँ प्रोजेक्टर-सक्षम स्मार्ट क्लास और कंप्यूटर शिक्षा लैब उपलब्ध हैं। विशेष जी.के. और रेमेडियल कक्षाएं भी आयोजित होती हैं।",
      },
      en: {
        display: `<b>💻 Smart Class & Computer Lab</b><br/><br/>
🖥️ <b>Smart Projector Classrooms:</b><br/>
Projector-enabled interactive learning that makes every lesson vivid.<br/><br/>
💻 <b>Computer Education Lab:</b><br/>
Dedicated tech-ready labs to introduce students to computers early.<br/><br/>
🧠 <b>GK & Remedial Classes:</b><br/>
Specialised GK enrichment and remedial support so no child is left behind.`,
        speak: "We have Smart Projector Classrooms and a dedicated Computer Education Lab. Specialised GK enrichment and remedial support classes are also available.",
      },
    },
    options: [
      { label: { hi: "📚 पुस्तकालय", en: "📚 Library" }, next: "FAC_LIBRARY" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  FAC_TRANSPORT: {
    text: {
      hi: {
        display: `<b>🚌 परिवहन सेवा</b><br/><br/>
हमारे विद्यालय में छात्रों के लिए सुरक्षित और सुविधाजनक परिवहन सुविधा उपलब्ध है।<br/><br/>
रूट की विस्तृत जानकारी के लिए:<br/>
📱 <a href="tel:+919454826921" style="${S.phone}">9454826921</a>`,
        speak: "हमारे विद्यालय में सुरक्षित परिवहन सुविधा उपलब्ध है। रूट की जानकारी के लिए 9454826921 पर संपर्क करें।",
      },
      en: {
        display: `<b>🚌 Transport Facility</b><br/><br/>
We provide safe and convenient transport facilities for students.<br/><br/>
For detailed route information:<br/>
📱 <a href="tel:+919454826921" style="${S.phone}">9454826921</a>`,
        speak: "We provide safe and convenient transport for students. Contact us on 9454826921 for route details.",
      },
    },
    options: [
      { label: { hi: "📞 संपर्क करें", en: "📞 Contact Us" }, next: "CONTACT" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  FAC_PLAY: {
    text: {
      hi: {
        display: `<b>🌳 खेल का मैदान</b><br/><br/>
हमारे पास एक विशाल, हरा-भरा खेल मैदान है जहाँ बच्चे:<br/><br/>
🤸 दौड़ते और खेलते हैं<br/>
🛝 सुरक्षित झूले का आनंद लेते हैं<br/>
⚽ दैनिक खेलकूद में भाग लेते हैं`,
        speak: "हमारे पास एक विशाल हरा-भरा खेल मैदान है जहाँ बच्चे दौड़ते, खेलते और झूलों का आनंद लेते हैं।",
      },
      en: {
        display: `<b>🌳 Play Area</b><br/><br/>
Our generous, green outdoor play area where children:<br/><br/>
🤸 Run, climb and play freely<br/>
🛝 Enjoy safe outdoor swings<br/>
⚽ Participate in daily sports activities`,
        speak: "Our generous green play area allows children to run, play freely, enjoy outdoor swings, and participate in daily sports activities.",
      },
    },
    options: [
      { label: { hi: "🏛️ अन्य सुविधाएं", en: "🏛️ Other Facilities" }, next: "FACILITIES" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  FAC_WATER: {
    text: {
      hi: {
        display: `<b>💧 पानी और स्वच्छता</b><br/><br/>
✅ 24/7 पानी की व्यवस्था<br/>
✅ कैंपस में RO वॉटर कूलर<br/>
✅ स्वच्छ और आरोग्यप्रद शौचालय<br/><br/>
हमारे बच्चों का स्वास्थ्य और स्वच्छता हमारी सर्वोच्च प्राथमिकता है।`,
        speak: "हमारे यहाँ चौबीस घंटे पानी, आर.ओ. वॉटर कूलर और स्वच्छ शौचालय की व्यवस्था है।",
      },
      en: {
        display: `<b>💧 Water & Sanitation</b><br/><br/>
✅ 24/7 running water supply<br/>
✅ RO water coolers on campus<br/>
✅ Clean & hygienic sanitation facilities<br/><br/>
The health and hygiene of our children is our top priority.`,
        speak: "We have 24/7 running water, RO water coolers on campus, and clean hygienic sanitation facilities.",
      },
    },
    options: [
      { label: { hi: "🏛️ अन्य सुविधाएं", en: "🏛️ Other Facilities" }, next: "FACILITIES" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  FAC_LIBRARY: {
    text: {
      hi: {
        display: `<b>📚 पुस्तकालय</b><br/><br/>
ज्ञान का एक समृद्ध केंद्र - हमारा पुस्तकालय बच्चों में जिज्ञासा और पढ़ने के प्रति प्रेम जगाता है। विविध पुस्तकें और संसाधन हर उम्र और रुचि के लिए उपलब्ध हैं।`,
        speak: "हमारा पुस्तकालय बच्चों में जिज्ञासा और पढ़ने का प्रेम जगाता है।",
      },
      en: {
        display: `<b>📚 Library</b><br/><br/>
A curated knowledge hub - our library sparks curiosity and instills a love of reading from an early age. A wide range of books and resources are available for every age and interest.`,
        speak: "Our curated library sparks curiosity and instills a love of reading from an early age.",
      },
    },
    options: [
      { label: { hi: "💻 स्मार्ट क्लास देखें", en: "💻 See Smart Class" }, next: "FAC_SMART" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  FAC_MDM: {
    text: {
      hi: {
        display: `<b>🍱 मध्याह्न भोजन (Mid-Day Meal)</b><br/><br/>
सरकार द्वारा समर्थित पौष्टिक भोजन - हर दिन हर बच्चे को ऊर्जावान और स्वस्थ रखने के लिए प्रदान किया जाता है।`,
        speak: "सरकार द्वारा समर्थित मध्याह्न भोजन कार्यक्रम हर दिन बच्चों को पौष्टिक भोजन प्रदान करता है।",
      },
      en: {
        display: `<b>🍱 Mid-Day Meal Programme (MDM)</b><br/><br/>
Government-supported, nutritious meals provided daily to ensure every child is nourished and energized to learn.`,
        speak: "A government-supported Mid-Day Meal is provided to every child daily to keep them nourished and energized.",
      },
    },
    options: [
      { label: { hi: "🤝 अभिभावक सहभागिता", en: "🤝 Parent Partnership" }, next: "ADM_PARENTS" },
      { label: { hi: "🏠 मुख्य मेनू", en: "🏠 Main Menu" }, next: "ROOT" },
    ],
  },

  // ── TIMINGS ──────────────────────────────────────────────
  TIMINGS: {
    text: {
      hi: {
        display: `<b>🕐 स्कूल का समय</b><br/><br/>
📅 <b>सोमवार से शनिवार</b><br/>
⏰ सुबह 8 बजे से दोपहर 2 बजे तक<br/><br/>
🏫 <b>स्कूल कार्यालय का समय:</b><br/>
सोम-शनि, सुबह 8 बजे से दोपहर 2 बजे तक<br/><br/>
📱 किसी भी प्रश्न के लिए: <a href="tel:+919454826921" style="${S.phone}">9454826921</a><br/><br/>
<i>रविवार और सरकारी छुट्टियों पर स्कूल बंद रहता है।</i>`,
        speak: "स्कूल सोमवार से शनिवार सुबह 8 बजे से दोपहर 2 बजे तक खुला रहता है। रविवार और सरकारी छुट्टियों पर बंद रहता है।",
      },
      en: {
        display: `<b>🕐 School Timings</b><br/><br/>
📅 <b>Monday to Saturday</b><br/>
⏰ 8:00 AM to 2:00 PM<br/><br/>
🏫 <b>School Office Hours:</b><br/>
Mon-Sat, 8:00 AM to 2:00 PM<br/><br/>
📱 For any queries: <a href="tel:+919454826921" style="${S.phone}">9454826921</a><br/><br/>
<i>School is closed on Sundays and government holidays.</i>`,
        speak: "School is open Monday to Saturday from 8 AM to 2 PM. School is closed on Sundays and government holidays.",
      },
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
      hi: {
        display: `<b>🌐 हमें सोशल मीडिया पर फॉलो करें</b><br/><br/>
📸 <a href="https://instagram.com/mpsbharsare" target="_blank" rel="noopener" style="${S.ig}">Instagram: @mpsbharsare</a><br/>
👍 <a href="https://www.facebook.com/profile.php?id=61564437598896" target="_blank" rel="noopener" style="${S.fb}">Facebook: Model Primary School</a><br/>
▶️ <a href="https://youtube.com/@vandanayadav7071" target="_blank" rel="noopener" style="${S.yt}">YouTube: @vandanayadav7071</a><br/>
💬 <a href="https://wa.me/919454826921" target="_blank" rel="noopener" style="${S.wa}">WhatsApp: +91 9454826921</a><br/><br/>
हमसे जुड़ें और स्कूल के नवीनतम अपडेट पाएं!`,
        speak: "हमारे सोशल मीडिया से जुड़ें। इंस्टाग्राम पर एम.पी.एस. भरसारे, फ़ेसबुक पर मॉडल प्राइमरी स्कूल, यूट्यूब पर वंदना यादव को फॉलो करें और व्हाट्सएप पर भी संपर्क कर सकते हैं।",
      },
      en: {
        display: `<b>🌐 Follow Us on Social Media</b><br/><br/>
📸 <a href="https://instagram.com/mpsbharsare" target="_blank" rel="noopener" style="${S.ig}">Instagram: @mpsbharsare</a><br/>
👍 <a href="https://www.facebook.com/profile.php?id=61564437598896" target="_blank" rel="noopener" style="${S.fb}">Facebook: Model Primary School</a><br/>
▶️ <a href="https://youtube.com/@vandanayadav7071" target="_blank" rel="noopener" style="${S.yt}">YouTube: @vandanayadav7071</a><br/>
💬 <a href="https://wa.me/919454826921" target="_blank" rel="noopener" style="${S.wa}">WhatsApp: +91 9454826921</a><br/><br/>
Follow us for school updates and activities!`,
        speak: "Follow us on social media. Find us on Instagram at mpsbharsare, on Facebook as Model Primary School, on YouTube at vandanayadav7071, and reach us on WhatsApp.",
      },
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
  hi: {
    display: "🙏 नमस्ते! मैं <b>EVI</b> हूँ - मॉडल प्राइमरी स्कूल, भरसारे की डिजिटल सहायक। नीचे दिए गए बटनों से मुझसे कुछ भी पूछें!",
    speak: "नमस्ते! मैं एव्ही हूँ, मॉडल प्राइमरी स्कूल भरसारे की डिजिटल सहायक। नीचे दिए बटनों से मुझसे कुछ भी पूछें।",
  },
  en: {
    display: "🙏 Hello! I'm <b>EVI</b> - the digital assistant of Model Primary School, Bharsare. Tap any button below to get started!",
    speak: "Hello! I am EVI, the digital assistant of Model Primary School, Bharsare. Tap any button below to get started.",
  },
};
