import React, { useState } from 'react'
import { Box, Button, Center, Input, Text, VStack } from 'native-base'
import { UserAuthentication } from 'domain/use-cases/user-authentication'
import { UnexpectedError } from 'domain/errors/unexpected-error'
import { SessionSetter } from 'domain/use-cases/session-setter'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProps } from 'App'

export type SignInProps = {
  userAuthentication: UserAuthentication
  sessionSetter: SessionSetter
}

const SignIn = ({ userAuthentication, sessionSetter }: SignInProps) => {
  const navigation = useNavigation<StackNavigationProps>()
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    setIsLoading(true)
    try {
      const user = await userAuthentication.auth({
        identifier: formData.username,
        password: formData.password,
      })

      await sessionSetter.set({ user })
      navigation.navigate('Home')
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError(new UnexpectedError().message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box safeArea backgroundColor="primary.600">
      <Center height="full">
        <VStack
          justifyContent="center"
          space="20px"
          width="full"
          backgroundColor="muted.100"
          padding="20px"
        >
          <Input
            placeholder="Username"
            fontSize="lg"
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, username: text }))
            }
          />
          <Input
            placeholder="Password"
            fontSize="lg"
            type="password"
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, password: text }))
            }
          />
          <Button
            isLoadingText="Loading"
            isLoading={isLoading}
            onPress={() => handleSignIn()}
            _text={{
              fontWeight: 'bold',
              fontSize: 'md',
            }}
          >
            Sign In
          </Button>
          {error && (
            <Text color="red.500" fontWeight="bold" fontSize="md">
              {error}
            </Text>
          )}
        </VStack>
      </Center>
    </Box>
  )
}

export default SignIn
