import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: 'Mostra',
    message: `Cosa posso vedere alla mostra"?`
  },
  {
    heading: 'Esibizione',
    message: 'Quando è stata costruita la villa?: \n'
  },
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto  px-4">
      <div className="rounded-lg border bg-background p-8">
        <p className="mb-2 leading-normal text-muted-foreground">
          This is an alpha release be kind :) {' '} <br/>
          .....
        </p>
      </div>
    </div>
  )
}
