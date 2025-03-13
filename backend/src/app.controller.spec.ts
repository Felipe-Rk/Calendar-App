import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('/status', () => {
    it('should return API status', () => {
      const status = appController.getStatus(); // Supondo que você tenha esse método no seu AppController
      expect(status).toHaveProperty('status', 'OK');
      expect(status).toHaveProperty('timestamp');
      expect(status).toHaveProperty('version', '1.0.0');
    });
  });
});
