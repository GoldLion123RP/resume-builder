# 📄 Resume Builder

A modern, **ATS-friendly Resume Builder** designed specifically for **technical university students** (B.Tech CS/IT/ECE/EE). Build professional resumes with beautiful templates, export to PDF/DOCX, and sync across devices - completely **FREE**!

![Resume Builder Banner](https://via.placeholder.com/1200x400/3B82F6/FFFFFF?text=Resume+Builder)

---

## ✨ Features

### 🎨 **Core Features**
- ✅ **11 Customizable Sections** - Profile, Education, Experience, Projects, Skills, Certifications, Achievements, POR, Publications, Extracurriculars, Languages
- ✅ **6 Professional Templates** - Classic, Modern, Minimal, Two-Column, Compact, ATS-Optimized
- ✅ **ATS-Friendly Mode** - Toggle between beautiful and scanner-optimized formats
- ✅ **Profile Image Upload** - Add professional photo with preview
- ✅ **Live Preview** - See changes in real-time

### 💾 **Storage & Sync**
- ✅ **Works Offline** - LocalStorage ensures data persists without login
- ✅ **Cloud Sync (Optional)** - Firebase authentication for multi-device access
- ✅ **Auto-Save** - Never lose your work
- ✅ **Export Formats** - PDF, DOCX, Plain Text

### 🔐 **Authentication**
- ✅ Google Sign-In
- ✅ GitHub Sign-In
- ✅ Facebook Sign-In
- ✅ Email/Password with OTP

### 🎨 **Customization**
- ✅ **Dark Mode** - System preference + manual toggle
- ✅ **Custom Colors** - Choose your accent color
- ✅ **Font Selection** - Arial, Calibri, Garamond, Lato, Times New Roman
- ✅ **Spacing Control** - Compact or spacious layouts

### 📚 **Guidance & Tips**
- ✅ **Action Verbs Bank** - 40+ power verbs categorized
- ✅ **Bullet Formula** - XYZ format guidance
- ✅ **ATS Tips** - 10 best practices
- ✅ **Pre-filled Sample** - Demo data to explore features

### 📱 **User Experience**
- ✅ **Mobile Responsive** - Works on all devices
- ✅ **Progress Tracker** - See completion percentage
- ✅ **Accessible** - WCAG 2.1 AA compliant
- ✅ **Fast & Lightweight** - Optimized performance

---

## 🚀 Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | React 18+ with Vite |
| **UI Framework** | Tailwind CSS + shadcn/ui |
| **Backend** | Firebase (Auth + Firestore) |
| **Export** | jsPDF, html2canvas, docx.js |
| **Deployment** | GitHub Pages |
| **Language** | JavaScript (ES6+) |

---

## 📦 Installation

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/resume-builder.git
   cd resume-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example file
   cp .env.example .env.local
   
   # Edit .env.local and add your Firebase credentials
   ```

4. **Get Firebase Credentials**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication (Google, GitHub, Facebook, Email/Password)
   - Enable Firestore Database
   - Go to Project Settings > Your Apps > Web App
   - Copy the config values to `.env.local`

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:5173
   ```

---

## 🏗️ Project Structure

```
resume-builder/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── ui/            # shadcn components
│   │   ├── layout/        # Header, Footer, Navigation
│   │   ├── sections/      # 11 resume sections
│   │   ├── forms/         # Form components
│   │   ├── preview/       # Resume templates
│   │   ├── export/        # PDF/DOCX/TXT generators
│   │   ├── auth/          # Authentication UI
│   │   └── features/      # Progress, tips, theme
│   ├── lib/               # Utilities & Firebase
│   ├── hooks/             # Custom React hooks
│   ├── context/           # State management
│   ├── data/              # Constants & sample data
│   ├── styles/            # Global CSS
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
├── .env.example           # Environment template
├── vite.config.js         # Vite configuration
└── package.json           # Dependencies
```

---

## 🎯 Usage Guide

### 1. **Fill Your Information**
   - Start with Profile section (required)
   - Add sections you need (all others optional)
   - Use the sample data as reference

### 2. **Choose a Template**
   - Select from 6 professional designs
   - Customize colors, fonts, spacing

### 3. **Preview in Real-time**
   - See changes instantly
   - Toggle between Beautiful and ATS modes

### 4. **Export Your Resume**
   - **PDF** - For job applications
   - **DOCX** - For editing in Word
   - **TXT** - For copy-paste into forms

### 5. **Optional: Create Account**
   - Sign in to sync across devices
   - Your data is saved locally by default

---

## 📝 Resume Sections

| Section | Description | Required |
|---------|-------------|----------|
| Profile | Name, contact, objective, photo | ✅ Yes |
| Education | Degrees, CGPA, coursework | ❌ Optional |
| Experience | Internships, jobs | ❌ Optional |
| Projects | Personal/academic projects | ❌ Optional |
| Skills | Technical skills categorized | ❌ Optional |
| Certifications | Online courses, certificates | ❌ Optional |
| Achievements | Awards, competitions | ❌ Optional |
| POR | Leadership positions | ❌ Optional |
| Publications | Research papers | ❌ Optional |
| Extracurricular | Clubs, volunteering | ❌ Optional |
| Languages | Language proficiency | ❌ Optional |

---

## 🚢 Deployment

### Deploy to GitHub Pages

1. **Update `package.json`**
   ```json
   "homepage": "https://yourusername.github.io/resume-builder"
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
   https://yourusername.github.io/resume-builder
   ```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with ❤️ for students by students
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Hosted on [GitHub Pages](https://pages.github.com/)

---

## 📧 Contact

**Project Maintainer:** Your Name

- GitHub: [@goldlion123rp](https://github.com/goldlion123rp)
- Email: goldlion123.rp@gmail.com

---

## 🗺️ Roadmap

- [ ] AI Resume Scoring
- [ ] LinkedIn Import
- [ ] Shareable Resume Links
- [ ] Cover Letter Builder
- [ ] Multi-language Support

---

**⭐ If this project helped you, please give it a star!**
