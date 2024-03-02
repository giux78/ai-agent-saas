"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { SidebarNavItem } from "types"
import { cn, mapping } from "@/lib/utils"
import { Icons } from "@/components/shared/icons"
import { kv } from "@vercel/kv"
import { User } from "next-auth"

interface DashboardNavProps {
  items: SidebarNavItem[]
  user: (User & {
    id: string;
}) | undefined,
  threads : any[]
}

export function DashboardNav({ items, user, threads }: DashboardNavProps) {
  const path = usePathname()

  
  if (!items?.length) {
    return null
  }

  return (
    <nav className="grid items-start gap-2 overflow-y-scroll">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"]
        return (
          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  path === item.href ? "bg-accent" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        )
      })}
    <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
    <h3>Chats:</h3>
    <ul role="list" className="h-screen divide-y divide-gray-100 overflow-y-scroll">
      {threads.map((thread) => (
        <Link href={`/agents/${thread.assistantId.assistant_id}/${thread.id}`}>
          <li key={thread.id}  className="flex w-[200px] items-center py-2">
          <img src={mapping[thread.assistantId.assistant_id].logo}  className="mr-4 h-12 w-12 rounded-full" />
          <div>
            <p className="text-sm text-gray-600">{thread.messages[thread.messages.length - 1]!.content.substring(0, 80)}</p>
          </div>
        </li>
        </Link>
      ))}
    </ul>
    </nav>
  )
}
