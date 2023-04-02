export interface User {
  id: string
  name: string
  avatar: string
}

export interface OnlineUsers {
  onlineUsers: User[]
}

export interface SerializeUserData {
  users: OnlineUsers
}
