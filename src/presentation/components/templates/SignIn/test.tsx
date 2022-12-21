import { faker } from '@faker-js/faker'
import { fireEvent, screen } from '@testing-library/react-native'
import waitForExpect from 'wait-for-expect'

import { mockUser } from 'domain/models/user/mock'
import { mockSessionSetter } from 'domain/use-cases/session-setter/mock'
import { UserAuthenticationParams } from 'domain/use-cases/user-authentication'
import { mockUserAuthentication } from 'domain/use-cases/user-authentication/mock'
import { renderWithProviders } from 'presentation/helpers/render-with-providers'
import SignIn from '.'

const makeSut = () => {
  const userAuthentication = mockUserAuthentication()
  const sessionSetter = mockSessionSetter()
  renderWithProviders(
    <SignIn
      userAuthentication={userAuthentication}
      sessionSetter={sessionSetter}
    />
  )

  return {
    userAuthentication,
    sessionSetter,
  }
}

describe('SignIn', () => {
  it('should render correctly', () => {
    makeSut()

    const button = screen.getByText('Sign In')

    expect(button).toBeTruthy()
  })

  it('should call user authentication with right params', () => {
    const { userAuthentication } = makeSut()
    const username = faker.internet.userName()
    fireEvent.changeText(screen.getByPlaceholderText('Username'), username)

    const password = faker.internet.password()
    fireEvent.changeText(screen.getByPlaceholderText('Password'), password)

    fireEvent.press(screen.getByText('Sign In'))

    const params: UserAuthenticationParams = {
      identifier: username,
      password,
    }

    expect(userAuthentication.auth).toBeCalledWith(params)
  })

  it('should show user authentication error', async () => {
    const { userAuthentication } = makeSut()
    const errorMessage = faker.random.words()
    userAuthentication.auth.mockRejectedValue(new Error(errorMessage))

    fireEvent.changeText(
      screen.getByPlaceholderText('Username'),
      faker.internet.userName()
    )
    fireEvent.changeText(
      screen.getByPlaceholderText('Password'),
      faker.internet.password()
    )

    fireEvent.press(screen.getByText('Sign In'))

    expect(await screen.findByText(errorMessage)).toBeTruthy()
  })

  it('should call session setter after authentication with right values', async () => {
    const { userAuthentication, sessionSetter } = makeSut()
    const user = mockUser()
    userAuthentication.auth.mockResolvedValue(user)

    fireEvent.changeText(
      screen.getByPlaceholderText('Username'),
      faker.internet.userName()
    )
    fireEvent.changeText(
      screen.getByPlaceholderText('Password'),
      faker.internet.password()
    )

    fireEvent.press(screen.getByText('Sign In'))

    await waitForExpect(() => {
      expect(sessionSetter.set).toBeCalledWith({ user })
    })
  })

  it('should show session setter error', async () => {
    const { sessionSetter } = makeSut()
    const errorMessage = faker.random.words()

    sessionSetter.set.mockRejectedValueOnce(new Error(errorMessage))

    fireEvent.changeText(
      screen.getByPlaceholderText('Username'),
      faker.internet.userName()
    )
    fireEvent.changeText(
      screen.getByPlaceholderText('Password'),
      faker.internet.password()
    )

    fireEvent.press(screen.getByText('Sign In'))

    expect(await screen.findByText(errorMessage)).toBeTruthy()
  })
})
