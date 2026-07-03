import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { beatId, title, priceUsd, licenseType } = body;
        
        console.log(`[Stripe API] Processando pagamento de ${priceUsd} USD para a licença ${licenseType} do Beat: ${title}`);

        /* 
          Implementação Real do Stripe Checkout (Requer chave secreta no .env)
          -------------------------------------------------------------------
          const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
          const session = await stripe.checkout.sessions.create({
              payment_method_types: ['card', 'pix'],
              line_items: [{
                  price_data: {
                      currency: 'usd',
                      product_data: { name: `AWPLACE License - ${title} (${licenseType})` },
                      unit_amount: Math.round(priceUsd * 100), // Em centavos
                  },
                  quantity: 1,
              }],
              mode: 'payment',
              success_url: `${process.env.NEXT_PUBLIC_URL}/studio?checkout_success=true&beatId=${beatId}`,
              cancel_url: `${process.env.NEXT_PUBLIC_URL}/`,
          });
          return NextResponse.json({ url: session.url });
        */

        // Simulador para o ambiente local sem credenciais
        const mockStripeUrl = `http://localhost:3000/studio?checkout_success=true&beatId=${beatId}`;
        
        return NextResponse.json({ url: mockStripeUrl });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
