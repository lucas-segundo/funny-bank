import React from 'react'
import { Box, Button, Center, Input, Text, VStack } from 'native-base'

const SignIn = () => {
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
          <Input placeholder="Username" fontSize="lg" />
          <Input placeholder="Password" fontSize="lg" type="password" />
          <Button
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
