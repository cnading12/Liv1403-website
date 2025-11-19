export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'investor' | 'buyer';
  status?: 'active' | 'inactive';
  created_at?: string;
  last_login?: string;
}

export interface AuthResponse {
  success: boolean;
  user: User;
  token: string;
}