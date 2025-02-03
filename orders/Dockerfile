# Use Node.js 22 Alpine (latest stable version)
FROM node:22-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package.json and lock file first (for caching dependencies)
COPY /orders/package.json ./orders/pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the entire app into the container
COPY ./orders .
COPY ../common ./common

# Expose the port NestJS runs on
EXPOSE 3001

# Run the NestJS app
CMD ["pnpm", "run", "start"]
