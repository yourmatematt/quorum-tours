# Suggested Commands for Quorum Tours

## Development Server
```bash
npm run dev          # Start Next.js dev server (default port 3000)
```

## Build & Verification
```bash
npm run build        # Production build
npm run typecheck    # TypeScript type checking (tsc --noEmit)
npm run lint         # ESLint checking
```

## Production
```bash
npm run start        # Start production server (requires build first)
```

## System Commands (Windows)
```bash
# File operations
ls                   # List directory (Git Bash/WSL)
dir                  # List directory (CMD)
cp source dest       # Copy file (Git Bash)
copy source dest     # Copy file (CMD)

# Git
git status           # Check working tree status
git add .            # Stage all changes
git commit -m "msg"  # Commit with message
git log --oneline -5 # Recent commits

# Search
grep -r "pattern" .  # Search in files (Git Bash)
findstr /s "pattern" *.tsx  # Search in files (CMD)
```

## Verification Workflow
When completing a page/component:
1. `npm run typecheck` - Ensure no type errors
2. `npm run lint` - Check code style
3. `npm run dev` - Start server for visual QA
4. Browser verification at localhost:3000
