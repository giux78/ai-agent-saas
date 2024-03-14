import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { UserNameForm } from "@/components/forms/user-name-form"
import { kv } from "@vercel/kv"

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
}

export default async function SettingsPage() {
  const user = await getCurrentUser()
  const apikey = await kv.get(`user:${user?.email}:api`) as string
  const info = await  kv.hgetall(`api:${apikey}`)
  let nToken = 0
  if("n_token" in info!){
      nToken = info['n_token'] as number
  }

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <UserNameForm user={{ id: user.id, name: user.name || "" }} apikey={apikey} token={nToken} />
      </div>
    </DashboardShell>
  )
}
