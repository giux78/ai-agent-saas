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
  logo?:string
}

export function ChatAgent({ id, initialMessages, name, className, threadId, logo }: ChatProps) {
  const [previewToken, setPreviewToken] = useLocalStorage<string | null>(
    'ai-token',
    null
  )
  const [previewTokenDialog, setPreviewTokenDialog] = useState(IS_PREVIEW)
  const [previewTokenInput, setPreviewTokenInput] = useState(previewToken ?? '')
  const [messages, setMessages] = useState<Message[]>([]);
  const  [isLoading,setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  /*const { messages, append, reload, stop, isLoading, input, setInput, setMessages } =
    useChat({
      api : '/api/agent',
      initialMessages,
      id,
      body: {
        id,
        previewToken,
        name
      },
      onResponse(response) {
        if (response.status === 401) {
          toast.error(response.statusText)
        }
      }
    }) */
  return (
    <>
    <div className="flex items-center p-4">
      <img src={`/images/${logo}`} alt="Descriptive Alt Text" className="mr-4 h-20 w-20 rounded-full object-cover"/>
      <h2 className="text-lg font-bold">{name}</h2>
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
      <ChatPanelAgent
        id={id}
        isLoading={isLoading}
        //stop={stop}
        //append={append}
        //reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
        threadId={threadId}
        setMessages={setMessages}
      />

      <Dialog open={previewTokenDialog} onOpenChange={setPreviewTokenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter your OpenAI Key</DialogTitle>
            <DialogDescription>
              If you have not obtained your OpenAI API key, you can do so by{' '}
              <a
                href="https://platform.openai.com/signup/"
                className="underline"
              >
                signing up
              </a>{' '}
              on the OpenAI website. This is only necessary for preview
              environments so that the open source community can test the app.
              The token will be saved to your browser&apos;s local storage under
              the name <code className="font-mono">ai-token</code>.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={previewTokenInput}
            placeholder="OpenAI API key"
            onChange={e => setPreviewTokenInput(e.target.value)}
          />
          <DialogFooter className="items-center">
            <Button
              onClick={() => {
                setPreviewToken(previewTokenInput)
                setPreviewTokenDialog(false)
              }}
            >
              Save Token
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
