import { clearSession, getSession } from '@/lib/session';

/**
 * Error thrown by apiFetch when the backend responds with a non-2xx status.
 * `message` is the backend's `{ message }` when it sends one.
 */
export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

function buildUrl(path: string): string {
  const base = (import.meta.env.VITE_BACKEND_URL as string).replace(/\/+$/, '');
  return `${base}${path}`;
}

async function readErrorMessage(response: Response): Promise<string> {
  const text = await response.text();
  try {
    const body = JSON.parse(text);
    if (typeof body?.message === 'string') return body.message;
  } catch {
    /* not JSON, fall through to the raw text */
  }
  return text || response.statusText;
}

interface ApiFetchOptions extends Omit<RequestInit, 'body'> {
  /** Sent as JSON. */
  body?: unknown;
  /** Attach the logged-in user's token as `Authorization: Bearer <token>`. */
  auth?: boolean;
}

/**
 * Fetches `path` from the backend and returns the parsed JSON body.
 * Throws an ApiError on a non-2xx response. A 401 on an authenticated request
 * also clears the session, since it means the token is missing, invalid or expired.
 */
export async function apiFetch<T>(path: string, { body, auth = false, headers, ...init }: ApiFetchOptions = {}): Promise<T> {
  const requestHeaders = new Headers(headers);
  if (body !== undefined) requestHeaders.set('Content-Type', 'application/json');
  if (auth) {
    const session = getSession();
    if (session === null) throw new ApiError(401, 'You need to log in first.');
    requestHeaders.set('Authorization', `Bearer ${session.token}`);
  }

  const response = await fetch(buildUrl(path), {
    ...init,
    headers: requestHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    if (auth && response.status === 401) clearSession();
    throw new ApiError(response.status, await readErrorMessage(response));
  }

  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
}
