export type CreateDto<TypeDto> = Omit<TypeDto, "id">;

export type UserDto = {
  id: string;
  email: string;
  name: string;
  password: string;
};

export type CreateUserDto = CreateDto<UserDto>;
