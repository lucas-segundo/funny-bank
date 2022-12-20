import { screen } from '@testing-library/react-native'
import { renderWithProviders } from 'presentation/helpers/render-with-providers'
import SignIn from '.'

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

const makeSut = () => {
  renderWithProviders(<SignIn />)
}

describe('SignIn', () => {
  it('should render correctly', () => {
    makeSut()

    const button = screen.getByText('Sign In')

    expect(button).toBeTruthy()
  })
})
