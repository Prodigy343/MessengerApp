export interface Message {
  id: string
  message: string
  user_id: string
}

export interface SerializeMessageData {
  messages: Message[]
}
