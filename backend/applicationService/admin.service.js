
const searchUser = (userService) => async (dataReq) => {
  try {
    const users = await userService.findAll()
    return users
  } catch (error) {
    throw error
  }
}

// to apply dependency injection
const authService = (userService, clientService, googleAccountService) => ({
  searchUser: searchUser(userService)
})

module.exports = authService