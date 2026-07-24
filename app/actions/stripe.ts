'use server'

import { stripe } from '../../lib/stripe'
import { products } from '../../lib/products'
import type { CartItem } from '../../lib/cart-store'

export async function startCheckoutSession(
  cartItems: CartItem[],
  userEmail: string,
  userName: string,
) {
  // Build line items from cart
  const lineItems = cartItems.map((item) => {
    const product = products.find((p) => p.id === item.id)
    if (!product) {
      throw new Error(`Product with id "${item.id}" not found`)
    }

    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.title,
          description: product.description,
        },
        unit_amount: product.priceInCents,
      },
      quantity: item.quantity,
    }
  })

  // Create Checkout Sessions from body params.
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    redirect_on_completion: 'never',
    line_items: lineItems,
    mode: 'payment',
    customer_email: userEmail,
  })

  return session.client_secret
}
