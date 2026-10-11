import { apiFetch } from './client';

type LoginResponse = { token: string; user_id: string; is_admin?: boolean };
type SignUpResponse = { message: string; user: { user_id: string; username: string } };

/**
 * Logs in and returns the JWT, user id and whether the user is an admin. Throws an ApiError with status 401 on bad credentials.
 */
export function login(username: string, password: string): Promise<LoginResponse> {
  return apiFetch<LoginResponse>('/auth/login', { method: 'POST', body: { username, password } });
}

/**
 * Creates an account. Throws an ApiError with status 409 if the username or email is taken.
 */
export function signUp(username: string, email: string, password: string): Promise<SignUpResponse> {
  return apiFetch<SignUpResponse>('/user/create', { method: 'POST', body: { username, email, password } });
}
