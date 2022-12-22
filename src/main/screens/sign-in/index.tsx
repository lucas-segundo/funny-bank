import { makeSessionSetter } from 'main/use-cases/session-setter'
import { makeUserAuthentication } from 'main/use-cases/user-authentication'
import SignIn from 'presentation/components/templates/SignIn'

const SignInScreen = () => {
  return (
    <SignIn
      sessionSetter={makeSessionSetter()}
      userAuthentication={makeUserAuthentication()}
    />
  )
}

export default SignInScreen
