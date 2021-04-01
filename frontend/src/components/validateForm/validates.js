import {
  FORM_REGISTER,
  FORM_LOGIN,
  FEATURE_AUTH
} from 'root/actions/types'

const validateEmail = (value) => {
  let validateObj = {
    isValidated: true,
  }
  if (!value) {
    validateObj = {
      isValidated: false,
      message: 'empty user name'
    }
  }
  return validateObj
}

const validatePassword = (value) => {
  let validateObj = {
    isValidated: true,
  }
  if (!value) {
    validateObj = {
      isValidated: false,
      message: 'empty password'
    }
  }
  return validateObj
}

const validateText = (key) => {
  return (value) => {
    let validateObj = {
      isValidated: true,
    }
    if (!value) {
      validateObj = {
        isValidated: false,
        message: `empty ${key}`
      }
    }
    return validateObj
  }
}

const validates = {
  [FEATURE_AUTH]: {
    [FORM_REGISTER]: {
      email: validateEmail,
      password: validatePassword
    },
    [FORM_LOGIN]: {
      email: validateEmail,
      password: validatePassword
    }
  }
}

export default validates