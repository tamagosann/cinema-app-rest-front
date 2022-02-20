import { UserDto } from './userDto'

export type LoginDto = {
  token: string
}

export type LoginUserDto = {
  token: string
  user: UserDto
}

export type LoginUserDtoClient = {
  user: UserDto | null
}

export type LoginDtoClient = {
  isLoggedIn: boolean
}

export type LogoutDto = {
  success: boolean
}
