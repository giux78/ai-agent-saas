import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { stripe } from "@/lib/stripe"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BillingForm } from "@/components/forms/billing-form"
import { DashboardHeader } from "@/components/dashboard/header"
import { Icons } from "@/components/shared/icons"
import { DashboardShell } from "@/components/dashboard/shell"

export const metadata = {
  title: "Billing",
  description: "Manage billing and your subscription plan.",
}

export default async function BillingPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const subscriptionPlan = await getUserSubscriptionPlan(user.id)

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Billing"
        text="Manage billing and your subscription plan."
      />
      <div className="grid gap-8">
        <Alert className="!pl-14">
          <Icons.warning />
          <AlertTitle>This is still in alpha</AlertTitle>
          <AlertDescription>
            GPUs cost and we ask for a little fee for giving access to our agents{" "}
            <a
              href="https://businessos.xyz/agents"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-8"
            >
              Agents
            </a>
            .
          </AlertDescription>
        </Alert>
        <BillingForm
          subscriptionPlan={subscriptionPlan}
        />
      </div>
    </DashboardShell>
  )
}
