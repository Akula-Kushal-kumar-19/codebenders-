import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import cron from 'node-cron';
import WebSocket from 'ws';
import http from 'http';

import config from './config';
import logger from './utils/logger';
import apiRoutes from './routes';
import { errorHandler, requestLogger, corsHandler, notFound } from './middleware/errorHandler';
import {
  AnalyticsAggregationService,
  ReportGenerationService,
} from './services';

class App {
  private app: Express;
  private server: http.Server;
  private wss: WebSocket.Server;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.wss = new WebSocket.Server({ server: this.server });

    this.setupMiddleware();
    this.setupRoutes();
    this.setupWebSocket();
    this.setupScheduledTasks();
    this.setupErrorHandling();
  }

  private setupMiddleware() {
    // Security
    this.app.use(helmet());

    // CORS
    this.app.use(cors());

    // Body parsing
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ limit: '10mb', extended: true }));

    // Logging
    this.app.use(requestLogger);
  }

  private setupRoutes() {
    // API routes
    this.app.use('/api', apiRoutes);

    // 404 handler
    this.app.use(notFound);
  }

  private setupWebSocket() {
    this.wss.on('connection', (ws: WebSocket) => {
      logger.info('WebSocket client connected');

      ws.on('message', (data: string) => {
        try {
          const message = JSON.parse(data);
          logger.debug('WebSocket message received:', message);

          // Handle different message types
          if (message.type === 'subscribe') {
            ws.send(JSON.stringify({
              type: 'subscribed',
              channel: message.channel,
              timestamp: new Date(),
            }));
          }
        } catch (error) {
          logger.error('WebSocket message error:', { error });
        }
      });

      ws.on('close', () => {
        logger.info('WebSocket client disconnected');
      });

      ws.on('error', (error: Event) => {
        logger.error('WebSocket error:', { error });
      });
    });
  }

  private setupScheduledTasks() {
    // Sync analytics every 6 hours
    cron.schedule('0 */6 * * *', async () => {
      logger.info('Running scheduled analytics sync...');
      try {
        await AnalyticsAggregationService.syncAllChannels();
      } catch (error) {
        logger.error('Error in scheduled analytics sync:', { error });
      }
    });

    // Generate report every 14 days
    cron.schedule('0 0 */14 * *', async () => {
      logger.info('Running scheduled report generation...');
      try {
        await ReportGenerationService.generateBiWeeklyReport();
        this.broadcastToClients({
          type: 'report_generated',
          timestamp: new Date(),
        });
      } catch (error) {
        logger.error('Error in scheduled report generation:', { error });
      }
    });

    logger.info('Scheduled tasks initialized');
  }

  private setupErrorHandling() {
    this.app.use(errorHandler);
  }

  public broadcastToClients(message: any) {
    const payload = JSON.stringify(message);
    this.wss.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });
  }



  async connect() {
    try {
      await mongoose.connect(config.MONGODB_URI);
      logger.info('✅ Connected to MongoDB');
    } catch (error) {
      logger.warn('⚠️  MongoDB connection failed - will use mock data');
      logger.error('Connection error:', { error });
      // Don't exit - continue with mock data
    }
  }

  private async seedDatabase() {
    try {
      const { ContentModel, AnalyticsModel } = require('./models');
      const { generateId } = require('./utils/helpers');

      // Try to count documents - will fail if MongoDB isn't connected
      let contentCount = 0;
      try {
        contentCount = await ContentModel.countDocuments();
      } catch (e) {
        logger.warn('⚠️ Cannot access database - skipping seed');
        return;
      }

      if (contentCount > 0) {
        logger.info('✅ Database already seeded.');
        return;
      }

      logger.info('Seeding database...');
      // Seed implementation here would go - for now just skip if DB not available
    } catch (error) {
      logger.error('Error seeding database:', { error });
    }
  }



  async start() {
    await this.connect();
    await this.seedDatabase();

    const tryPort = (port: number): Promise<void> => {
      return new Promise<void>((resolve, reject) => {
        this.server.once('error', (err: any) => {
          if (err.code === 'EADDRINUSE') {
            logger.warn(`Port ${port} is in use, trying port ${port + 1}`);
            // Create a new server instance
            this.server = http.createServer(this.app);
            this.wss = new WebSocket.Server({ server: this.server });
            tryPort(port + 1).then(resolve).catch(reject);
          } else {
            logger.error('Server error:', { error: err });
            reject(err);
          }
        });

        this.server.listen(port, () => {
          logger.info(`ContentPulse server running on port ${port}`);
          logger.info(`Environment: ${config.NODE_ENV}`);
          logger.info(`WebSocket server running on port ${port}`);
          resolve();
        });
      });
    };

    await tryPort(Number(config.PORT));

    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      logger.info('Shutting down gracefully...');
      await mongoose.disconnect();
      this.server.close(() => {
        logger.info('Server stopped');
        process.exit(0);
      });
    });
  }
}

export default App;

// Start the app if this is the main module
if (require.main === module) {
  const app = new App();
  app.start().catch(error => {
    logger.error('Failed to start application:', { error });
    process.exit(1);
  });
}
