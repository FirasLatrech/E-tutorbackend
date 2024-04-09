import { Inject, Injectable } from '@nestjs/common';
import { CoursesService } from 'src/courses/course.service';

import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    @Inject('STRIPE_API_KEY') private readonly apiKey: string,
    private courseService: CoursesService,
  ) {
    this.stripe = new Stripe(
      'sk_test_51P2gF0I1E43qi5XiTIjeymtLdxpK2ae6yx89ZiMx9oEZLG36GdBKuuB6tptngioRgDBRxtebejTEDyNCw2ibFshd00ZMuYxK6F',
      {
        apiVersion: '2023-10-16', // Use whatever API latest version
      },
    );
  }

  async getProducts(): Promise<Stripe.Product[]> {
    const products = await this.stripe.products.list();

    return products.data;
  }
  async webhook(body, signature) {
    let event: Stripe.Event;

    try {
      event = await this.stripe.webhooks.constructEvent(
        body,
        signature,
        'whsec_7e2e109ecf9e95ca4a19501c268330dceb6e30304f0d1d9d11fe1dd4ef72b66c',
      );
      console.log('event : ', event);
    } catch (error: any) {
      console.error(error);
      return 'Error';
    }

    const session = event.data.object as Stripe.Checkout.Session;
    console.log(session, 'session✨✨✨✨✨✨✨✨✨✨');
    if (event.type === 'checkout.session.completed') {
      // Your success logic here

      return 'Success';
    }
  }
  async getCustomers() {
    const customers = await this.stripe.customers.list({});
    return customers.data;
  }
  async checkout(ids: string[]) {
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    const products = await this.courseService.findCoursesByIds(ids);

    products.forEach((product) => {
      line_items.push({
        quantity: 1,
        price_data: {
          currency: 'USD',
          product_data: {
            name: product.title,
          },
          unit_amount: Number(product.course_price) * 100,
        },
      });
    });
    const session = await this.stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      // billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      success_url: `http://localhost:5173/cart?success=1`,
      cancel_url: `http://localhost:5173/cart?canceled=1`,
    });

    return {
      url: session.url,
    };
  }

  async createPaymentInterne() {
    const result = await this.stripe.paymentIntents.create({
      amount: 2000,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return result;
  }
}
