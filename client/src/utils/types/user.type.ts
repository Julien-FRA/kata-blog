export type CreateUserDto = {
  email: string;
  name: string;
  password: string;
};

export type LoginUserDto = {
  name: string;
  password: string;
};

export type UserDto = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type IsUserLoggedIn = {
  token: string;
  userInformation: UserDto;
};

export type UpdateUserDto = {
  email: string;
  name: string;
};
