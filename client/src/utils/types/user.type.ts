export type CreateUserDto = {
  email: string;
  name: string;
  password: string;
};

export type LoginUserDto = {
  name: string;
  password: string;
};
