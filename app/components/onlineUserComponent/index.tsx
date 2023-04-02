import type { LinksFunction } from '@remix-run/node'
import componentStylesheetUrl from './styles.css'

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet', href: componentStylesheetUrl
  }
]

export const OnlineUserComponent = ({ name, avatar } : { name?: string, avatar?: string}) => {
  const deleteFromList = () => {
    console.log('function that deletes the user from the latest chat list')
  }

  return (
    <div className='online-user-element block relative'>
      <img className='avatar inline-flex' src={avatar} alt='test' />
      <div className='name text-white inline-flex'>{name}</div>
      <div className='overlay absolute w-full h-full top-0 left-0 bg-black opacity-30 cursor-pointer hidden'>
      </div>
      <i onClick={deleteFromList} className='close-icon ri-close-fill absolute right-1 black hidden cursor-pointer'></i>
    </div>
  )
}
