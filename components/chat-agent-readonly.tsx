'use client'

import { useChat, type Message } from 'ai/react'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanelAgent } from '@/components/chat-panel-agent'

import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { toast } from 'react-hot-toast'
import { EmptyScreen } from '@/components/empty-screen'

const IS_PREVIEW = process.env.VERCEL_ENV === 'preview'
export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string,
  name?:string
  threadId?:string
  logo?:string,
  description?:string,
}

export function ChatAgentReadOnly({ id, initialMessages, name, className, threadId, logo, description }: ChatProps) {
  const [previewToken, setPreviewToken] = useLocalStorage<string | null>(
    'ai-token',
    null
  )
  const [previewTokenDialog, setPreviewTokenDialog] = useState(IS_PREVIEW)
  const [previewTokenInput, setPreviewTokenInput] = useState(previewToken ?? '')
  const [messages, setMessages] = useState<Message[]>(initialMessages!);
  const  [isLoading,setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  return (
    <>
    <div className="flex items-center p-4">
      <img src={`/images/${logo}`} alt="Descriptive Alt Text" className="mr-4 size-20 rounded-full object-cover"/>
      <div>
        <h2 className="text-lg font-bold">{name}</h2>
        <h6>{description}</h6>
      </div>
    </div>
      <div className={cn('pb-[200px] pt-1 md:pt-4', className)}>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          <EmptyScreen setInput={setInput}/>
        )}
      </div>
    </>
  )
}
