import { screen } from '@testing-library/react-native'
import { renderWithProviders } from 'presentation/helpers/render-with-providers'
import Home from '.'

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

const makeSut = () => {
  renderWithProviders(<Home />)
}

describe('Home', () => {
  it('should render correctly', () => {
    makeSut()

    const button = screen.getByText('Go to details')

    expect(button).toBeTruthy()
  })
})
