import {
  Avatar,
  Button,
  Center,
  Text,
  VStack,
} from 'native-base'
import React from 'react'

const Settings = ({ signOut, isValidating, user }) => {
  return (
    <VStack
      bg={["#2D97DA","#2249D6"]}
      flex={1}
      justifyContent="space-between"
      p={5}
    >
      <Center flex={1}>
        <VStack space={5}>
          <Center>
            <Avatar size="lg" source={{ uri: user?.photoURL }} />
          </Center>
          <Center>
            <Text color="light.100" fontSize="lg" fontWeight="bold">
              {user?.displayName}
            </Text>
            <Text color="light.100">{user?.email}</Text>
          </Center>
        </VStack>
      </Center>
      <Button
        marginBottom={20}
        marginHorizontal={'1%'}
        colorScheme="danger"
        isDisabled={isValidating}
        onPress={signOut}
      >
        Sign out
      </Button>
    </VStack>
  )
}

export default Settings
