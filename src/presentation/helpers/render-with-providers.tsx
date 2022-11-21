import { NavigationContainer } from '@react-navigation/native'
import { render } from '@testing-library/react-native'
import { NativeBaseProvider } from 'native-base'
import React from 'react'

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
}

export const renderWithProviders = (element: React.ReactElement) => {
  return render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>{element}</NavigationContainer>
    </NativeBaseProvider>
  )
}
