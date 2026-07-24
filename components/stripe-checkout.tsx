'use client'

import { useCallback } from 'react'
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { startCheckoutSession } from '../app/actions/stripe'
import type { CartItem } from '@/lib/cart-store'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

interface StripeCheckoutProps {
  userEmail: string
  userName: string
  cartItems: CartItem[]
}

export function StripeCheckout({ userEmail, userName, cartItems }: StripeCheckoutProps) {
  const startCheckoutSessionForCart = useCallback(
    () => startCheckoutSession(cartItems, userEmail, userName),
    [cartItems, userEmail, userName],
  )

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ clientSecret: startCheckoutSessionForCart }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
