# Xemory MVP

**Preserving the Essence of Human Connection**

Xemory is an AI-powered platform that captures and preserves the authentic essence of individuals through advanced facial expression analysis, psychological profiling, and relational AI personas.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database
- OpenAI API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ThePostleEffect/Xemory.git
cd Xemory
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create `.env` files in both `apps/api` and `apps/web`:

**apps/api/.env:**
```
PORT=3001
OPENAI_API_KEY=your_openai_api_key_here
DATABASE_URL=postgresql://user:password@localhost:5432/xemory
```

**apps/web/.env.local:**
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

4. **Set up the database**
```bash
cd prisma
npx prisma migrate dev --name init
npx prisma generate
```

5. **Run the development servers**
```bash
# From the root directory
npm run dev
```

This will start:
- Frontend (Next.js): http://localhost:3000
- Backend (Express): http://localhost:3001

## 📁 Project Structure

```
Xemory/
├── apps/
│   ├── web/          # Next.js frontend
│   │   ├── app/      # Next.js app router pages
│   │   ├── components/  # React components
│   │   └── lib/      # Utility functions
│   └── api/          # Express backend
│       └── src/
│           └── index.ts  # API server
├── packages/
│   ├── sdk/          # Shared TypeScript types
│   ├── config/       # Shared configs
│   └── ui/           # Shared UI components
├── prisma/
│   └── schema.prisma # Database schema
├── docs/             # Documentation
└── infra/            # Deployment configs
```

## 🎯 Key Features

### VCR (Video for Creating Emotional Response)
- Generational video experiences (Silent Gen, Boomers, Gen X, Millennials, Gen Z)
- Real-time facial expression capture
- Psychological profiling through emotional responses
- Jump scare finale for authentic surprise capture

### Relational Persona AI
- Core persona based on questionnaire + VCR data
- Multiple relational sub-personas (how they act with different people)
- Context-aware conversations
- Powered by GPT-4

### Data Collection
- Facial expression analysis (face-api.js)
- Guided memory interviews
- Authenticity calibration
- Digital Will permissions system

## 🛠️ Development

### Frontend (Next.js)
```bash
cd apps/web
npm run dev
```

### Backend (Express)
```bash
cd apps/api
npm run dev
```

### Database Migrations
```bash
cd prisma
npx prisma migrate dev --name your_migration_name
npx prisma studio  # Open database GUI
```

## 📝 TODO for MVP

- [ ] Integrate face-api.js for facial detection
- [ ] Create VCR video content (5 generational versions)
- [ ] Build questionnaire flow
- [ ] Implement persona generation prompts
- [ ] Add chat interface
- [ ] Set up database with Prisma
- [ ] Create authentication system
- [ ] Deploy to production

## 🔐 Environment Variables

### API (.env)
- `PORT` - API server port (default: 3001)
- `OPENAI_API_KEY` - Your OpenAI API key
- `DATABASE_URL` - PostgreSQL connection string

### Web (.env.local)
- `NEXT_PUBLIC_API_URL` - Backend API URL

## 📚 Documentation

See the `/docs` folder for:
- Architecture blueprint
- Data collection playbook
- Ethical charter
- Product requirements

## 🤝 Contributing

This is currently a private MVP project. If you're part of the team, please follow the development workflow:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

Proprietary - All rights reserved

## 🙏 Acknowledgments

Built with:
- Next.js 15
- Express
- OpenAI GPT-4
- Prisma
- face-api.js
- Tailwind CSS

---

**Xemory** - Preserving the essence of human connection through AI

