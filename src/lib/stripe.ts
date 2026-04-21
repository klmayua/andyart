import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
  typescript: true,
});

export const calculateStripeAmount = (price: number): number => {
  // Stripe expects amount in cents/smallest currency unit
  return Math.round(price * 100);
};

export const createCheckoutSession = async ({
  artworkId,
  title,
  price,
  image,
  successUrl,
  cancelUrl,
}: {
  artworkId: string;
  title: string;
  price: number;
  image: string;
  successUrl: string;
  cancelUrl: string;
}) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: title,
            images: [image],
            metadata: {
              artworkId,
            },
          },
          unit_amount: calculateStripeAmount(price),
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      artworkId,
    },
  });

  return session;
};
