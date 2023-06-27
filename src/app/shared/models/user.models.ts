export interface User {
  id: number;
  token: string;
  name: {
    first: string | undefined;
    last: string | undefined;
  };
  login: string | undefined;
  password: string | undefined;
}
