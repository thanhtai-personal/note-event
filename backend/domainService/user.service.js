const User = require('../domainModel/user')

User.getByUserName = async (userName, getPassword) => {
  const user = await User.findOne({
    attributes: {
      exclude: getPassword ? [] : ['password']
    },
    where: {
      username: userName,
      isActive: true
    }
  })
  return user.dataValues
}

module.exports = User