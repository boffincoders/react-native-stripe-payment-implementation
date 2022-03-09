import env from "dotenv";
// Replace if using a different env file or config.
env.config({ path: "./.env" });
import express from "express";
import cors from "cors";
import Stripe from "stripe";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//CREATE PAYMENT INTENT
app.post(
  "/create-payment-intent",
  async (req: express.Request, res: express.Response<any>) => {
    const {
      email,
      items,
      currency,
      request_three_d_secure,
      payment_method_types = [],
    }: {
      email: string;
      items: Order;
      currency: string;
      payment_method_types: string[];
      request_three_d_secure: "any" | "automatic";
    } = req.body;
    const stripe = new Stripe(process.env.secret_key as string, {
      apiVersion: "2020-08-27",
      typescript: true,
    });
    const customer = await stripe.customers.create({
      email: req.body.email,
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
    });
    // Create a PaymentIntent with the order amount and currency.
    const params: Stripe.PaymentIntentCreateParams = {
      amount: 3000,
      currency: "INR",
      customer: customer.id,
      payment_method_options: {
        card: {
          request_three_d_secure: request_three_d_secure || "automatic",
        },
        sofort: {
          preferred_language: "en",
        },
      },
      payment_method_types: payment_method_types,
    };
    console.log(params, "params");
    try {
      const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create(
        params
      );
      console.log(paymentIntent, "paymentIntent");

      // Send publishable key and PaymentIntent client_secret to client.
      return res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      return res.send({
        error: error.raw.message,
      });
    }
  }
);

app.listen(5000, (): void =>
  console.log(`Node server listening on port ${5000}!`)
);
