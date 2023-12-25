import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16"
});

export async function POST(request) {
    if (request.method !== 'POST') {
        return new NextResponse("Method Not Allowed", { status: 405 });
    }

    try {
        const data = await request.json();
        const amount = data.amount;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Number(amount) * 100,
            currency: 'USD'
        });

        return new NextResponse(JSON.stringify({ client_secret: paymentIntent.client_secret }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error("Error creating payment intent:", error.message);
        return new NextResponse("Bad Request", { status: 400 });
    }
}
