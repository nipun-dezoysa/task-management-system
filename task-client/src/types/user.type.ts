export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type UserState = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};
