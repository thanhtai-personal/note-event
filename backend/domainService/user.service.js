const User = require('../domainModel/user')

User.getByUserName = async (userName) => {
  return User.findOne({
    where: {
      username: userName
    }
  })
}

module.exports =  User