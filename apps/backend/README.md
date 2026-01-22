# Lumenpulse Backend

A modern Next.js backend service built with TypeScript, App Router, and professional development tooling.

## 🚀 Features

- **Next.js 16** with App Router
- **TypeScript** for type safety
- **ESLint + Prettier** for code quality
- **Jest** for testing
- **Environment configuration** with `.env.example`
- **Health check endpoint** for monitoring
- **API routes** structure ready for expansion

## 📋 Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

## 🛠️ Installation

1. **Clone and navigate to the backend directory:**
   ```bash
   cd app/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your specific configuration values.

## 🚀 Development

### Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The server will start on `http://localhost:3001` (or your configured PORT).

### Available Scripts:

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run type-check` | Run TypeScript type checking |
| `npm run test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage |
| `npm run clean` | Clean build artifacts |

## 📡 API Endpoints

### Health Check
- **GET** `/api/health` - Health check endpoint
- **POST** `/api/health` - Health check endpoint (POST)

**Response:**
```json
{
  "ok": true,
  "service": "backend",
  "timestamp": "2024-01-20T10:30:00.000Z",
  "uptime": 123.45,
  "version": "0.1.0"
}
```

## 🔧 Configuration

### Environment Variables

Key environment variables (see `.env.example` for complete list):

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Node environment | `development` |
| `PORT` | Server port | `3001` |
| `HOSTNAME` | Server hostname | `localhost` |
| `API_BASE_URL` | API base URL | `http://localhost:3001` |
| `CORS_ORIGIN` | CORS origin | `http://localhost:3000` |
| `LOG_LEVEL` | Logging level | `info` |

### TypeScript Configuration

- Strict mode enabled
- Path aliases configured (`@/*` → `src/*`)
- Next.js type checking

### ESLint & Prettier

- ESLint with Next.js recommended rules
- Prettier for consistent formatting
- Pre-commit hooks recommended

## 🧪 Testing

### Run all tests:
```bash
npm test
```

### Run tests in watch mode:
```bash
npm run test:watch
```

### Generate coverage report:
```bash
npm run test:coverage
```

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── health/
│   │       └── route.ts      # Health check endpoint
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── lib/                      # Utility functions
├── types/                    # TypeScript type definitions
└── middleware.ts             # Next.js middleware (optional)
```

## 🔍 Code Quality

### Linting
```bash
npm run lint          # Check for linting issues
npm run lint:fix      # Auto-fix linting issues
```

### Formatting
```bash
npm run format        # Format all files
npm run format:check  # Check formatting
```

### Type Checking
```bash
npm run type-check    # TypeScript type checking
```

## 🚀 Deployment

### Build for production:
```bash
npm run build
```

### Start production server:
```bash
npm start
```

### Environment Setup for Production

1. Set `NODE_ENV=production`
2. Configure all required environment variables
3. Ensure proper CORS origins
4. Set up monitoring and logging

## 🤝 Contributing

Please read [CONTRIBUTOR_README.md](./CONTRIBUTOR_README.md) for detailed contribution guidelines.

## 📝 License

This project is part of the Lumenpulse ecosystem.

## 🆘 Troubleshooting

### Common Issues:

1. **Port already in use:**
   - Change `PORT` in `.env.local`
   - Kill existing process: `lsof -ti:3001 | xargs kill`

2. **TypeScript errors:**
   - Run `npm run type-check`
   - Ensure all dependencies are installed

3. **ESLint errors:**
   - Run `npm run lint:fix`
   - Check `.eslintrc.json` configuration

4. **Environment variables not working:**
   - Ensure `.env.local` exists
   - Restart development server after changes
   - Check variable names match `.env.example`

### Getting Help:

- Check the [Next.js documentation](https://nextjs.org/docs)
- Review existing issues in the repository
- Contact the development team

## 📊 Monitoring

### Health Check

Monitor the health endpoint:
```bash
curl http://localhost:3001/api/health
```

### Logs

Development logs are shown in the console. For production, consider implementing structured logging.

## 🔮 Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Authentication & Authorization
- [ ] Rate limiting
- [ ] API documentation (OpenAPI/Swagger)
- [ ] Integration with Soroban
- [ ] Caching layer
- [ ] Background jobs
- [ ] Monitoring & alerting
