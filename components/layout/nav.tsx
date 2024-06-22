"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { SidebarNavItem } from "types"
import { cn, mapping } from "@/lib/utils"
import { Icons } from "@/components/shared/icons"
import { kv } from "@vercel/kv"
import { User } from "next-auth"

import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/20/solid'
import React from "react"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


interface DashboardNavProps {
  items: SidebarNavItem[]
  user: (User & {
    id: string;
}) | undefined,
  threads : any[]
}

export function DashboardNav({ items, user, threads }: DashboardNavProps) {
  
  const [threadsTest, setThreadsTest] = React.useState<any[]>([]);
  const [isLoading, setLoading] = useState(true)
 
  useEffect(() => {
    fetch('/api/threads')
      .then((res) => res.json())
      .then((data) => {
        setThreadsTest(data)
        console.log("test")
        setLoading(false)
      })
  }, [])
  
  const path = usePathname()

  if (!items?.length) {
    return null
  }

  return (
    <nav className="grid items-start gap-2 overflow-y-scroll">    
     <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          New Chat
          <PlusIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-10 py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/agents/maestrale"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Maestrale Chat
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/agents/agent"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Hoodie Creator
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/agents/video"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Video Creator
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/agents/analyst"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Chart Creator
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
    <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
    <h3>Chats:</h3>
    <ul role="list" className="h-screen divide-y divide-gray-100 overflow-y-scroll">
      {threadsTest.map((thread) => (
        <Link key={thread.id} href={`/agents/${thread.assistantId.assistant_id}/${thread.id}`}>
          <li key={thread.id}  className="flex w-[200px] items-center py-2">
          <img key={thread.id} src={mapping[thread.assistantId.assistant_id].logo}  className="mr-4 h-12 w-12 rounded-full" />
          <div>
            <p key={thread.id} className="text-sm text-gray-600">{thread.messages[thread.messages.length - 1].content!.substring(0, 80)}</p>
          </div>
        </li>
        </Link>
      ))}
    </ul>
    </nav>
  )
}
