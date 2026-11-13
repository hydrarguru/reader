/** Toast props for a failed action. */
export function errorToast(title: string, err?: unknown) {
  return {
    title,
    description: err instanceof Error && err.message ? err.message : 'Please try again.',
    // Errors stay until dismissed so there is time to read them (WCAG 2.2.1).
    duration: Infinity,
  };
}
