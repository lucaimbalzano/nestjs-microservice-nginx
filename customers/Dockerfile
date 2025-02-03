# Use Node.js 22 Alpine (latest stable version)
FROM node:22-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package.json and lock file first (for caching dependencies)
COPY ./customers/package.json ./customers/pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the entire app into the container
COPY ./customers/ .
COPY ../common ./common

# Expose the port NestJS runs on
EXPOSE 3004

# Run the NestJS app
CMD ["pnpm", "run", "start"]
