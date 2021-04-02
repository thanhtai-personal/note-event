export const authenApiNames = {
  login: 'login',
  signup: 'signup'
}

export const authenApis = {
  [authenApiNames.login]: {
    method: 'post',
    path: '/login',
  },
  [authenApiNames.signup]: {
    method: 'post',
    path: '/register',
  }
}