import React, { useCallback, useEffect } from 'react'
import Util from 'root/utils'
import { connect } from 'react-redux'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  Link
} from '@material-ui/core'
import {
  FORM_LOGIN,
  FEATURE_AUTH
} from './../../actions/types'
import {
  updateInputData,
  login,
  updateGoogleLoginData
} from './../../actions'
import { withValidateForm, withValidateField } from 'root/components/validateForm'
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import GoogleLogin from 'react-google-login'

const WithValidateTextField = withValidateField(TextField, { feature: FEATURE_AUTH, form: FORM_LOGIN })


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))


const LoginComponent = (props) => {
  const classes = useStyles()
  const { text = {
    googleLogin: 'Sign in with Google',
    login: 'Login',
    email: 'Email Address',
    password: 'Password',
    forgot: 'Forgot password?',
  }
    , updateGoogleLoginData
    , login, updateInputData, inputData = {}
    , isFormValidated, authData, history } = props
  const { email, password } = inputData

  useEffect(() => {
    if(authData && (authData.role || '').includes('admin')) {
      window.location.replace('/admin')
    }
  }, [authData])

  const submitLogin = useCallback((event) => {
    event.preventDefault()
    typeof login === 'function' && login({ email, password })
  }, [login, inputData])

  const onChangeEmail = useCallback((e) => {
    typeof updateInputData === 'function' && updateInputData(FORM_LOGIN, 'email', e?.currentTarget?.value)
  }, [updateInputData])

  const onChangePassword = useCallback((e) => {
    typeof updateInputData === 'function' && updateInputData(FORM_LOGIN, 'password', e?.currentTarget?.value)
  }, [updateInputData])

  const onGGLoginSuccess = useCallback((googleUser) => {
    const googleProfile = googleUser.getBasicProfile()
    const profile = {
      fullName: googleProfile.getName(),
      email: googleProfile.getEmail(),
      image: googleProfile.getImageUrl(),
      googleId: googleProfile.getId(),
      firstName: googleProfile.getFamilyName(),
      lastName: googleProfile.getGivenName(),
      token: googleUser.getAuthResponse().id_token
    }
    updateGoogleLoginData(profile)
  }, [updateGoogleLoginData])

  const onGGLoginFailure = useCallback((googleUser) => {
  }, [])

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {text.login}
        </Typography>
        <form className={classes.form} noValidate={false} autoComplete='off'>
          <WithValidateTextField
            useFirstUpdate
            validatedName='email'
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label={text.email}
            name='email'
            autoFocus
            autoComplete={'true'}
            onChange={onChangeEmail}
            defaultValue={email}
          />
          <WithValidateTextField
            useFirstUpdate
            validatedName='password'
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label={text.password}
            type='password'
            id='password'
            onChange={onChangePassword}
            autoComplete={'true'}
            defaultValue={password}
          />
          <Button
            onClick={submitLogin}
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            // disabled={!isFormValidated}
          >
            {text.login}
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href='/forgetPassword'>
                {text.forgot}
              </Link>
            </Grid>
          </Grid> */}
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <GoogleLogin
                clientId='404281480421-lbrm3qknrffqpndu06u4925047tt4ee3.apps.googleusercontent.com'
                // buttonText={text.googleLogin}
                onSuccess={onGGLoginSuccess}
                onFailure={onGGLoginFailure}
                cookiePolicy={'single_host_origin'}
                className='loginBtn loginBtn--google'
              />
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

const mapState = (state) => ({
  inputData: Util.get(state, `${FEATURE_AUTH}.${FORM_LOGIN}.data`),
  authData: Util.get(state, `${FEATURE_AUTH}.auth`)
})

const mapDispatch = () => {
  return ({
    updateInputData,
    login,
    updateGoogleLoginData
  })
}

export default withValidateForm(connect(mapState, mapDispatch())(LoginComponent), {
  feature: FEATURE_AUTH,
  form: FORM_LOGIN,
  useFirstUpdate: true
})