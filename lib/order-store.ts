"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem } from "./cart-store"

export interface ShippingAddress {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface Order {
  id: string
  items: CartItem[]
  shippingAddress: ShippingAddress
  totalAmount: number
  status: "pending" | "processing" | "shipped" | "delivered"
  orderDate: string
  estimatedDelivery: string
  trackingNumber?: string
}

interface OrderStore {
  orders: Order[]
  createOrder: (items: CartItem[], shippingAddress: ShippingAddress, totalAmount: number) => Order
  updateOrderStatus: (orderId: string, status: Order["status"]) => void
  getOrder: (orderId: string) => Order | undefined
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      createOrder: (items, shippingAddress, totalAmount) => {
        const order: Order = {
          id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          items,
          shippingAddress,
          totalAmount,
          status: "pending",
          orderDate: new Date().toISOString(),
          estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          trackingNumber: `TRK${Date.now().toString().slice(-8)}`,
        }
        set((state) => ({
          orders: [order, ...state.orders],
        }))
        return order
      },
      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((order) => (order.id === orderId ? { ...order, status } : order)),
        }))
      },
      getOrder: (orderId) => {
        return get().orders.find((order) => order.id === orderId)
      },
    }),
    {
      name: "order-storage",
    },
  ),
)
