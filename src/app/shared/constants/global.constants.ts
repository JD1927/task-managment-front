/*************************************************
 * ***************  PATTERNS *********************/

export const passwordPattern = `(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}`;

/*************************************************
 * ***************  ROUTES **********************/

export const signInRoute = '/api/auth/signin';
export const signUpRoute = '/api/auth/signup';
export const tasks = '/api/tasks';
