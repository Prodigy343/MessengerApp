import type { LinksFunction, LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation
} from '@remix-run/react'

import { getUser } from './session.server'
import tailwindStylesheetUrl from './styles/tailwind.css'
import { RingLoader } from 'react-spinners'

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet', href: tailwindStylesheetUrl
    },
    {
      rel: 'stylesheet',
      href: 'https://cdn.simplecss.org/simple.min.css'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap'
    }
  ]
}

export async function loader ({ request }: LoaderArgs) {
  return json({
    user: await getUser(request)
  })
}

export default function App () {
  const { state } = useNavigation()

  return (
    <html lang='en' className='h-full'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body className='h-full'>
        {state !== 'idle' ? <RingLoader className='view-loader' /> : <Outlet />}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
