import { Card, CardContent } from "@/components/ui/card"
import { Store, Shield, Truck, HeadphonesIcon } from "lucide-react"

export default function AboutPage() {
  const features = [
    {
      icon: Store,
      title: "Premium Quality",
      description: "We curate only the finest products from trusted brands worldwide.",
    },
    {
      icon: Shield,
      title: "Secure Shopping",
      description: "Your data is protected with industry-leading security measures.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Get your orders delivered quickly with our reliable shipping partners.",
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      description: "Our customer service team is always here to help you.",
    },
  ]

  return (
    <div className="container py-12 space-y-12">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-balance">{"About My Store"}</h1>
        <p className="text-lg text-muted-foreground text-pretty">
          {
            "We're passionate about bringing you the best shopping experience with premium products, exceptional service, and unbeatable value."
          }
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">{"Our Story"}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {
                  "Founded in 2024, My Store began with a simple mission: to make premium products accessible to everyone. We carefully select each item in our catalog, ensuring it meets our high standards for quality, design, and value."
                }
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {
                  "Today, we serve thousands of satisfied customers worldwide, offering everything from the latest electronics to fashion-forward clothing and accessories. Our commitment to excellence drives everything we do."
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <Card key={feature.title}>
              <CardContent className="p-6 space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
