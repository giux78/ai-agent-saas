import { UseChatHelpers } from 'ai/react'
import * as React from 'react'
import Textarea from 'react-textarea-autosize'

import { Button, buttonVariants } from '@/components/ui/button'
import { IconArrowElbow, IconPlus } from '@/components/ui/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip-ai'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { openaiClient } from '@/lib/openaiClient'
import { useRef, useState } from 'react'
import { Message } from 'ai'

export interface PromptProps
  extends Pick<UseChatHelpers, 'input' | 'setInput' | 'setMessages' | 'messages'> {
  isLoading: boolean
  threadId?: string
  assistantId?: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

//   // thread_scYI1OoDkYCedC83ouBoVFGU
  // asst_YxvBcmhcuMPEHdyh8Vesdj4I
export function PromptFormAssistant({
  input,
  setInput,
  isLoading,
  threadId,
  setMessages,
  assistantId,
  setIsLoading,
  messages,
}: PromptProps) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const router = useRouter()
  const inputFile = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File>()

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setFile(i);
      setInput(`[File ${i.name}]`)
    }
  };

  const talkToAssistant = async (question) => {

    const data = new FormData()
    data.set('file', file!)
    data.append('question', question);
    const ms :Message =  {'role' : 'user', 'content': question, "id" : `msg_${Math.random().toString(36).slice(2)}`}

    messages.push(ms)
    setMessages(messages)
    setIsLoading(true)
    let response;
    if(assistantId === 'zefiro_v0.5'){
      response = await fetch(
        `/api/zefiro/${assistantId}/${threadId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messages)
      })
    } else {
      response = await fetch(
        `/api/assistant/${assistantId}/${threadId}`, {
        method: "POST",
        //headers: {
        //  "Content-Type": "application/json",
        //},
        body: data /*JSON.stringify({
          "question" : question
        })*/
      })
  }
    console.log("qua ci sono ");
    const messages_result = await response.json();
    console.log(messages_result);
    setMessages(messages_result)
    setFile(undefined); 
    setIsLoading(false)
  }

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <form
      onSubmit={async e => {
        e.preventDefault()
        if (!input?.trim()) {
          return
        }
        setInput('')
        await talkToAssistant(input)
      }}
      ref={formRef}
    >
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={e => {
                e.preventDefault()
                if (inputFile.current !== null) {
                  inputFile.current.click();
                }
                
              }}
              className={cn(
                buttonVariants({ size: 'sm', variant: 'outline' }),
                'absolute left-0 top-4 h-8 w-8 rounded-full bg-background p-0 sm:left-4'
              )}
            >
              <IconPlus />
              <span className="sr-only">Upload File</span>
            </button>
          </TooltipTrigger>
          <TooltipContent>Upload File</TooltipContent>
        </Tooltip>
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Send a message."
          spellCheck={false}
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
        />
        <div className="absolute right-0 top-4 sm:right-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || input === ''}
              >
                <IconArrowElbow />
                <span className="sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </div>
        <input type='file' id='file' ref={inputFile} style={{display: 'none'}} onChange={uploadToClient}/>

      </div>
    </form>
  )
}
