export const authenApiNames = {
  login: 'login',
  signup: 'signup'
}

const authenApis = [
  {
    method: 'post',
    name: authenApiNames.login,
    path: '/login',
  },
  {
    method: 'post',
    name: authenApiNames.signup,
    path: '/register',
  }
]

export default authenApis