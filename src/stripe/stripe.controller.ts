import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller({
  path: 'stripe',
  version: '1',
})
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Get('products')
  async getProducts() {
    return await this.stripeService.createPaymentInterne();
  }

  @Get('customers')
  async getCustomers() {
    return await this.stripeService.getProducts();
  }
  @Post('checkout')
  async checkout(@Body() ids: string[]) {
    return await this.stripeService.checkout(ids);
    // return await this.stripeService.getCustomers();
  }
  @Post('webhook')
  async webhook(@Req() req, @Headers() headers, @Body() body) {
    const signature = headers['Stripe-Signature'] as string;
    console.log(signature, 'signature');
    return await this.stripeService.webhook(body, signature);
    // return await this.stripeService.getCustomers();
  }
}
