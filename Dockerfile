# Use the official Node.js
FROM node:18-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install 

# Copy the entire project to the working directory
COPY . .

# Build the Next.js application
RUN yarn build

# Start a new stage for the production image
# Production image, copy all the files and run next
FROM node:18-alpine AS runner

# Set the working directory in the container
WORKDIR /app

# Copy the built application from the previous stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY . .

# Install production dependencies
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Run the Next.js application in production mode
CMD ["npm", "run", "dev"]


