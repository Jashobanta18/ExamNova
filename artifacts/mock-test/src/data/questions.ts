export type Language = "English" | "Hindi" | "Odia";

export interface Question {
  exam: string;
  question: Record<Language, string>;
  options: Record<Language, string[]>;
  answer: number;
  explanation?: Record<Language, string>;
}

const examNames = [
  "JEE Main",
  "NEET UG",
  "UPSC",
  "SSC CGL",
  "Bank PO",
  "Railway",
  "OSSSC",
  "OPSC",
  "UPPSC",
  "BPSC",
  "MPSC",
  "TNPSC",
  "Police Exam",
];

const realQuestions: Question[] = [
  // UPSC
  {
    exam: "UPSC",
    question: {
      English: "Who is the father of the Indian Constitution?",
      Hindi: "भारतीय संविधान के जनक कौन हैं?",
      Odia: "ଭାରତୀୟ ସମ୍ବିଧାନର ଜନକ କିଏ?",
    },
    options: {
      English: ["Jawaharlal Nehru", "B.R. Ambedkar", "Mahatma Gandhi", "Sardar Patel"],
      Hindi: ["जवाहरलाल नेहरू", "बी.आर. अम्बेडकर", "महात्मा गांधी", "सरदार पटेल"],
      Odia: ["ଜବାହରଲାଲ ନେହରୁ", "ବି.ଆର. ଆମ୍ବେଡ୍କର", "ମହାତ୍ମା ଗାନ୍ଧି", "ସର୍ଦ୍ଦାର ପଟେଲ"],
    },
    answer: 1,
    explanation: {
      English: "Dr. B.R. Ambedkar was the chairman of the Drafting Committee of the Indian Constitution.",
      Hindi: "डॉ. बी.आर. अम्बेडकर भारतीय संविधान की प्रारूप समिति के अध्यक्ष थे।",
      Odia: "ଡ. ବି.ଆର. ଆମ୍ବେଡ୍କର ଭାରତୀୟ ସମ୍ବିଧାନ ମସୌଦା କମିଟିର ଅଧ୍ୟକ୍ଷ ଥିଲେ।",
    },
  },
  {
    exam: "UPSC",
    question: {
      English: "Which article of the Indian Constitution abolishes untouchability?",
      Hindi: "भारतीय संविधान का कौन सा अनुच्छेद अस्पृश्यता को समाप्त करता है?",
      Odia: "ଭାରତୀୟ ସମ୍ବିଧାନର କେଉଁ ଅନୁଚ୍ଛେଦ ଅସ୍ପୃଶ୍ୟତାକୁ ବିଲୋପ କରେ?",
    },
    options: {
      English: ["Article 14", "Article 17", "Article 21", "Article 25"],
      Hindi: ["अनुच्छेद 14", "अनुच्छेद 17", "अनुच्छेद 21", "अनुच्छेद 25"],
      Odia: ["ଅନୁଚ୍ଛେଦ 14", "ଅନୁଚ୍ଛେଦ 17", "ଅନୁଚ୍ଛେଦ 21", "ଅନୁଚ୍ଛେଦ 25"],
    },
    answer: 1,
    explanation: {
      English: "Article 17 of the Indian Constitution abolishes untouchability in all its forms.",
      Hindi: "भारतीय संविधान का अनुच्छेद 17 सभी प्रकार की अस्पृश्यता को समाप्त करता है।",
      Odia: "ଭାରତୀୟ ସମ୍ବିଧାନର ଅନୁଚ୍ଛେଦ 17 ସମସ୍ତ ପ୍ରକାର ଅସ୍ପୃଶ୍ୟତାକୁ ବିଲୋପ କରେ।",
    },
  },
  {
    exam: "UPSC",
    question: {
      English: "The Preamble of the Indian Constitution was amended by which amendment?",
      Hindi: "भारतीय संविधान की प्रस्तावना को किस संशोधन द्वारा संशोधित किया गया था?",
      Odia: "ଭାରତୀୟ ସମ୍ବିଧାନର ପ୍ରସ୍ତାବନା କେଉଁ ସଂଶୋଧନ ଦ୍ବାରା ସଂଶୋଧିତ ହୋଇଥିଲା?",
    },
    options: {
      English: ["24th Amendment", "42nd Amendment", "44th Amendment", "52nd Amendment"],
      Hindi: ["24वां संशोधन", "42वां संशोधन", "44वां संशोधन", "52वां संशोधन"],
      Odia: ["24ତମ ସଂଶୋଧନ", "42ତମ ସଂଶୋଧନ", "44ତମ ସଂଶୋଧନ", "52ତମ ସଂଶୋଧନ"],
    },
    answer: 1,
    explanation: {
      English: "The 42nd Amendment (1976) added 'Socialist', 'Secular', and 'Integrity' to the Preamble.",
      Hindi: "42वें संशोधन (1976) ने प्रस्तावना में 'समाजवादी', 'धर्मनिरपेक्ष' और 'अखंडता' जोड़े।",
      Odia: "42ତମ ସଂଶୋଧନ (1976) ପ୍ରସ୍ତାବନାରେ 'ସମାଜବାଦୀ', 'ଧର୍ମନିରପେକ୍ଷ' ଏବଂ 'ଅଖଣ୍ଡତା' ଯୋଗ କଲା।",
    },
  },
  // SSC CGL
  {
    exam: "SSC CGL",
    question: {
      English: "If 15% of x is the same as 20% of y, then x:y equals?",
      Hindi: "यदि x का 15% y के 20% के बराबर है, तो x:y क्या होगा?",
      Odia: "ଯଦି x ର 15%, y ର 20% ର ସମାନ, ତେବେ x:y କ'ଣ ହବ?",
    },
    options: {
      English: ["3:4", "4:3", "5:4", "4:5"],
      Hindi: ["3:4", "4:3", "5:4", "4:5"],
      Odia: ["3:4", "4:3", "5:4", "4:5"],
    },
    answer: 1,
    explanation: {
      English: "0.15x = 0.20y → x/y = 0.20/0.15 = 4/3. So x:y = 4:3.",
      Hindi: "0.15x = 0.20y → x/y = 0.20/0.15 = 4/3। अतः x:y = 4:3।",
      Odia: "0.15x = 0.20y → x/y = 0.20/0.15 = 4/3। ତେଣୁ x:y = 4:3।",
    },
  },
  {
    exam: "SSC CGL",
    question: {
      English: "Which is the largest planet in our solar system?",
      Hindi: "हमारे सौर मंडल का सबसे बड़ा ग्रह कौन सा है?",
      Odia: "ଆମ ସୌରଜଗତର ସବୁଠାରୁ ବଡ ଗ୍ରହ କେଉଁଟି?",
    },
    options: {
      English: ["Saturn", "Neptune", "Jupiter", "Uranus"],
      Hindi: ["शनि", "नेपच्यून", "बृहस्पति", "यूरेनस"],
      Odia: ["ଶନି", "ନେପଚ୍ୟୁନ", "ବୃହସ୍ପତି", "ୟୁରାନସ"],
    },
    answer: 2,
    explanation: {
      English: "Jupiter is the largest planet in our solar system with a mass more than twice all other planets combined.",
      Hindi: "बृहस्पति हमारे सौर मंडल का सबसे बड़ा ग्रह है।",
      Odia: "ବୃହସ୍ପତି ଆମ ସୌରଜଗତର ସବୁଠାରୁ ବଡ ଗ୍ରହ।",
    },
  },
  {
    exam: "SSC CGL",
    question: {
      English: "The speed of light in vacuum is approximately?",
      Hindi: "निर्वात में प्रकाश की गति लगभग कितनी है?",
      Odia: "ଶୂନ୍ୟ ସ୍ଥାନରେ ଆଲୋକର ବେଗ ପ୍ରାୟ କ'ଣ?",
    },
    options: {
      English: ["2 × 10⁸ m/s", "3 × 10⁸ m/s", "3 × 10⁹ m/s", "2 × 10⁹ m/s"],
      Hindi: ["2 × 10⁸ m/s", "3 × 10⁸ m/s", "3 × 10⁹ m/s", "2 × 10⁹ m/s"],
      Odia: ["2 × 10⁸ m/s", "3 × 10⁸ m/s", "3 × 10⁹ m/s", "2 × 10⁹ m/s"],
    },
    answer: 1,
    explanation: {
      English: "The speed of light in vacuum is approximately 3 × 10⁸ m/s (299,792,458 m/s).",
      Hindi: "निर्वात में प्रकाश की गति लगभग 3 × 10⁸ m/s है।",
      Odia: "ଶୂନ୍ୟ ସ୍ଥାନରେ ଆଲୋକର ବେଗ ପ୍ରାୟ 3 × 10⁸ m/s।",
    },
  },
  // Bank PO
  {
    exam: "Bank PO",
    question: {
      English: "What does 'NEFT' stand for in banking?",
      Hindi: "बैंकिंग में 'NEFT' का पूर्ण रूप क्या है?",
      Odia: "ବ୍ୟାଙ୍କିଂରେ 'NEFT' ର ସଂପୂର୍ଣ ରୂପ କ'ଣ?",
    },
    options: {
      English: [
        "National Electronic Funds Transfer",
        "National Equity Funds Transfer",
        "National Emergency Funds Transfer",
        "Net Electronic Funds Transfer",
      ],
      Hindi: [
        "नेशनल इलेक्ट्रॉनिक फंड्स ट्रांसफर",
        "नेशनल इक्विटी फंड्स ट्रांसफर",
        "नेशनल इमरजेंसी फंड्स ट्रांसफर",
        "नेट इलेक्ट्रॉनिक फंड्स ट्रांसफर",
      ],
      Odia: [
        "ନ୍ୟାସନାଲ ଇଲେକ୍ଟ୍ରୋନିକ ଫଣ୍ଡ ଟ୍ରାନ୍ସଫର",
        "ନ୍ୟାସନାଲ ଇକ୍ୱିଟି ଫଣ୍ଡ ଟ୍ରାନ୍ସଫର",
        "ନ୍ୟାସନାଲ ଇମର୍ଜେନ୍ସି ଫଣ୍ଡ ଟ୍ରାନ୍ସଫର",
        "ନେଟ ଇଲେକ୍ଟ୍ରୋନିକ ଫଣ୍ଡ ଟ୍ରାନ୍ସଫର",
      ],
    },
    answer: 0,
    explanation: {
      English: "NEFT stands for National Electronic Funds Transfer, a system for transferring money electronically.",
      Hindi: "NEFT का अर्थ है नेशनल इलेक्ट्रॉनिक फंड्स ट्रांसफर।",
      Odia: "NEFT ର ଅର୍ଥ ହଉଛି ନ୍ୟାସନାଲ ଇଲେକ୍ଟ୍ରୋନିକ ଫଣ୍ଡ ଟ୍ରାନ୍ସଫର।",
    },
  },
  {
    exam: "Bank PO",
    question: {
      English: "Which bank is called the 'Banker's Bank' in India?",
      Hindi: "भारत में किस बैंक को 'बैंकर्स बैंक' कहा जाता है?",
      Odia: "ଭାରତରେ କେଉଁ ବ୍ୟାଙ୍କକୁ 'ବ୍ୟାଙ୍କର୍ ବ୍ୟାଙ୍କ' କୁହାଯାଏ?",
    },
    options: {
      English: ["State Bank of India", "Reserve Bank of India", "Punjab National Bank", "Bank of India"],
      Hindi: ["भारतीय स्टेट बैंक", "भारतीय रिजर्व बैंक", "पंजाब नेशनल बैंक", "बैंक ऑफ इंडिया"],
      Odia: ["ଷ୍ଟେଟ ବ୍ୟାଙ୍କ ଅଫ ଇଣ୍ଡିଆ", "ରିଜର୍ଭ ବ୍ୟାଙ୍କ ଅଫ ଇଣ୍ଡିଆ", "ପଞ୍ଜାବ ନ୍ୟାସନାଲ ବ୍ୟାଙ୍କ", "ବ୍ୟାଙ୍କ ଅଫ ଇଣ୍ଡିଆ"],
    },
    answer: 1,
    explanation: {
      English: "RBI (Reserve Bank of India) is called the Banker's Bank as it provides banking services to all other banks.",
      Hindi: "RBI (भारतीय रिजर्व बैंक) को बैंकर्स बैंक कहा जाता है।",
      Odia: "RBI (ରିଜର୍ଭ ବ୍ୟାଙ୍କ ଅଫ ଇଣ୍ଡିଆ)କୁ ବ୍ୟାଙ୍କର ବ୍ୟାଙ୍କ କୁହାଯାଏ।",
    },
  },
  // JEE Main
  {
    exam: "JEE Main",
    question: {
      English: "The derivative of sin(x) with respect to x is?",
      Hindi: "sin(x) का x के सापेक्ष अवकल क्या है?",
      Odia: "sin(x) ର x ସାପେକ୍ଷ ଅବକଳ କ'ଣ?",
    },
    options: {
      English: ["-cos(x)", "cos(x)", "-sin(x)", "tan(x)"],
      Hindi: ["-cos(x)", "cos(x)", "-sin(x)", "tan(x)"],
      Odia: ["-cos(x)", "cos(x)", "-sin(x)", "tan(x)"],
    },
    answer: 1,
    explanation: {
      English: "d/dx [sin(x)] = cos(x). This is a fundamental calculus identity.",
      Hindi: "d/dx [sin(x)] = cos(x)। यह कलन का एक मूल तत्सम है।",
      Odia: "d/dx [sin(x)] = cos(x)। ଏହା ଏକ ମୌଳିକ କ୍ୟାଲ୍କୁଲସ ପ୍ରମାଣ।",
    },
  },
  {
    exam: "JEE Main",
    question: {
      English: "What is the SI unit of electric charge?",
      Hindi: "विद्युत आवेश का SI मात्रक क्या है?",
      Odia: "ବୈଦ୍ୟୁତିକ ଚାର୍ଜର SI ଏକକ କ'ଣ?",
    },
    options: {
      English: ["Ampere", "Volt", "Coulomb", "Watt"],
      Hindi: ["एम्पियर", "वोल्ट", "कूलम्ब", "वॉट"],
      Odia: ["ଆମ୍ପିୟର", "ଭୋଲ୍ଟ", "କୁଲୋମ୍ବ", "ୱାଟ"],
    },
    answer: 2,
    explanation: {
      English: "The SI unit of electric charge is the Coulomb (C), named after physicist Charles-Augustin de Coulomb.",
      Hindi: "विद्युत आवेश का SI मात्रक कूलम्ब (C) है।",
      Odia: "ବୈଦ୍ୟୁତିକ ଚାର୍ଜର SI ଏକକ ହଉଛି କୁଲୋମ୍ବ (C)।",
    },
  },
  // NEET UG
  {
    exam: "NEET UG",
    question: {
      English: "Which organ produces insulin in the human body?",
      Hindi: "मानव शरीर में इंसुलिन कौन सा अंग बनाता है?",
      Odia: "ମାନବ ଶରୀରରେ ଇନ୍‌ସୁଲିନ କେଉଁ ଅଙ୍ଗ ତୈଆର କରେ?",
    },
    options: {
      English: ["Liver", "Kidney", "Pancreas", "Adrenal gland"],
      Hindi: ["यकृत", "गुर्दा", "अग्न्याशय", "अधिवृक्क ग्रंथि"],
      Odia: ["ଯକୃତ", "ବୃକ୍‌କ", "ଅଗ୍ନ୍ୟାଶୟ", "ଆଡ୍ରିନାଲ ଗ୍ରନ୍ଥି"],
    },
    answer: 2,
    explanation: {
      English: "Insulin is produced by the beta cells of the islets of Langerhans in the pancreas.",
      Hindi: "इंसुलिन अग्न्याशय में लैंगरहैंस के आइलेट्स की बीटा कोशिकाओं द्वारा उत्पादित होता है।",
      Odia: "ଇନ୍‌ସୁଲିନ ଅଗ୍ନ୍ୟାଶୟ ମଧ୍ୟସ୍ଥ ଲ୍ୟାଙ୍ଗରହ୍ୟାନ୍ସ ଦ୍ୱୀପର ବିଟା ସେଲ ଦ୍ବାରା ଉତ୍ପାଦିତ ହୁଏ।",
    },
  },
  {
    exam: "NEET UG",
    question: {
      English: "What is the powerhouse of the cell?",
      Hindi: "कोशिका का पावरहाउस क्या है?",
      Odia: "କୋଷର ଶକ୍ତিକେନ୍ଦ୍ର କ'ଣ?",
    },
    options: {
      English: ["Nucleus", "Ribosome", "Mitochondria", "Endoplasmic reticulum"],
      Hindi: ["नाभिक", "राइबोसोम", "माइटोकॉन्ड्रिया", "एंडोप्लाज्मिक रेटिकुलम"],
      Odia: ["ନ୍ୟୁକ୍ଲିୟସ", "ରାଇବୋସୋମ", "ମାଇଟୋକଣ୍ଡ୍ରିଆ", "ଏଣ୍ଡୋପ୍ଲାଜ୍ମିକ ରେଟିକୁଲମ"],
    },
    answer: 2,
    explanation: {
      English: "Mitochondria are called the powerhouse of the cell as they produce ATP (energy) through cellular respiration.",
      Hindi: "माइटोकॉन्ड्रिया को कोशिका का पावरहाउस कहते हैं क्योंकि यह ATP उत्पन्न करता है।",
      Odia: "ମାଇଟୋକଣ୍ଡ୍ରିଆକୁ କୋଷର ଶକ୍ତିକେନ୍ଦ୍ର କୁହାଯାଏ।",
    },
  },
  // Railway
  {
    exam: "Railway",
    question: {
      English: "What is the full form of RRB?",
      Hindi: "RRB का पूर्ण रूप क्या है?",
      Odia: "RRB ର ସଂପୂର୍ଣ ରୂପ କ'ଣ?",
    },
    options: {
      English: [
        "Railway Recruitment Board",
        "Railway Revenue Board",
        "Railway Registration Board",
        "Railway Regulation Board",
      ],
      Hindi: [
        "रेलवे भर्ती बोर्ड",
        "रेलवे राजस्व बोर्ड",
        "रेलवे पंजीकरण बोर्ड",
        "रेलवे विनियमन बोर्ड",
      ],
      Odia: [
        "ରେଲୱେ ରିକ୍ରୁଟ୍ ବୋର୍ଡ",
        "ରେଲୱେ ରାଜସ୍ব ବୋର୍ଡ",
        "ରେଲୱେ ରେଜିଷ୍ଟ୍ରେସନ ବୋର୍ଡ",
        "ରେଲୱେ ରେଗୁଲେସନ ବୋର୍ଡ",
      ],
    },
    answer: 0,
    explanation: {
      English: "RRB stands for Railway Recruitment Board, which conducts recruitment for Indian Railways.",
      Hindi: "RRB का अर्थ है रेलवे भर्ती बोर्ड, जो भारतीय रेलवे में भर्ती आयोजित करता है।",
      Odia: "RRB ର ଅର୍ଥ ହଉଛି ରେଲୱେ ରିକ୍ରୁଟ୍ ବୋର୍ଡ।",
    },
  },
  // Police Exam
  {
    exam: "Police Exam",
    question: {
      English: "What is the emergency number for Police in India?",
      Hindi: "भारत में पुलिस का आपातकालीन नंबर क्या है?",
      Odia: "ଭାରତରେ ପୋଲିସ ର ଜରୁରୀ ନମ୍ବର କ'ଣ?",
    },
    options: {
      English: ["100", "101", "102", "108"],
      Hindi: ["100", "101", "102", "108"],
      Odia: ["100", "101", "102", "108"],
    },
    answer: 0,
    explanation: {
      English: "100 is the emergency number for Police in India. 101 is for Fire, 102 for Ambulance.",
      Hindi: "100 भारत में पुलिस का आपातकालीन नंबर है। 101 अग्निशमन के लिए, 102 एम्बुलेंस के लिए है।",
      Odia: "100 ହଉଛି ଭାରତରେ ପୋଲିସ ର ଜରୁରୀ ନମ୍ବର।",
    },
  },
  // OSSSC
  {
    exam: "OSSSC",
    question: {
      English: "What is the capital of Odisha?",
      Hindi: "ओडिशा की राजधानी क्या है?",
      Odia: "ଓଡ଼ିଶାର ରାଜଧାନୀ କ'ଣ?",
    },
    options: {
      English: ["Cuttack", "Bhubaneswar", "Berhampur", "Sambalpur"],
      Hindi: ["कटक", "भुवनेश्वर", "बेरहामपुर", "संबलपुर"],
      Odia: ["କଟକ", "ଭୁବନେଶ୍ବର", "ବ୍ରହ୍ମପୁର", "ସମ୍ବଲପୁର"],
    },
    answer: 1,
    explanation: {
      English: "Bhubaneswar is the capital of Odisha. Cuttack was the former capital.",
      Hindi: "भुवनेश्वर ओडिशा की राजधानी है। कटक पूर्व राजधानी थी।",
      Odia: "ଭୁବନେଶ୍ବର ହଉଛି ଓଡ଼ିଶାର ରାଜଧାନୀ। ପୂର୍ବରୁ କଟକ ଥିଲା।",
    },
  },
  // OPSC
  {
    exam: "OPSC",
    question: {
      English: "In which year was Odisha formed as a separate state?",
      Hindi: "ओडिशा किस वर्ष एक अलग राज्य के रूप में बना?",
      Odia: "ଓଡ଼ିଶା କେଉଁ ବର୍ଷ ଏକ ପୃଥକ ରାଜ୍ୟ ଭାବରେ ଗଠିତ ହୋଇଥିଲା?",
    },
    options: {
      English: ["1935", "1936", "1947", "1950"],
      Hindi: ["1935", "1936", "1947", "1950"],
      Odia: ["1935", "1936", "1947", "1950"],
    },
    answer: 1,
    explanation: {
      English: "Odisha became a separate province on April 1, 1936. April 1 is celebrated as Utkala Dibasa (Odisha Day).",
      Hindi: "ओडिशा 1 अप्रैल 1936 को एक अलग प्रांत बना। 1 अप्रैल को उत्कल दिवस मनाया जाता है।",
      Odia: "ଓଡ଼ିଶା 1 ଏପ୍ରିଲ 1936 ରେ ଏକ ପୃଥକ ପ୍ରଦେଶ ହୋଇଥିଲା। 1 ଏପ୍ରିଲ ଉତ୍କଳ ଦିବସ ଭାବରେ ପାଳିତ ହୁଏ।",
    },
  },
  // UPPSC
  {
    exam: "UPPSC",
    question: {
      English: "What is the capital of Uttar Pradesh?",
      Hindi: "उत्तर प्रदेश की राजधानी क्या है?",
      Odia: "ଉତ୍ତରପ୍ରଦେଶର ରାଜଧାନୀ କ'ଣ?",
    },
    options: {
      English: ["Varanasi", "Agra", "Lucknow", "Kanpur"],
      Hindi: ["वाराणसी", "आगरा", "लखनऊ", "कानपुर"],
      Odia: ["ବାରାଣାସୀ", "ଆଗ୍ରା", "ଲଖ୍‌ନୌ", "କାନ୍ପୁର"],
    },
    answer: 2,
    explanation: {
      English: "Lucknow is the capital of Uttar Pradesh, the most populous state in India.",
      Hindi: "लखनऊ उत्तर प्रदेश की राजधानी है, जो भारत का सबसे अधिक जनसंख्या वाला राज्य है।",
      Odia: "ଲଖ୍‌ନୌ ଉତ୍ତରପ୍ରଦେଶର ରାଜଧାନୀ।",
    },
  },
  // BPSC
  {
    exam: "BPSC",
    question: {
      English: "Where was the first Satyagraha of Mahatma Gandhi in India?",
      Hindi: "भारत में महात्मा गांधी का पहला सत्याग्रह कहाँ था?",
      Odia: "ଭାରତରେ ମହାତ୍ମା ଗାନ୍ଧିଙ୍କ ପ୍ରଥମ ସତ୍ୟାଗ୍ରହ କେଉଁଠି ଥିଲା?",
    },
    options: {
      English: ["Ahmedabad", "Champaran, Bihar", "Dandi", "Kheda"],
      Hindi: ["अहमदाबाद", "चंपारण, बिहार", "दांडी", "खेड़ा"],
      Odia: ["ଅହମ୍ମଦାବାଦ", "ଚମ୍ପାରଣ, ବିହାର", "ଡାଣ୍ଡି", "ଖେଡ଼ା"],
    },
    answer: 1,
    explanation: {
      English: "The Champaran Satyagraha (1917) in Bihar was Gandhi's first civil disobedience movement in India.",
      Hindi: "चंपारण सत्याग्रह (1917) बिहार में गांधी का भारत में पहला सत्याग्रह था।",
      Odia: "ଚମ୍ପାରଣ ସତ୍ୟାଗ୍ରହ (1917) ଗାନ୍ଧିଙ୍କ ଭାରତରେ ପ୍ରଥମ ସତ୍ୟାଗ୍ରହ ଥିଲା।",
    },
  },
  // MPSC
  {
    exam: "MPSC",
    question: {
      English: "Which is the longest river in India?",
      Hindi: "भारत की सबसे लंबी नदी कौन सी है?",
      Odia: "ଭାରତର ସବୁଠାରୁ ଦୀର୍ଘ ନଦୀ କେଉଁଟି?",
    },
    options: {
      English: ["Yamuna", "Godavari", "Ganga", "Narmada"],
      Hindi: ["यमुना", "गोदावरी", "गंगा", "नर्मदा"],
      Odia: ["ଯମୁନା", "ଗୋଦାବରୀ", "ଗଙ୍ଗା", "ନର୍ମଦା"],
    },
    answer: 2,
    explanation: {
      English: "The Ganga is the longest river in India with a total length of about 2,525 km.",
      Hindi: "गंगा भारत की सबसे लंबी नदी है, जिसकी कुल लंबाई लगभग 2,525 किमी है।",
      Odia: "ଗଙ୍ଗା ଭାରତର ସବୁଠାରୁ ଦୀର୍ଘ ନଦୀ, ଯାହାର ମୋଟ ଦୈର୍ଘ ପ୍ରାୟ 2,525 କିମି।",
    },
  },
  // TNPSC
  {
    exam: "TNPSC",
    question: {
      English: "Which is the capital of Tamil Nadu?",
      Hindi: "तमिलनाडु की राजधानी क्या है?",
      Odia: "ତାମିଲନାଡ଼ୁର ରାଜଧାନୀ କ'ଣ?",
    },
    options: {
      English: ["Coimbatore", "Madurai", "Chennai", "Salem"],
      Hindi: ["कोयम्बटूर", "मदुरई", "चेन्नई", "सलेम"],
      Odia: ["କୋୟମ୍ବଟୁର", "ମଦୁରାଇ", "ଚେନ୍ନାଇ", "ସାଲେମ"],
    },
    answer: 2,
    explanation: {
      English: "Chennai (formerly Madras) is the capital of Tamil Nadu and the fourth largest city in India.",
      Hindi: "चेन्नई (पूर्व में मद्रास) तमिलनाडु की राजधानी है।",
      Odia: "ଚେନ୍ନାଇ (ପୂର୍ବ ନାମ ମାଦ୍ରାଜ) ତାମିଲନାଡ଼ୁର ରାଜଧାନୀ।",
    },
  },
];

export function generateQuestions(): Question[] {
  const generated: Question[] = [];
  examNames.forEach((exam) => {
    const existing = realQuestions.filter((q) => q.exam === exam);
    const needed = 100 - existing.length;
    for (let i = existing.length + 1; i <= existing.length + needed; i++) {
      generated.push({
        exam,
        question: {
          English: `${exam} — General Knowledge Question ${i}`,
          Hindi: `${exam} — सामान्य ज्ञान प्रश्न ${i}`,
          Odia: `${exam} — ସାଧାରଣ ଜ୍ଞାନ ପ୍ରଶ୍ନ ${i}`,
        },
        options: {
          English: ["Option A", "Option B", "Option C", "Option D"],
          Hindi: ["विकल्प A", "विकल्प B", "विकल्प C", "विकल्प D"],
          Odia: ["ବିକଳ୍ପ A", "ବିକଳ୍ପ B", "ବିକଳ୍ପ C", "ବିକଳ୍ପ D"],
        },
        answer: Math.floor(Math.random() * 4),
      });
    }
    generated.push(...existing);
  });
  return generated;
}

export const allQuestions: Question[] = generateQuestions();
export { examNames };
