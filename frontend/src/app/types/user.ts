export interface User {
  id: number;
  username?: string | null;
  fullname: string;
  email: string;
  numberphone: string;
  address?: string | null;
  status: string;
  ordernum: number;
  role: string;
  rejectnum: number;
  avatarimage: string;
}
