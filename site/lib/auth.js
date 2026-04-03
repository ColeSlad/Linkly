// Checks the non-HttpOnly indicator cookie to see if the user is logged in.
// The actual JWT is in an HttpOnly cookie and is never readable by JS.
export const isLoggedIn = () =>
    typeof document !== 'undefined' &&
    document.cookie.split(';').some(c => c.trim().startsWith('loggedIn='));
