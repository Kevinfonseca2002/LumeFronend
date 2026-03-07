export interface Register {
  _id: string;
  role: string;
  userName: string;
  description: string;
  phone: number;
  location: string;
  email: string;
  password: string;
  facebookLink?: string;
  instagramLink?: string;
  xLink?: string;
  tiktokLink?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
