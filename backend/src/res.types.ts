export type DBResponse = {
  status: number;
  data: LoginResponse | ErrorResponse;
};

export type LoginResponse = {
  username: string;
  name: string;
  profile_pic: string;
};

export type ErrorResponse = {
  error: string;
};
