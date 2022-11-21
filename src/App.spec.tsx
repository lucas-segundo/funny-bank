import { render, screen } from '@testing-library/react-native'
import { NativeBaseProvider } from 'native-base'
import App from './App'

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
}

describe('App', () => {
  it('should render', () => {
    render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <App />
      </NativeBaseProvider>
    )

    expect(screen.getByText('This is a Box')).toBeTruthy()
  })
})
