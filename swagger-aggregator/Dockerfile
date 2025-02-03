# Use Node.js 22 Alpine
FROM node:22-alpine

RUN apk add --no-cache curl

# Enable Corepack to use pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and pnpm lockfile first for efficient caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm (without installing devDependencies)
RUN pnpm install --frozen-lockfile --prod

# Copy the entire application source code
COPY . .

# Expose the port (if required)
EXPOSE 4000

# Start the aggregation service
CMD ["pnpm", "start"]
