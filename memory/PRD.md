# AccessJustice.Global - Product Requirements Document

## Original Problem Statement
Build AccessJustice.Global - a General Purpose AI (GPAI) justice platform that:
- Provides free AI-powered legal guidance for citizens in simple language
- Offers downloadable legal templates
- Connects users to verified lawyers (subscription model)
- Includes a Justice Wallet subsidy fund
- Builds a multilingual legal knowledge base

## User Personas

### 1. Citizens (Primary Users)
- Need quick, understandable legal guidance
- Looking for free/low-cost legal resources
- May need to connect with lawyers for complex issues
- May not be able to afford full legal fees (Justice Wallet candidates)

### 2. Lawyers
- Seeking new clients and digital presence
- Want efficient AI tools for case analysis
- Looking for subscription-based lead generation
- Areas: Family Law, Criminal, Corporate, etc.

### 3. NGOs & Donors
- Want to fund access-to-justice initiatives
- Need transparent impact reporting
- Looking for scalable legal aid solutions

### 4. Governments & Bar Associations
- Need access-to-justice data and dashboards
- Want to support SDG 16 goals
- Looking for ethical AI adoption frameworks

## Core Requirements

### Authentication
- [x] JWT-based email/password authentication
- [x] Google OAuth via Emergent Auth
- [x] Protected routes for authenticated features

### AI Legal Assistant
- [x] Chat interface with GPT-5.2 integration
- [x] Topic selection (Housing, Employment, Police, Family, Contracts, Business)
- [x] Session-based conversation history
- [x] Legal disclaimer prominently displayed

### Legal Templates
- [x] Template listing with categories
- [x] Download functionality
- [x] Seeded templates: Tenancy, Complaint, Affidavit, Employment, Petition

### Lawyer Features
- [x] Lawyer registration form with bar verification
- [x] Practice area selection
- [x] Profile management (pending verification workflow)
- [ ] Mock subscription payment (deferred)

### Justice Wallet
- [x] Application form for subsidized legal help
- [x] Income level selection
- [x] Case description submission

### Contact & Partnerships
- [x] Contact form with multiple inquiry types
- [x] Partnership interest forms for NGOs and Governments

## Architecture

### Backend (FastAPI)
- MongoDB for data storage
- JWT + Session-based authentication
- OpenAI GPT-5.2 via emergentintegrations library
- RESTful API with /api prefix

### Frontend (React)
- Shadcn UI components
- Tailwind CSS styling
- React Router for navigation
- Responsive mobile-first design

### Key API Endpoints
- `/api/auth/*` - Authentication
- `/api/chat` - AI Legal Assistant
- `/api/templates` - Legal Templates
- `/api/lawyers/*` - Lawyer management
- `/api/contact` - Contact submissions
- `/api/justice-wallet/*` - Wallet applications
- `/api/stats` - Platform statistics

## What's Been Implemented (March 2026)

### Pages Completed
1. Home - Hero, 3 CTAs, How It Works, Justice Wallet, Impact Stats
2. Get Legal Help - Templates, Justice Wallet application, FAQ
3. For Lawyers - Benefits, subscription info, registration
4. For NGOs & Donors - Partnership info, Justice Wallet funding
5. For Governments - SDG alignment, policy dashboards
6. AI Legal Assistant - Chat interface with GPT-5.2
7. Contact - Contact form, categorized FAQs
8. About - Mission, vision, founder, partners
9. How It Works - Step-by-step guides
10. Login/Register - Both email and Google OAuth
11. Dashboard - User-specific quick actions

### Design System
- Emerald (#047A6C) primary
- Gold (#E5C67A) accent
- Playfair Display headings
- Inter body text
- Mobile-first responsive

## Prioritized Backlog

### P0 (Critical)
- All implemented ✓

### P1 (High Priority)
- [ ] Email notifications for lawyer verification
- [ ] Admin dashboard for approvals
- [ ] Stripe payment integration for subscriptions

### P2 (Medium Priority)
- [ ] Multilingual support (French, Portuguese, Hausa)
- [ ] PDF generation for templates
- [ ] Lawyer booking/scheduling
- [ ] Chat history export

### P3 (Nice to Have)
- [ ] Video explainer on homepage
- [ ] Mobile app (React Native)
- [ ] Legal document OCR analysis
- [ ] Community forum

## Next Tasks
1. Implement Stripe payment for lawyer subscriptions
2. Add admin dashboard for lawyer verification
3. Email notifications via SendGrid
4. Multilingual support starting with French
