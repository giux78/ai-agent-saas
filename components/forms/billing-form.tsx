"use client"

import * as React from "react"

import { UserSubscriptionPlan } from "types"
import { cn, formatDate } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/shared/icons"
import Link from "next/link"
import { env } from "@/env.mjs"

interface BillingFormProps extends React.HTMLAttributes<HTMLFormElement> {
  subscriptionPlan: UserSubscriptionPlan;
}

export function BillingButton({ subscriptionPlan }: BillingFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(!isLoading)

    // Get a Stripe session URL.
    const response = await fetch("/api/users/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId: env.NEXT_PUBLIC_STRIPE_PRO_AGENTS_PLAN_ID
      })
    })

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Please refresh the page and try again.",
        variant: "destructive",
      })
    }

    // Redirect to the Stripe session.
    // This could be a checkout page for initial upgrade.
    // Or portal to manage an existing subscription.
    const session = await response.json()
    if (session) {
      window.location.href = session.url
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Button
        type="submit"
        variant="default"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading && (
          <Icons.spinner className="mr-2 size-4 animate-spin" />
        )}
        {subscriptionPlan.isPaid ?  "Manage subscription" : "Subscribe"}
        
      </Button>
    </form>
  )
}

export function BillingForm({
  subscriptionPlan,
  className
}: BillingFormProps) {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Plan</CardTitle>
        <CardDescription>
          You are currently on the <strong>{subscriptionPlan.title}</strong>{" "}
          plan.
        </CardDescription>
      </CardHeader>
      <CardContent>{subscriptionPlan.description}</CardContent>
      <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">

        <BillingButton subscriptionPlan={subscriptionPlan} />
        
        {subscriptionPlan.isPaid ? (
          <p className="rounded-full text-xs font-medium">
            {subscriptionPlan.isCanceled
              ? "Your plan will be canceled on "
              : "Your plan renews on "}
            {formatDate(subscriptionPlan.stripeCurrentPeriodEnd)}.
          </p>
        ) : null}
      </CardFooter>
    </Card>
  )
}
