# 📄 Resume Builder

A modern, **ATS-friendly Resume Builder** designed specifically for **technical university students** (B.Tech CS/IT/ECE/EE). Build professional resumes with beautiful templates, export to PDF/DOCX, and sync across devices - completely **FREE**!

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://goldlion123rp.github.io/resume-builder/)
[![GitHub](https://img.shields.io/badge/github-repo-blue?style=for-the-badge&logo=github)](https://github.com/GoldLion123RP/resume-builder)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)

---

## ✨ Features

### 🎨 **Core Features**
- ✅ **11 Customizable Sections** - Profile, Education, Experience, Projects, Skills, Certifications, Achievements, POR, Publications, Extracurriculars, Languages
- ✅ **6 Professional Templates** - Classic, Modern, Minimal, Two-Column, Compact, ATS-Optimized
- ✅ **ATS-Friendly Mode** - Toggle between beautiful and scanner-optimized formats
- ✅ **Live Preview** - See changes in real-time
- ✅ **Sample Data Loader** - Pre-filled examples (Bengali/Indian context)

### 💾 **Storage & Sync**
- ✅ **Works Offline** - LocalStorage ensures data persists without login
- ✅ **Cloud Sync (Optional)** - Firebase authentication for multi-device access
- ✅ **Auto-Save** - Never lose your work (2-second debounce)
- ✅ **Export Formats** - PDF (Beautiful & ATS), DOCX, Plain Text

### 🔐 **Authentication**
- ✅ Google Sign-In
- ✅ GitHub Sign-In
- ✅ Facebook Sign-In
- ✅ Email/Password

### 🎨 **Customization**
- ✅ **Dark Mode** - System preference + manual toggle (Light/Dark/Auto)
- ✅ **Custom Colors** - Choose your accent color
- ✅ **Font Selection** - 5 professional fonts
- ✅ **Spacing Control** - Compact or spacious layouts

### 📚 **Guidance & Tips**
- ✅ **Action Verbs Bank** - 240+ power verbs in 12 categories
- ✅ **Resume Formulas** - XYZ, STAR, PAR, CAR formats
- ✅ **Writing Tips** - Best practices and common mistakes
- ✅ **Progress Tracker** - See completion percentage with suggestions

### 📱 **User Experience**
- ✅ **Mobile Responsive** - Works perfectly on all devices
- ✅ **Keyboard Accessible** - Full keyboard navigation support
- ✅ **Screen Reader Friendly** - WCAG 2.1 AA compliant
- ✅ **Toast Notifications** - Real-time feedback for user actions
- ✅ **Error Boundaries** - Graceful error handling
- ✅ **Fast & Lightweight** - Optimized performance with lazy loading

---

## 🚀 Quick Start

### Try it Live
👉 **[Open Resume Builder](https://goldlion123rp.github.io/resume-builder/)** 👈

No installation needed! Works directly in your browser.

---

## 🛠️ Local Development

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GoldLion123RP/resume-builder.git
   cd resume-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables (Optional - for Firebase sync)**
   ```bash
   # Copy the example file
   cp .env.example .env.local

   # Edit .env.local and add your Firebase credentials
   ```

   **Get Firebase Credentials:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication (Google, GitHub, Facebook, Email/Password)
   - Enable Firestore Database
   - Go to Project Settings > Your Apps > Web App
   - Copy the config values to `.env.local`

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173/resume-builder/
   ```

---

## 🎯 Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | React 18 + Vite |
| **UI Framework** | Tailwind CSS + shadcn/ui |
| **State Management** | React Context API |
| **Backend** | Firebase (Auth + Firestore) |
| **Export** | jsPDF, html2canvas, docx.js, file-saver |
| **Deployment** | GitHub Pages |
| **Language** | JavaScript (ES6+) |

---

## 📂 Project Structure

```
resume-builder/
├── public/                 # Static assets
│   ├── manifest.json      # PWA manifest
│   └── logo.svg           # App logo
├── src/
│   ├── components/
│   │   ├── ui/            # Reusable UI components (Button, Card, etc.)
│   │   ├── common/        # Common utilities (ErrorBoundary, LazyLoad)
│   │   ├── layout/        # Header, Footer, Sidebar, Layout
│   │   ├── sections/      # 11 resume sections
│   │   ├── preview/       # Resume templates (6 templates)
│   │   ├── export/        # Export UI (PDF, DOCX, TXT)
│   │   ├── auth/          # Authentication modal
│   │   ├── tips/          # Tips panel with action verbs
│   │   └── features/      # Sample data, progress tracker
│   ├── lib/               # Utilities & Firebase config
│   │   ├── firebase.js    # Firebase initialization
│   │   ├── storage.js     # LocalStorage + Firestore sync
│   │   └── export/        # Export logic (PDF, DOCX, TXT)
│   ├── hooks/             # Custom React hooks
│   │   ├── useResume.js   # Resume data hook
│   │   ├── useAuth.js     # Authentication hook
│   │   ├── useTheme.js    # Theme management
│   │   └── useDebounce.js # Performance optimization
│   ├── context/           # Global state management
│   │   ├── ResumeContext.jsx
│   │   ├── AuthContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── ToastContext.jsx
│   ├── data/              # Constants & sample data
│   │   ├── actionVerbs.js
│   │   └── sampleData.js
│   ├── styles/            # Global CSS
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
├── .env.example           # Environment template
├── .env.local            # Your Firebase config (not committed)
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
└── package.json          # Dependencies
```

---

## 📋 Resume Sections

| Section | Description | Required |
|---------|-------------|----------|
| 📊 Dashboard | Progress tracker & quick stats | - |
| 👤 Profile | Name, contact, summary, photo | ✅ Yes |
| 🎓 Education | Degrees, CGPA, coursework | ⚪ Optional |
| 💼 Experience | Internships, jobs | ⚪ Optional |
| 🚀 Projects | Personal/academic projects | ⚪ Optional |
| ⚡ Skills | Technical skills categorized | ⚪ Optional |
| 📜 Certifications | Online courses, certificates | ⚪ Optional |
| 🏆 Achievements | Awards, competitions | ⚪ Optional |
| 👥 Leadership | Positions of Responsibility | ⚪ Optional |
| 📄 Publications | Research papers | ⚪ Optional |
| 🎯 Extracurricular | Clubs, volunteering | ⚪ Optional |
| 🌐 Languages | Language proficiency | ⚪ Optional |

---

## 🎨 Available Templates

1. **Classic** - Traditional corporate style
2. **Modern** - Contemporary design with colors
3. **Minimal** - Clean and simple
4. **Two-Column** - Efficient space usage
5. **Compact** - More content per page
6. **ATS-Friendly** - Optimized for applicant tracking systems

Each template supports:
- Beautiful mode (for human readers)
- ATS mode (for automated scanners)

---

## 📥 Export Formats

### PDF
- **Beautiful PDF** - Styled with colors, fonts, spacing
- **ATS-Friendly PDF** - Plain text, no graphics, scanner-optimized

### DOCX
- Microsoft Word format
- Editable after export
- Compatible with Google Docs, LibreOffice

### Plain Text
- Copy-paste ready
- For online application forms
- ASCII formatting preserved

---

## 🚢 Deployment

### Deploy to GitHub Pages

1. **Update repository name in `vite.config.js`** (if different)
   ```javascript
   base: '/resume-builder/'  // Change if your repo name is different
   ```

2. **Build and deploy**
   ```bash
   npm run deploy
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings > Pages
   - Source: `gh-pages` branch
   - Save

4. **Access your app**
   ```
   https://goldlion123rp.github.io/resume-builder/
   ```

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### Quick Contribution Steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🐛 Bug Reports & Feature Requests

Found a bug? Have a feature idea?

👉 [Open an issue](https://github.com/GoldLion123RP/resume-builder/issues)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with ❤️ for students by **Rahul Pal**
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Hosted on [GitHub Pages](https://pages.github.com/)
- Inspired by the need for free, student-friendly resume tools

---

## 📧 Contact

**Rahul Pal**

- GitHub: [@GoldLion123RP](https://github.com/GoldLion123RP)
- Email: goldlion123.rp@gmail.com
- LinkedIn: [Add your LinkedIn](https://linkedin.com/in/your-profile)

---

## 🗺️ Roadmap

- [ ] AI Resume Scoring & Suggestions
- [ ] LinkedIn Profile Import
- [ ] Shareable Resume Links (public URLs)
- [ ] Cover Letter Builder
- [ ] Multi-language Support (Hindi, Bengali)
- [ ] Chrome Extension for quick access
- [ ] Resume Version History
- [ ] PDF Parsing (upload existing resume)

---

## ⭐ Star History

If this project helped you, please give it a **⭐ star**!

[![Star History Chart](https://api.star-history.com/svg?repos=GoldLion123RP/resume-builder&type=Date)](https://star-history.com/#GoldLion123RP/resume-builder&Date)

---

## 📊 Project Stats

![GitHub repo size](https://img.shields.io/github/repo-size/GoldLion123RP/resume-builder)
![GitHub stars](https://img.shields.io/github/stars/GoldLion123RP/resume-builder?style=social)
![GitHub forks](https://img.shields.io/github/forks/GoldLion123RP/resume-builder?style=social)
![GitHub issues](https://img.shields.io/github/issues/GoldLion123RP/resume-builder)
![GitHub pull requests](https://img.shields.io/github/issues-pr/GoldLion123RP/resume-builder)

---

**Made with 💙 in West Bengal, India**
