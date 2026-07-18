"use client"

import Link from "next/link"
import { Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useOrderStore } from "@/lib/order-store"

export default function OrdersPage() {
  const { orders } = useOrderStore()

  if (orders.length === 0) {
    return (
      <div className="container py-16">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
            <Package className="h-16 w-16 text-muted-foreground" />
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold">{"No orders yet"}</h2>
              <p className="text-muted-foreground">{"Start shopping to see your orders here"}</p>
            </div>
            <Button asChild>
              <Link href="/">{"Start Shopping"}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary"
      case "processing":
        return "default"
      case "shipped":
        return "outline"
      case "delivered":
        return "default"
      default:
        return "secondary"
    }
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">{"Your Orders"}</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{"Order Number"}</p>
                  <p className="font-mono font-medium">{order.id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{"Order Date"}</p>
                  <p className="font-medium">{new Date(order.orderDate).toLocaleDateString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{"Status"}</p>
                  <Badge variant={getStatusColor(order.status)} className="capitalize">
                    {order.status}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{"Total"}</p>
                  <p className="font-bold">
                    {"$"}
                    {order.totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button asChild variant="default" className="flex-1">
                  <Link href={`/orders/${order.id}`}>{"Track Order"}</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1 bg-transparent">
                  <Link href="/">{"Shop Again"}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
