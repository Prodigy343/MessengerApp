import type { LinksFunction, LoaderArgs } from '@remix-run/node'
import type { SerializeMessageData } from '~/typings/message'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getChatByUserId } from '~/models/message.server'
import { WysiwygComponent, links as wysiwygEditorStyles } from '~/components/wysiwygEditor'

export const links: LinksFunction = () => [...wysiwygEditorStyles()]

export async function loader ({ request }: LoaderArgs) {
  const messages = await getChatByUserId('1')
  return json({ messages })
}

export default function MainPage () {
  const data: SerializeMessageData = useLoaderData<typeof loader>()
  console.log(data)

  return (
    <div className='relative w-full h-full flex-col'>
      <div className='h-full'>
        <div>
          blabla
        </div>
      </div>
      <WysiwygComponent className='absolute w-full bottom-0 h-40'/>
    </div>
  )
}
