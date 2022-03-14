import { GoogleSigninButton } from '@react-native-google-signin/google-signin'
import { Center, Heading, Text, VStack } from 'native-base'
import React from 'react'

const SignIn = ({ signInWithGoogle, isValidating }) => {
  return (
    <VStack bg="white" flex={1} p={5}>
      <Center flex={1}>
        <Heading>Speech Transcriber</Heading>
        <Text color="gray.500" fontSize="xs">
          Powered by Google Speech Recognition
        </Text>
      </Center>
      <Center flex={1}>
        <GoogleSigninButton
          color={GoogleSigninButton.Color.Dark}
          disabled={isValidating}
          size={GoogleSigninButton.Size.Wide}
          onPress={signInWithGoogle}
        />
      </Center>
    </VStack>
  )
}

export default SignIn
