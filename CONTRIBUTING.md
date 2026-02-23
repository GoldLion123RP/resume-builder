# Contributing to Resume Builder

First off, thank you for considering contributing to Resume Builder! 🎉

It's people like you that make Resume Builder such a great tool for students everywhere.

---

## 🌟 How Can I Contribute?

### 🐛 Reporting Bugs

**Before submitting a bug report:**
- Check the [existing issues](https://github.com/GoldLion123RP/resume-builder/issues) to avoid duplicates
- Collect information about the bug:
  - Browser & version (Chrome, Firefox, Safari, etc.)
  - Operating System (Windows, macOS, Linux)
  - Steps to reproduce
  - Expected vs actual behavior
  - Screenshots (if applicable)

**Submit a bug report:**
1. Go to [Issues](https://github.com/GoldLion123RP/resume-builder/issues)
2. Click "New Issue"
3. Use the bug report template
4. Provide as much detail as possible

---

### 💡 Suggesting Features

**Before suggesting a feature:**
- Check if someone else has already suggested it
- Make sure it aligns with the project's goals
- Consider if it would benefit most users

**Submit a feature request:**
1. Go to [Issues](https://github.com/GoldLion123RP/resume-builder/issues)
2. Click "New Issue"
3. Title: `[Feature Request] Your idea`
4. Describe:
   - What problem does it solve?
   - How should it work?
   - Why is it beneficial?
   - (Optional) Mockups or examples

---

### 🔧 Code Contributions

#### Getting Started

1. **Fork the repository**
   ```bash
   # Click "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/resume-builder.git
   cd resume-builder
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/GoldLion123RP/resume-builder.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-you-are-fixing
   ```

---

#### Development Workflow

1. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

2. **Test your changes**
   ```bash
   npm run dev
   # Test thoroughly in browser
   ```

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   # or
   git commit -m "fix: resolve issue with export"
   ```

   **Commit message format:**
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting, etc.)
   - `refactor:` - Code refactoring
   - `test:` - Adding tests
   - `chore:` - Maintenance tasks

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**
   - Go to your fork on GitHub
   - Click "Pull Request"
   - Fill in the template
   - Wait for review

---

#### Code Style Guidelines

**JavaScript/React:**
- Use functional components with hooks
- Prefer `const` over `let`, avoid `var`
- Use arrow functions
- Destructure props
- Keep components small and focused
- Use meaningful variable names

**Example:**
```jsx
// ✅ Good
const ProfileSection = ({ profile, onUpdate }) => {
  const { fullName, email } = profile
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdate({ fullName, email })
  }

  return <form onSubmit={handleSubmit}>...</form>
}

// ❌ Avoid
function ProfileSection(props) {
  var name = props.profile.fullName
  return <form>...</form>
}
```

**CSS/Tailwind:**
- Use Tailwind utility classes
- Group related utilities
- Use custom CSS only when necessary
- Follow mobile-first approach

**File Structure:**
- One component per file
- Use PascalCase for component files
- Use camelCase for utility files
- Group related files in folders

---

### 📝 Documentation Contributions

Help improve documentation:
- Fix typos or unclear explanations
- Add examples
- Improve code comments
- Update README with new features
- Add missing documentation

---

### 🎨 Design Contributions

- Suggest UI/UX improvements
- Create mockups for new features
- Report accessibility issues
- Suggest color scheme improvements

---

## 🚀 Pull Request Process

1. **Before submitting:**
   - Update README if you added features
   - Add comments to complex code
   - Remove console.logs and debugging code
   - Test on multiple browsers (Chrome, Firefox, Safari)
   - Test on mobile devices
   - Ensure no errors in browser console

2. **PR Description should include:**
   - What does this PR do?
   - Why is this change needed?
   - How to test it?
   - Screenshots (for UI changes)
   - Related issue number (if applicable)

3. **After submitting:**
   - Be patient and respectful
   - Respond to review comments
   - Make requested changes
   - Keep PR updated with main branch

4. **PR will be merged when:**
   - Code review is approved
   - All tests pass
   - No merge conflicts
   - Follows project standards

---

## 🔍 Code Review Process

**What we look for:**
- ✅ Code works as intended
- ✅ No breaking changes
- ✅ Clean, readable code
- ✅ Proper error handling
- ✅ Performance considerations
- ✅ Mobile responsiveness
- ✅ Accessibility (keyboard nav, screen readers)
- ✅ Dark mode support

**Typical review time:**
- Small fixes: 1-2 days
- New features: 3-7 days
- Major changes: 1-2 weeks

---

## 🎯 Good First Issues

New to open source? Look for issues tagged with:
- `good first issue` - Easy tasks for beginners
- `help wanted` - We need your help!
- `documentation` - Improve docs

---

## 💬 Communication

- **GitHub Issues:** For bugs, features, questions
- **Pull Requests:** For code discussions
- **Email:** goldlion123.rp@gmail.com (for private matters)

---

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all.

### Our Standards

**Positive behavior:**
- ✅ Being respectful and inclusive
- ✅ Welcoming diverse perspectives
- ✅ Accepting constructive criticism
- ✅ Focusing on what's best for the community
- ✅ Showing empathy

**Unacceptable behavior:**
- ❌ Harassment or discrimination
- ❌ Trolling or insulting comments
- ❌ Personal or political attacks
- ❌ Publishing private information
- ❌ Unprofessional conduct

### Enforcement

Violations may result in:
1. Warning
2. Temporary ban
3. Permanent ban

Report violations to: goldlion123.rp@gmail.com

---

## 🎓 Learning Resources

New to React, Firebase, or Tailwind?

**React:**
- [React Official Docs](https://react.dev/)
- [React Hooks Guide](https://react.dev/reference/react)

**Firebase:**
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Guide](https://firebase.google.com/docs/firestore)

**Tailwind CSS:**
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Tailwind UI](https://tailwindui.com/)

**Git & GitHub:**
- [GitHub Guides](https://guides.github.com/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

---

## 🙏 Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort! 💙

**Happy Coding!** 🚀

---

**Questions?** Feel free to ask in [Discussions](https://github.com/GoldLion123RP/resume-builder/discussions) or open an issue!

---