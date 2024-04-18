import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { StripeService } from 'src/stripe/stripe.service';
import { StripeController } from 'src/stripe/stripe.controller';
import Stripe from 'stripe';
import { APP_URL } from 'test/utils/constants';

describe('StripeController', () => {
    const app = APP_URL;

    let controller: StripeController;
    let service: StripeService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [StripeController],
        providers: [StripeService],
      }).compile();
  
      controller = module.get<StripeController>(StripeController);
      service = module.get<StripeService>(StripeService);
    });
  describe('GET /stripe/products', () => {
    it('should return products from StripeService', async () => {
      const products = [{ id: 'product1', name: 'Product 1' }];
      jest.spyOn(service, 'getProducts').mockResolvedValue(products as Stripe.Product[]);

      await request(app)
        .get('/stripe/products')
        .expect(200)
        .expect(products);
    });
  });

  describe('GET /stripe/customers', () => {
    it('should return customers from StripeService', async () => {
      const customers = [{ id: 'customer1', name: 'Customer 1' }];
      jest.spyOn(service, 'getCustomers').mockResolvedValue(customers as Stripe.Customer[]);

      await request(app)
        .get('/stripe/customers')
        .expect(200)
        .expect(customers);
    });
  });

  describe('POST /stripe/checkout', () => {
    it('should call checkout method from StripeService with provided ids', async () => {
      const ids = ['product1', 'product2'];
      const response = { url: 'checkout_url' };
      jest.spyOn(service, 'checkout').mockResolvedValue(response);

      await request(app)
        .post('/stripe/checkout')
        .send({ ids })
        .expect(200)
        .expect(response);
    });
  });

  describe('POST /stripe/webhook', () => {
    it('should call webhook method from StripeService with provided body and signature', async () => {
      const body = { event: 'event_data' };
      const signature = 'signature';
      const response = 'Success';
      jest.spyOn(service, 'webhook').mockResolvedValue(response);

      await request(controller.webhook)
        .post('/stripe/webhook')
        .set('Stripe-Signature', signature)
        .send(body)
        .expect(200)
        .expect(response);
    });
  });
});
