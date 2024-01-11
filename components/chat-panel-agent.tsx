import { type UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { IconRefresh, IconStop } from '@/components/ui/icons'
import { FooterText } from '@/components/footer'
import { PromptFormAssistant } from './prompt-form-assistant'
import { Icons } from './shared/icons'

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | 'isLoading'
    | 'messages'
    | 'input'
    | 'setInput'
    | 'setMessages'
  > {
  id?: string,
  threadId?: string
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export function ChatPanelAgent({
  id,
  isLoading,
  input,
  setInput,
  messages,
  threadId,
  setMessages,
  setIsLoading,
}: ChatPanelProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
      <ButtonScrollToBottom />
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="flex h-10 items-center justify-center">
          {isLoading ? (
            <Button
              variant="outline"
              onClick={() => stop()}
              className="bg-background"
            >
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              <p className='loading'> Generating</p>
            </Button>
          ) : (
            messages?.length > 0 && (
              <Button
                variant="outline"
                onClick={() => console.log("ale")/*reload()*/}
                className="bg-background"
              >
                <IconRefresh className="mr-2" />
                Regenerate response
              </Button>
            )
          )}
        </div>
        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptFormAssistant
            assistantId={id}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
            threadId={threadId}
            setMessages={setMessages}
            setIsLoading={setIsLoading}
            messages={messages}
          />
          <FooterText className="hidden sm:block" />
        </div>
      </div>
    </div>
  )
}
