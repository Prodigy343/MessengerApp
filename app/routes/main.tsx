import type { LinksFunction, LoaderArgs } from '@remix-run/node'
import type { SerializeUserData } from '~/typings/user'
import { json } from '@remix-run/node'
import { Form, Link, Outlet, useLoaderData } from '@remix-run/react'
import { SidebarComponent, links as sidebarStyles } from '~/components/sidebarComponent'
import { getOnlineUsers } from '~/models/user.server'

export const links: LinksFunction = () => [...sidebarStyles()]

export async function loader ({ request }: LoaderArgs) {
  const users = await getOnlineUsers()
  return json({ users })
}

export default function MainPage () {
  const data: SerializeUserData = useLoaderData<typeof loader>()

  return (
    <div className='flex w-full h-full min-h-screen flex-col'>
      <header className='flex items-center justify-between bg-slate-800 p-4 text-white'>
        <h1 className='text-3xl font-bold'>
          <Link className='color-white' to='.'>Messenger App</Link>
        </h1>
        <Form action='/logout' method='post'>
          <button
            type='submit'
            className='rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600'
          >
            Logout
          </button>
        </Form>
      </header>

      <main className='flex w-full h-full bg-white'>
        <SidebarComponent onlineUsers={data.users.onlineUsers}/>
        <div className='flex-1 p-6'>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
