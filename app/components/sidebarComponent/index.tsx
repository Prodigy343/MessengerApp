import type { LinksFunction } from '@remix-run/node'
import type { User } from '~/types/user'
import componentStylesheetUrl from './styles.css'
import { OnlineUserComponent } from '../onlineUserComponent'

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet', href: componentStylesheetUrl
  }
]

export const SidebarComponent = ({ onlineUsers }: { onlineUsers: User[] }) => {
  return (
    <div className='h-full w-full main-sidebar border-r bg-cyan-600'>
      {
        onlineUsers.map(user => <OnlineUserComponent key={user.id} {...user}/>)
      }
    </div>
  )
}
