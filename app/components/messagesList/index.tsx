import type { Message } from '~/typings/message'

export const MessageListComponent = (
  { messages, userId }: { messages: Message[], userId: string }) => {
  return (
    <div className='h-full w-full main-sidebar border-r bg-cyan-600'>
      messages
    </div>
  )
}
