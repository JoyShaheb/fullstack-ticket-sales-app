export interface IEventData {
  id: string;
  title: string;
  description: string;
  image: string;
  date: Date | string;
  location: string;
}

export interface IUserSignInData {
  email: string;
  password: string;
}
