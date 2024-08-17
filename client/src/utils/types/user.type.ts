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
  role: string;
};

export type IsUserLoggedIn = {
  token: string;
  userInformation: UserDto;
};
