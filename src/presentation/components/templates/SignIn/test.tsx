import { faker } from '@faker-js/faker'
import { fireEvent, screen } from '@testing-library/react-native'
import { UserAuthenticationParams } from 'domain/use-cases/user-authentication'
import { mockUserAuthentication } from 'domain/use-cases/user-authentication/mock'
import { renderWithProviders } from 'presentation/helpers/render-with-providers'
import SignIn from '.'

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

const makeSut = () => {
  const userAuthentication = mockUserAuthentication()
  renderWithProviders(<SignIn userAuthentication={userAuthentication} />)

  return {
    userAuthentication,
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
})
