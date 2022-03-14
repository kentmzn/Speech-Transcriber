import {
  Button,
  Center,
  Heading,
  Progress,
  ScrollView,
  Text,
  VStack,
} from 'native-base'
import React from 'react'

const Transcribe = ({
  onPress,
  isLoading,
  buttonText,
  transcript,
  results,
  volume,
  saveTranscript,
  discardTranscript,
}) => {
  return (
    <VStack bg={["#2D97DA","#2249D6"]} flex={1} p={5} space={4}>
      <Center><Heading color="lightText">Transcribe</Heading></Center>
      <ScrollView _contentContainerStyle={{ flex: 1 }}>
        <Center flex={1}>
          {transcript ? (
            <Text color="lightText" fontSize="xl">{transcript}</Text>
          ) : (
            <Text color="lightText" fontSize="sm">
              Click start button to begin recognizing speech
            </Text>
          )}
        </Center>
      </ScrollView>
      <Progress marginHorizontal={'2%'}value={volume} />
      {!results && (
        <Button
          marginBottom={10}
          marginHorizontal={'1%'}
          isDisabled={isLoading}
          shadow={1}
          onPress={onPress}
        >
          {buttonText}
        </Button>
      )}
      {results && (
        <VStack space={0}>
          <Button
            marginBottom={5}
            marginHorizontal={'1%'}
            colorScheme="success"
            shadow={1}
            onPress={saveTranscript}
          >
            Save
          </Button>
          <Button
            marginBottom={10}
            marginHorizontal={'1%'}
            colorScheme="danger"
            shadow={1}
            onPress={discardTranscript}
          >
            Discard
          </Button>
        </VStack>
      )}
    </VStack>
  )
}

export default Transcribe
