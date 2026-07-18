"use client"

import { use } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Package, Truck, CheckCircle, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useOrderStore } from "@/lib/order-store"
import { notFound } from "next/navigation"

export default function OrderTrackingPage({
  params,
}: {
  params: Promise<{ orderId: string }>
}) {
  const { orderId } = use(params)
  const { getOrder } = useOrderStore()
  const order = getOrder(orderId)

  if (!order) {
    notFound()
  }

  const statusSteps = [
    { id: "pending", label: "Order Placed", icon: Package },
    { id: "processing", label: "Processing", icon: Package },
    { id: "shipped", label: "Shipped", icon: Truck },
    { id: "delivered", label: "Delivered", icon: CheckCircle },
  ]

  const currentStepIndex = statusSteps.findIndex((step) => step.id === order.status)

  return (
    <div className="container py-8 max-w-4xl">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/orders">
          <ChevronLeft className="h-4 w-4 mr-2" />
          {"Back to Orders"}
        </Link>
      </Button>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{"Order Tracking"}</h1>
          <p className="text-muted-foreground">
            {"Order"} {order.id}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{"Delivery Status"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted" />
              <div
                className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500"
                style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
              />

              <div className="relative flex justify-between">
                {statusSteps.map((step, index) => {
                  const Icon = step.icon
                  const isCompleted = index <= currentStepIndex

                  return (
                    <div key={step.id} className="flex flex-col items-center gap-2">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                          isCompleted
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-muted bg-background"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span
                        className={`text-xs font-medium text-center ${
                          isCompleted ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {order.trackingNumber && (
              <div className="mt-8 p-4 bg-muted rounded-lg">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-medium">{"Tracking Number"}</p>
                    <p className="font-mono text-sm">{order.trackingNumber}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {"Estimated delivery: "}
                      {new Date(order.estimatedDelivery).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{"Shipping Address"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-sm">
              <p className="font-medium">{order.shippingAddress.fullName}</p>
              <p className="text-muted-foreground">{order.shippingAddress.address}</p>
              <p className="text-muted-foreground">
                {order.shippingAddress.city}
                {", "}
                {order.shippingAddress.state} {order.shippingAddress.zipCode}
              </p>
              <p className="text-muted-foreground">{order.shippingAddress.country}</p>
              <p className="text-muted-foreground mt-2">{order.shippingAddress.phone}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{"Order Items"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {"Quantity: "}
                    {item.quantity}
                  </p>
                  <p className="text-sm font-medium">
                    {"$"}
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

            <Separator />

            <div className="flex justify-between text-lg font-bold">
              <span>{"Total"}</span>
              <span>
                {"$"}
                {order.totalAmount.toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
