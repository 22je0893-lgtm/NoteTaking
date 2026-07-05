# ---------------- Builder Stage ----------------
    FROM node:22-alpine AS builder

    WORKDIR /app
    
    # Copy dependency files
    COPY package*.json ./
    
    # Install all dependencies (including devDependencies)
    RUN npm ci
    
    # Copy source code
    COPY . .
    
    # Compile TypeScript
    RUN npm run build
    
    
    # ---------------- Runtime Stage ----------------
    FROM node:22-alpine
    
    WORKDIR /app
    
    # Copy package files
    COPY package*.json ./
    
    # Install only production dependencies
    RUN npm ci --omit=dev
    
    # Copy compiled JavaScript
    COPY --from=builder /app/dist ./dist
    
    # Application port
    EXPOSE 3000
    
    CMD ["npm", "start"]