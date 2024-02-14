import { IProfileEntity } from '../interfaces/entities/IProfileEntity'

interface ProfileConstructor {
  name: string
  email?: string
  avatarUrl?: string
}

export class Profile implements IProfileEntity {
  name: string
  email?: string
  avatarUrl?: string

  constructor({ name, email, avatarUrl }: ProfileConstructor) {
    this.name = name
    this.email = email
    this.avatarUrl = avatarUrl
  }
}
