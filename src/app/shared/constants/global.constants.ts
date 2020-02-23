/*************************************************
 * ***************  PATTERNS *********************/

export const passwordPattern = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

/*************************************************
 * ***************  ROUTES **********************/

export const signInRoute = '/api/auth/signin';
export const signUpRoute = '/api/auth/signup';
