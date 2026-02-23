// Sample Resume Data - Bengali/Indian Professional
// Users can load this to see a complete resume example

export const sampleResumeData = {
  profile: {
    fullName: 'Arjun Mukherjee',
    title: 'Full Stack Software Engineer',
    email: 'arjun.mukherjee@email.com',
    phone: '+91 98765 43210',
    location: 'Kolkata, West Bengal, India',
    linkedin: 'linkedin.com/in/arjunmukherjee',
    github: 'github.com/arjunmukherjee',
    portfolio: 'arjunmukherjee.dev',
    summary: 'Innovative Full Stack Developer with 4+ years of experience building scalable web applications. Passionate about clean code, user experience, and leveraging modern technologies to solve real-world problems. Strong background in React, Node.js, and cloud technologies with a proven track record of delivering high-impact projects.',
  },

  education: [
    {
      id: '1',
      degree: 'Bachelor of Technology in Computer Science',
      institution: 'Jadavpur University',
      location: 'Kolkata, West Bengal',
      startDate: 'July 2016',
      endDate: 'June 2020',
      current: false,
      gpa: '8.7/10',
      coursework: 'Data Structures, Algorithms, Database Systems, Operating Systems, Software Engineering, Web Technologies, Machine Learning',
    },
    {
      id: '2',
      degree: 'Higher Secondary (Science)',
      institution: 'South Point High School',
      location: 'Kolkata, West Bengal',
      startDate: 'April 2014',
      endDate: 'March 2016',
      current: false,
      gpa: '92.4%',
      coursework: 'Physics, Chemistry, Mathematics, Computer Science',
    },
  ],

  experience: [
    {
      id: '1',
      jobTitle: 'Senior Software Engineer',
      company: 'TCS (Tata Consultancy Services)',
      location: 'Kolkata, West Bengal',
      type: 'Full-time',
      startDate: 'August 2022',
      endDate: '',
      current: true,
      description: `- Led development of a microservices-based e-commerce platform serving 2M+ users, improving system performance by 45%
- Architected and implemented RESTful APIs using Node.js and Express, reducing API response time by 60%
- Mentored team of 4 junior developers, conducting code reviews and knowledge sharing sessions
- Integrated payment gateways (Razorpay, PayTM) achieving 99.8% transaction success rate
- Implemented CI/CD pipelines using Jenkins and Docker, reducing deployment time by 70%`,
      technologies: 'React, Node.js, MongoDB, Redis, AWS, Docker, Kubernetes, Jenkins',
    },
    {
      id: '2',
      jobTitle: 'Software Developer',
      company: 'Cognizant Technology Solutions',
      location: 'Salt Lake, Kolkata',
      type: 'Full-time',
      startDate: 'July 2020',
      endDate: 'July 2022',
      current: false,
      description: `- Developed responsive web applications using React and TypeScript for Fortune 500 clients
- Built real-time data visualization dashboards using D3.js, improving data insights accessibility by 80%
- Collaborated with cross-functional teams across 3 time zones to deliver projects 15% ahead of schedule
- Optimized SQL queries and database schemas, reducing query execution time by 40%
- Participated in Agile ceremonies and contributed to sprint planning and retrospectives`,
      technologies: 'React, TypeScript, Python, PostgreSQL, AWS S3, D3.js, Material-UI',
    },
    {
      id: '3',
      jobTitle: 'Software Engineering Intern',
      company: 'Wipro Limited',
      location: 'New Town, Kolkata',
      type: 'Internship',
      startDate: 'January 2020',
      endDate: 'June 2020',
      current: false,
      description: `- Developed automation scripts using Python and Selenium, saving 20 hours/week of manual testing effort
- Assisted in migrating legacy applications to React-based modern UI framework
- Participated in daily standups and contributed to sprint deliverables
- Received "Outstanding Intern" award for exceptional performance`,
      technologies: 'Python, Selenium, React, JavaScript, Git',
    },
  ],

  projects: [
    {
      id: '1',
      name: 'SwasthyaSeva - Healthcare Management System',
      description: `- Built a comprehensive healthcare platform connecting 500+ patients with doctors in rural West Bengal
- Implemented telemedicine features with video consultation using WebRTC
- Developed prescription management and appointment scheduling modules
- Integrated SMS notifications using Twilio for appointment reminders`,
      technologies: 'React, Node.js, MongoDB, WebRTC, Twilio, AWS',
      liveUrl: 'https://swasthyaseva.in',
      githubUrl: 'https://github.com/arjun/swasthyaseva',
    },
    {
      id: '2',
      name: 'BengaliOCR - Text Recognition for Bengali Script',
      description: `- Developed machine learning model for recognizing handwritten Bengali text with 92% accuracy
- Created web interface for uploading images and extracting text in real-time
- Trained model on 50,000+ Bengali handwriting samples using TensorFlow
- Published research paper at national AI conference`,
      technologies: 'Python, TensorFlow, Keras, Flask, OpenCV',
      liveUrl: '',
      githubUrl: 'https://github.com/arjun/bengali-ocr',
    },
    {
      id: '3',
      name: 'KolkataTransit - Public Transport Navigator',
      description: `- Created real-time bus and metro tracking system for Kolkata public transport
- Integrated with Kolkata Metro Rail Corporation API for live train schedules
- Implemented route planning with Google Maps API
- Achieved 10,000+ downloads on Google Play Store`,
      technologies: 'React Native, Firebase, Google Maps API, Redux',
      liveUrl: 'https://kolkatatransit.app',
      githubUrl: '',
    },
  ],

  skills: [
    {
      id: '1',
      category: 'Programming Languages',
      skills: 'JavaScript, TypeScript, Python, Java, C++, SQL',
    },
    {
      id: '2',
      category: 'Frontend Technologies',
      skills: 'React, Next.js, Redux, HTML5, CSS3, Tailwind CSS, Material-UI, Bootstrap',
    },
    {
      id: '3',
      category: 'Backend Technologies',
      skills: 'Node.js, Express.js, Django, Flask, RESTful APIs, GraphQL',
    },
    {
      id: '4',
      category: 'Databases',
      skills: 'MongoDB, PostgreSQL, MySQL, Redis, Firebase',
    },
    {
      id: '5',
      category: 'Cloud & DevOps',
      skills: 'AWS (EC2, S3, Lambda), Docker, Kubernetes, Jenkins, Git, GitHub Actions',
    },
    {
      id: '6',
      category: 'Tools & Frameworks',
      skills: 'VS Code, Postman, Jira, Figma, Agile/Scrum, TDD',
    },
  ],

  certifications: [
    {
      id: '1',
      name: 'AWS Certified Solutions Architect - Associate',
      issuer: 'Amazon Web Services',
      date: 'March 2023',
      credentialId: 'AWS-CSA-2023-789456',
      credentialUrl: 'https://aws.amazon.com/verification',
    },
    {
      id: '2',
      name: 'Google Cloud Professional Developer',
      issuer: 'Google Cloud',
      date: 'November 2022',
      credentialId: 'GCP-PD-2022-123789',
      credentialUrl: '',
    },
    {
      id: '3',
      name: 'MongoDB Certified Developer',
      issuer: 'MongoDB University',
      date: 'August 2021',
      credentialId: 'MONGO-DEV-2021-456123',
      credentialUrl: '',
    },
  ],

  achievements: [
    {
      id: '1',
      title: 'TCS Star Performer Award 2023',
      issuer: 'Tata Consultancy Services',
      date: 'December 2023',
      description: 'Recognized for exceptional contribution to critical client project delivery and innovation',
    },
    {
      id: '2',
      title: 'Smart India Hackathon - National Winner',
      issuer: 'Ministry of Education, Government of India',
      date: 'August 2019',
      description: 'Led team to first place among 15,000+ participants with healthcare accessibility solution',
    },
    {
      id: '3',
      title: 'Best Final Year Project',
      issuer: 'Jadavpur University',
      date: 'June 2020',
      description: 'Awarded for Bengali OCR system project demonstrating innovation in regional language technology',
    },
    {
      id: '4',
      title: 'ACM ICPC Regionals Finalist',
      issuer: 'ACM India',
      date: 'December 2018',
      description: 'Qualified for regional finals in competitive programming competition',
    },
  ],

  por: [
    {
      id: '1',
      title: 'Technical Lead',
      organization: 'Google Developer Student Club, Jadavpur University',
      startDate: 'August 2019',
      endDate: 'June 2020',
      current: false,
      description: `- Led technical workshops on web development and cloud technologies for 200+ students
- Organized hackathons and coding competitions with participation from 500+ students
- Coordinated with Google mentors for guest lectures and technical sessions
- Managed team of 15 core members across different technical domains`,
    },
    {
      id: '2',
      title: 'Cultural Secretary',
      organization: 'Computer Science Department, Jadavpur University',
      startDate: 'July 2018',
      endDate: 'June 2019',
      current: false,
      description: `- Organized annual technical-cultural fest "Srijan 2019" with 2000+ attendees
- Coordinated with sponsors securing ₹5 lakhs in funding
- Managed event logistics, volunteer teams, and guest speaker arrangements`,
    },
  ],

  publications: [
    {
      id: '1',
      title: 'Deep Learning Approach for Handwritten Bengali Character Recognition',
      authors: 'Arjun Mukherjee, Dr. Subhasis Roy, Prof. Anindita Das',
      venue: 'National Conference on Artificial Intelligence and Machine Learning (NCAIML 2020)',
      date: 'February 2020',
      doi: '',
      url: 'https://research.example.com/bengali-ocr-paper',
    },
  ],

  extracurricular: [
    {
      id: '1',
      activity: 'Open Source Contributor',
      organization: 'Mozilla Foundation',
      duration: '2021 - Present',
      description: 'Active contributor to Mozilla Firefox and Rust projects with 50+ merged pull requests',
    },
    {
      id: '2',
      activity: 'Volunteer Coding Instructor',
      organization: 'Teach For India, Kolkata',
      duration: '2020 - 2022',
      description: 'Taught basic programming to underprivileged students in government schools every weekend',
    },
    {
      id: '3',
      activity: 'Marathon Runner',
      organization: 'Kolkata Marathon',
      duration: '2019 - Present',
      description: 'Completed Kolkata Marathon 2019, 2022, 2023. Personal best: 4 hours 15 minutes',
    },
  ],

  languages: [
    {
      id: '1',
      language: 'Bengali',
      proficiency: 'Native',
    },
    {
      id: '2',
      language: 'Hindi',
      proficiency: 'Fluent',
    },
    {
      id: '3',
      language: 'English',
      proficiency: 'Fluent',
    },
    {
      id: '4',
      language: 'Sanskrit',
      proficiency: 'Basic',
    },
  ],
}

// Alternative sample - Female Bengali Professional
export const sampleResumeData2 = {
  profile: {
    fullName: 'Priya Chatterjee',
    title: 'Data Scientist & ML Engineer',
    email: 'priya.chatterjee@email.com',
    phone: '+91 98712 34567',
    location: 'Howrah, West Bengal, India',
    linkedin: 'linkedin.com/in/priyachatterjee',
    github: 'github.com/priyachatterjee',
    portfolio: 'priyachatterjee.tech',
    summary: 'Results-driven Data Scientist with 3+ years of experience in machine learning, statistical analysis, and predictive modeling. Specialized in natural language processing and computer vision. Proven ability to transform complex data into actionable business insights. Published researcher with strong academic background in statistics and computer science.',
  },

  education: [
    {
      id: '1',
      degree: 'Master of Technology in Data Science',
      institution: 'Indian Institute of Technology (IIT) Kharagpur',
      location: 'Kharagpur, West Bengal',
      startDate: 'July 2020',
      endDate: 'June 2022',
      current: false,
      gpa: '9.1/10',
      coursework: 'Machine Learning, Deep Learning, Natural Language Processing, Statistical Computing, Big Data Analytics, Computer Vision',
    },
    {
      id: '2',
      degree: 'Bachelor of Science in Statistics (Honours)',
      institution: 'Presidency University',
      location: 'Kolkata, West Bengal',
      startDate: 'July 2017',
      endDate: 'June 2020',
      current: false,
      gpa: '8.9/10',
      coursework: 'Probability Theory, Mathematical Statistics, Regression Analysis, Time Series Analysis, Operations Research',
    },
  ],

  experience: [
    {
      id: '1',
      jobTitle: 'Senior Data Scientist',
      company: 'Flipkart',
      location: 'Bengaluru, Karnataka (Remote from Kolkata)',
      type: 'Full-time',
      startDate: 'July 2022',
      endDate: '',
      current: true,
      description: `- Built recommendation engine using collaborative filtering, increasing product discovery by 35%
- Developed fraud detection models using ensemble methods, reducing fraudulent transactions by 60%
- Led NLP project for customer review sentiment analysis across 5 regional languages including Bengali
- Mentored 3 junior data scientists and conducted ML workshops for engineering teams
- Deployed models to production using MLflow and Kubernetes, serving 10M+ requests daily`,
      technologies: 'Python, TensorFlow, PyTorch, Scikit-learn, Apache Spark, AWS SageMaker, Docker, Kubernetes',
    },
    {
      id: '2',
      jobTitle: 'Data Science Intern',
      company: 'IBM India',
      location: 'Kolkata, West Bengal',
      type: 'Internship',
      startDate: 'May 2021',
      endDate: 'July 2021',
      current: false,
      description: `- Developed predictive maintenance models for manufacturing equipment using time series analysis
- Created data visualization dashboards using Tableau for executive decision-making
- Conducted A/B testing experiments to optimize business processes
- Presented findings to senior leadership resulting in ₹50 lakh cost savings`,
      technologies: 'Python, Pandas, NumPy, Tableau, SQL, R',
    },
  ],

  projects: [
    {
      id: '1',
      name: 'BengaliNLP - Natural Language Processing Toolkit',
      description: `- Developed comprehensive NLP library for Bengali language processing
- Implemented text classification, named entity recognition, and sentiment analysis
- Created pre-trained word embeddings from 2M Bengali documents
- Open-sourced library with 500+ GitHub stars and active community`,
      technologies: 'Python, spaCy, NLTK, Transformers, FastAPI',
      liveUrl: '',
      githubUrl: 'https://github.com/priya/bengali-nlp',
    },
    {
      id: '2',
      name: 'COVID-19 Prediction Model for West Bengal',
      description: `- Built SEIR epidemiological model to predict COVID-19 spread in West Bengal districts
- Collaborated with state health department for data collection and validation
- Model predictions used by local authorities for resource allocation
- Featured in local media for contribution to pandemic response`,
      technologies: 'Python, SciPy, Matplotlib, Streamlit',
      liveUrl: 'https://wb-covid-predictor.herokuapp.com',
      githubUrl: '',
    },
  ],

  skills: [
    {
      id: '1',
      category: 'Programming Languages',
      skills: 'Python, R, SQL, Java, Scala',
    },
    {
      id: '2',
      category: 'Machine Learning',
      skills: 'Scikit-learn, TensorFlow, PyTorch, Keras, XGBoost, LightGBM',
    },
    {
      id: '3',
      category: 'Data Processing',
      skills: 'Pandas, NumPy, Apache Spark, Hadoop, Dask',
    },
    {
      id: '4',
      category: 'Visualization',
      skills: 'Matplotlib, Seaborn, Plotly, Tableau, Power BI',
    },
    {
      id: '5',
      category: 'Cloud & MLOps',
      skills: 'AWS (SageMaker, S3, EC2), GCP, Docker, Kubernetes, MLflow, DVC',
    },
    {
      id: '6',
      category: 'Databases',
      skills: 'PostgreSQL, MongoDB, Redis, Elasticsearch',
    },
  ],

  certifications: [
    {
      id: '1',
      name: 'TensorFlow Developer Certificate',
      issuer: 'Google',
      date: 'September 2022',
      credentialId: 'TF-DEV-2022-987654',
      credentialUrl: '',
    },
    {
      id: '2',
      name: 'AWS Machine Learning Specialty',
      issuer: 'Amazon Web Services',
      date: 'March 2023',
      credentialId: 'AWS-MLS-2023-456789',
      credentialUrl: '',
    },
  ],

  achievements: [
    {
      id: '1',
      title: 'Grace Hopper Celebration Scholarship',
      issuer: 'AnitaB.org',
      date: 'October 2022',
      description: 'Selected among top 100 women in computing in India for scholarship to attend GHC conference',
    },
    {
      id: '2',
      title: 'Best M.Tech Thesis Award',
      issuer: 'IIT Kharagpur',
      date: 'June 2022',
      description: 'Awarded for thesis on "Deep Learning for Regional Language Understanding"',
    },
  ],

  por: [
    {
      id: '1',
      title: 'President',
      organization: 'Women in Data Science, IIT Kharagpur',
      startDate: 'August 2021',
      endDate: 'June 2022',
      current: false,
      description: `- Founded and led WiDS chapter with 150+ active members
- Organized workshops, guest lectures, and mentorship programs
- Increased female participation in data science courses by 40%`,
    },
  ],

  publications: [
    {
      id: '1',
      title: 'Transfer Learning for Low-Resource Bengali Text Classification',
      authors: 'Priya Chatterjee, Dr. Amit Kumar Das',
      venue: 'International Conference on Natural Language Processing (ICON 2022)',
      date: 'December 2022',
      doi: '10.1234/icon.2022.56789',
      url: '',
    },
  ],

  extracurricular: [
    {
      id: '1',
      activity: 'Kaggle Competitions',
      organization: 'Kaggle',
      duration: '2020 - Present',
      description: 'Kaggle Expert (Competitions Master), Top 2% globally with 3 gold medals',
    },
    {
      id: '2',
      activity: 'Classical Dancer',
      organization: 'Rabindra Bharati University',
      duration: '2010 - 2018',
      description: 'Completed Visharad in Bharatanatyam, performed in 20+ cultural events across West Bengal',
    },
  ],

  languages: [
    {
      id: '1',
      language: 'Bengali',
      proficiency: 'Native',
    },
    {
      id: '2',
      language: 'Hindi',
      proficiency: 'Fluent',
    },
    {
      id: '3',
      language: 'English',
      proficiency: 'Fluent',
    },
  ],
}

export default sampleResumeData