import React from 'react'
import { Box } from 'native-base'

const Details = () => {
  return (
    <Box safeArea>
      <Box
        alignSelf="center"
        bg="primary.500"
        _text={{
          fontSize: 'md',
          fontWeight: 'medium',
          color: 'warmGray.50',
          letterSpacing: 'lg',
        }}
      >
        This is a Box
      </Box>
    </Box>
  )
}

export default Details
