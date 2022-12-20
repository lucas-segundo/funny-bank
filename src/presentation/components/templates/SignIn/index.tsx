import React, { useState } from 'react'
import { Box, Button, Center, Input, Text, VStack } from 'native-base'
import { UserAuthentication } from 'domain/use-cases/user-authentication'

export type SignInProps = {
  userAuthentication: UserAuthentication
}

const SignIn = ({ userAuthentication }: SignInProps) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const handleSignIn = async () => {
    await userAuthentication.auth({
      identifier: formData.username,
      password: formData.password,
    })
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
            onPress={() => handleSignIn()}
            _text={{
              fontWeight: 'bold',
              fontSize: 'md',
            }}
          >
            Sign In
          </Button>
          <Text color="red.500" fontWeight="bold" fontSize="md">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. A fugiat
            harum totam omnis!
          </Text>
        </VStack>
      </Center>
    </Box>
  )
}

export default SignIn
