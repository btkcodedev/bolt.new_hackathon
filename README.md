# 🚀 PrintQuote Pro

> **World's Largest Hackathon Submission by [bolt.new](https://bolt.new)**

*Professional 3D printing quote calculator with AI-powered insights for accurate pricing and risk assessment*

[![Hackathon Badge](https://img.shields.io/badge/Hackathon-World's%20Largest-ff6b35?style=for-the-badge&logo=rocket)](https://bolt.new)
[![Built with](https://img.shields.io/badge/Built%20with-bolt.new-4285f4?style=for-the-badge&logo=google-chrome)](https://bolt.new)
[![React](https://img.shields.io/badge/React-18.x-61dafb?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript)](https://typescriptlang.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## 🎯 Hackathon Project Overview

**PrintQuote Pro** is my submission for the **World's Largest Hackathon** organized by **bolt.new**! This revolutionary 3D printing quote calculator combines cutting-edge AI insights with professional-grade cost analysis to solve real-world pricing challenges in the 3D printing industry.

### 🏆 Why This Project Stands Out
- **🤖 AI-Powered Risk Assessment**: First-of-its-kind failure prediction system
- **💰 Accurate Cost Modeling**: Professional-grade pricing calculations
- **📊 Smart Analytics**: Real-time insights and recommendations
- **🎨 Modern UI/UX**: Stunning interface with dark/light mode support
- **📱 Mobile-First**: Responsive design that works everywhere
- **⚡ Lightning Fast**: Built with Vite for optimal performance

---

## ✨ Features That Make a Difference

### 🔧 Core Functionality
- **📐 Precise Cost Calculations**: Material, power, labor, maintenance, and overhead costs
- **🧠 AI Risk Assessment**: Intelligent print failure prediction with actionable recommendations
- **🔄 Smart Material Suggestions**: Alternative filament recommendations with cost comparisons
- **📄 Professional Exports**: Beautiful PDF quotes and shareable links
- **💾 Quote Management**: Save, organize, and retrieve quotes with full history
- **📱 Universal Access**: Fully responsive design optimized for all devices

### 🎨 User Experience
- **🌙 Theme Support**: Elegant dark/light mode toggle
- **⚡ Real-time Updates**: Instant calculations as you type
- **🎯 Intuitive Interface**: Clean, professional design using shadcn/ui
- **📊 Visual Analytics**: Charts and graphs for better insights
- **🔍 Advanced Search**: Quick quote lookup and filtering

### 🚀 Technical Excellence
- **⚡ Performance**: Optimized bundle with code splitting
- **🔒 Type Safety**: Full TypeScript implementation
- **📈 Analytics**: Comprehensive user behavior tracking
- **🌐 SEO Optimized**: Full meta tags, structured data, and sitemap
- **♿ Accessibility**: WCAG compliant with keyboard navigation

---

## 🛠️ Tech Stack & Architecture

### Frontend Powerhouse
```
🔧 Framework: React 18 + TypeScript + Vite
🎨 Styling: Tailwind CSS + shadcn/ui components
📊 Charts: Recharts for beautiful data visualization
🎭 Icons: Lucide React (1000+ icons)
🎯 State: React Hooks + Context for clean state management
```

### Optional Integrations
```
🗄️ Database: Supabase (PostgreSQL) with real-time subscriptions
📊 Analytics: Google Analytics 4 + Hotjar heatmaps
📧 Email: EmailJS for quote sharing
🔒 Auth: Supabase Auth (ready for multi-user)
```

### Development Tools
```
⚡ Build: Vite with HMR and optimized production builds
🧪 Linting: ESLint + Prettier for code quality
📦 Package Manager: npm with lock file optimization
🔍 TypeScript: Strict mode with comprehensive type checking
```

---

## 🚀 Quick Start Guide

### 1. Clone & Install
```bash
# Clone the repository
git clone https://github.com/btkcodedev/printquote-pro.git
cd printquote-pro

# Install dependencies
npm install
```

### 2. Environment Setup
```bash
# Copy environment template
cp .env.example .env.local
```

**Minimal Setup (No Database Required):**
```env
VITE_APP_NAME=PrintQuote Pro
VITE_ENABLE_AI_INSIGHTS=true
VITE_MOCK_DATA=true
VITE_ENABLE_DATABASE=false
```

**Full Setup (Optional Database & Analytics):**
```env
# Core Settings
VITE_APP_NAME=PrintQuote Pro
VITE_ENABLE_AI_INSIGHTS=true
VITE_MOCK_DATA=false

# Database (Optional)
VITE_ENABLE_DATABASE=true
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Analytics (Optional)
VITE_ENABLE_ANALYTICS=true
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
VITE_HOTJAR_ID=your_hotjar_id
```

### 3. Launch Development Server
```bash
# Start the development server
npm run dev

# Open http://localhost:5173 in your browser
```

### 4. Build for Production
```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

---

## 🗄️ Database Setup (Optional but Recommended)

### Supabase Integration
1. **Create Project**: Visit [supabase.com](https://supabase.com) and create a new project
2. **Run Migrations**: Execute the SQL in `/supabase/migrations/` folder
3. **Configure Environment**: Add your Supabase credentials to `.env.local`
4. **Enable Features**: Set `VITE_ENABLE_DATABASE=true`

### Database Schema
```sql
-- Quotes table for saving user quotes
quotes (
  id uuid primary key,
  name text,
  print_time integer,
  filament_type text,
  cost_breakdown jsonb,
  ai_insights jsonb,
  created_at timestamp,
  updated_at timestamp
)
```

**🎯 Pro Tip**: The app works perfectly without a database using intelligent mock data!

---

## 🌐 Deployment Options

### One-Click Deployments

#### Netlify
```bash
# Build command
npm run build

# Publish directory
dist
```

#### Vercel
```bash
# Framework preset: Vite
# Root directory: ./
# Build command: npm run build
# Output directory: dist
```

#### GitHub Pages
```bash
# Build and deploy to gh-pages branch
npm run build
npm run deploy
```

### Manual Deployment
1. Run `npm run build`
2. Upload `dist/` folder to your hosting service
3. Configure server to serve `index.html` for all routes (SPA)

---

## 🎨 Customization & Branding

### Theme Customization
```css
/* Update CSS variables in src/index.css */
:root {
  --primary: your-brand-color;
  --secondary: your-accent-color;
  /* Full customization available */
}
```

### Environment Configuration
```typescript
// Modify src/config/env.ts
export const env = {
  APP_NAME: process.env.VITE_APP_NAME || 'Your App Name',
  ENABLE_AI_INSIGHTS: process.env.VITE_ENABLE_AI_INSIGHTS === 'true',
  // Add your custom features
}
```

---

## 📊 Analytics & Performance

### Built-in Analytics
- **User Interactions**: Quote calculations, filament swaps, exports
- **Performance Metrics**: Load times, render performance
- **Conversion Tracking**: Quote completions, PDF downloads
- **Error Monitoring**: Comprehensive error tracking

### Performance Optimizations
- **Code Splitting**: Lazy loading for optimal bundle size
- **Image Optimization**: WebP support with fallbacks
- **Caching Strategy**: Aggressive caching for static assets
- **Bundle Analysis**: Webpack bundle analyzer included

---

## 🤝 Contributing to the Hackathon Project

I welcome contributions to make this hackathon project even better!

### How to Contribute
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Guidelines
- Follow the existing code style (ESLint + Prettier)
- Add TypeScript types for all new features
- Include tests for new functionality
- Update documentation as needed
- Keep commits atomic and well-described

---

## 📝 License & Attribution

**MIT License** - Created with ❤️ by [btkcodedev](https://github.com/btkcodedev)

This project was built for the **World's Largest Hackathon** by **bolt.new**. Feel free to use, modify, and distribute according to the MIT license.

---

## 🎯 Hackathon Judging Criteria

### Innovation & Creativity ✨
- **AI-Powered Risk Assessment**: Revolutionary failure prediction system
- **Smart Cost Modeling**: Industry-first comprehensive pricing calculator
- **Real-time Insights**: Dynamic recommendations and optimizations

### Technical Excellence 🛠️
- **Modern Architecture**: React 18 + TypeScript + Vite
- **Performance Optimized**: Lightning-fast load times and interactions
- **Scalable Design**: Modular architecture ready for enterprise use

### User Experience 🎨
- **Intuitive Interface**: Clean, professional design
- **Mobile-First**: Responsive across all devices
- **Accessibility**: WCAG compliant with keyboard navigation

### Real-World Impact 🌍
- **Industry Problem**: Solves actual pricing challenges in 3D printing
- **Professional Grade**: Ready for commercial use
- **Cost Savings**: Helps businesses optimize their pricing strategies

---

## 🚀 Live Demo & Links

- **🌐 Live Demo**: [Your deployment URL]
- **📹 Demo Video**: [Your demo video]
- **📊 Project Stats**: [GitHub insights]
- **🐛 Issues**: [GitHub Issues](https://github.com/btkcodedev/printquote-pro/issues)

---

## 🏆 Hackathon Achievement

**"Built with bolt.new for the World's Largest Hackathon"**

This project represents the culmination of modern web development practices, AI integration, and user-centered design. It's not just a tool—it's a solution that addresses real industry challenges while showcasing cutting-edge technology.

**Vote for innovation. Vote for PrintQuote Pro! 🚀**

---

*Made with ❤️ and lots of ☕ by [btkcodedev](https://github.com/btkcodedev)*