# Deployment Guide

## Local Development Setup

### Quick Start
```bash
# Install all dependencies
npm install

# Set up environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Update .env files with your configuration

# Start MongoDB
mongod

# Run development server
npm run dev
```

## Docker Deployment

### Create Dockerfile for Backend
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY shared ./shared
COPY backend ./backend

RUN npm ci --omit=dev

WORKDIR /app/backend

EXPOSE 3001

CMD ["npm", "start"]
```

### Create Dockerfile for Frontend
```dockerfile
FROM node:18-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY shared ./shared
COPY frontend ./frontend

RUN npm ci

WORKDIR /app/frontend

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    environment:
      MONGO_INITDB_DATABASE: contentpulse

  backend:
    build: ./backend
    ports:
      - "3001:3001"
    depends_on:
      - mongodb
    environment:
      NODE_ENV: production
      MONGODB_URI: mongodb://mongodb:27017/contentpulse
      PORT: 3001
    volumes:
      - ./backend/.env:/app/backend/.env

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    environment:
      VITE_API_URL: http://backend:3001/api
      VITE_WS_URL: ws://backend:3001

volumes:
  mongodb_data:
```

## Cloud Deployment

### AWS Deployment

#### EC2 Setup
```bash
# Connect to EC2 instance
ssh -i your-key.pem ec2-user@your-instance-ip

# Install Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18

# Install MongoDB
sudo yum install -y mongodb-org
sudo systemctl start mongod

# Clone repository
git clone your-repo-url
cd contentpulse

# Install dependencies
npm install

# Set environment variables
nano backend/.env
nano frontend/.env

# Build
npm run build

# Start with PM2
npm install -g pm2
pm2 start backend/dist/index.js --name "contentpulse-backend"
pm2 startup
pm2 save
```

#### RDS for MongoDB
- Create MongoDB cluster in AWS DocumentDB
- Update `MONGODB_URI` in backend .env
- Configure security groups for access

#### S3 for Static Files
```bash
# Build frontend
npm run build:frontend

# Upload to S3
aws s3 sync frontend/dist s3://your-bucket-name/

# Set CloudFront distribution to serve from S3
```

### Heroku Deployment

```bash
# Install Heroku CLI
brew install heroku

# Login
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set OPENAI_API_KEY=your_key

# Add MongoDB addon
heroku addons:create mongolab:sandbox

# Deploy
git push heroku main
```

### Vercel Deployment (Frontend)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

## Production Checklist

- [ ] MongoDB backup strategy configured
- [ ] SSL/HTTPS certificates installed
- [ ] Environment variables securely configured
- [ ] Rate limiting implemented
- [ ] CORS properly configured
- [ ] Logging and monitoring set up
- [ ] Authentication implemented
- [ ] API documentation updated
- [ ] Database indices optimized
- [ ] Error handling tested
- [ ] Load testing completed
- [ ] Security audit performed
- [ ] CDN configured for frontend
- [ ] Database replication/clustering set up

## Monitoring

### Application Monitoring
- Set up New Relic or DataDog
- Configure error tracking with Sentry
- Set up uptime monitoring

### Database Monitoring
- Monitor MongoDB performance
- Set up automated backups
- Configure alerts for storage limits

### Log Management
- Centralize logs with ELK stack or Cloud Logging
- Set up log retention policies
- Configure log-based alerts

## Scaling

### Horizontal Scaling
- Use load balancer (AWS ELB, Nginx)
- Deploy multiple backend instances
- Use MongoDB replica set

### Vertical Scaling
- Increase server resources
- Optimize database queries
- Implement caching layer (Redis)

## Security

### SSL/HTTPS
```bash
# Generate self-signed certificate (development)
openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365

# Use Let's Encrypt (production)
sudo certbot certonly --standalone -d yourdomain.com
```

### Environment Variables
- Never commit `.env` files
- Use secure vaults for secrets
- Rotate API keys regularly

### API Security
- Implement authentication (JWT)
- Add rate limiting
- Validate all inputs
- Use CORS whitelist
- Enable HTTPS only

### Database Security
- Use strong MongoDB credentials
- Enable authentication in MongoDB
- Use network segmentation
- Regular backups and recovery testing

## Performance Optimization

### Backend
- Enable gzip compression
- Implement caching (Redis)
- Optimize database queries
- Use connection pooling
- Implement pagination

### Frontend
- Code splitting with Vite
- Image optimization
- Lazy loading
- Minification and bundling
- CDN distribution

### Database
- Create appropriate indices
- Archive old data
- Use aggregation pipeline
- Monitor query performance

## Backup Strategy

### Automated Backups
```bash
# MongoDB backup
mongodump --uri "mongodb://localhost:27017/contentpulse" --out /backups/

# Restore from backup
mongorestore --uri "mongodb://localhost:27017/contentpulse" /backups/
```

### Cloud Backup
- Enable AWS DocumentDB automated backups
- Configure retention period
- Test restore procedures

## Rollback Plan

```bash
# Keep previous Docker images tagged
docker tag contentpulse-backend:latest contentpulse-backend:v1.0.0

# Rollback to previous version
docker run -d contentpulse-backend:v1.0.0
```

## Post-Deployment Testing

- [ ] Test all API endpoints
- [ ] Verify analytics sync
- [ ] Check report generation
- [ ] Test WebSocket connections
- [ ] Validate frontend functionality
- [ ] Performance load testing
- [ ] Security penetration testing
- [ ] User acceptance testing

## Support & Maintenance

### Regular Tasks
- Monitor application logs
- Review error rates
- Update dependencies monthly
- Optimize slow queries
- Review and archive old data

### Emergency Response
- Establish on-call rotation
- Document incident procedures
- Maintain rollback procedures
- Test disaster recovery

## Cost Optimization

- Use spot instances for non-critical workloads
- Implement auto-scaling
- Archive old analytics data
- Optimize storage usage
- Use reserved instances for baseline load
