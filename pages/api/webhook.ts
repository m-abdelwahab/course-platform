import Stripe from 'stripe';
import { buffer } from 'micro';
import { prisma } from 'lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});


const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;


const handler = async (req, res) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);

      if (event.type === 'charge.succeeded') {
        const charge = event.data.object;
        // Handle successful charge
        await prisma.user.upsert({
          create: {
            email: charge.billing_details.email,
          },
          update: {
            email: charge.billing_details.email,
          },
          where: {
            email: charge.billing_details.email,
          },
        });
        res.status(200).send(`This works!`);
      } else {
        console.warn(`Unhandled event type: ${event.type}`);
      }
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
