import type { Message } from '~/typings/message'
import type { User } from '~/typings/user'

export async function getChatByUserId (userId : User['id']) {
  const messages : Message[] = [
    {
      id: '1',
      message: 'test 1',
      user_id: '1'
    },
    {
      id: '2',
      message: 'test 2',
      user_id: '1'
    },
    {
      id: '3',
      message: 'test 3',
      user_id: '1'
    },
    {
      id: '4',
      message: 'test 4',
      user_id: '1'
    },
    {
      id: '5',
      message: 'test 5',
      user_id: '1'
    }
  ]

  return messages
}
