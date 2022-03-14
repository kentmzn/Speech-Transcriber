import { format } from 'date-fns'
import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  HStack,
  Pressable,
  Text,
  VStack,
} from 'native-base'
import React from 'react'
import { RefreshControl } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'

const Transcripts = ({
  transcripts,
  viewTranscript,
  onDelete,
  isTranscriptsValidating,
  mutateTranscripts,
}) => {
  return (
    <VStack bg={["#2D97DA","#2249D6"]} flex={1} space={4}>
      <Center><Heading color="light.100" p={5} pb={0}>
        Transcripts
      </Heading></Center>
      {transcripts.length > 0 ? (
        <SwipeListView
          ItemSeparatorComponent={() => (
            <Box px={5}>
              <Divider />
            </Box>
          )}
          data={transcripts}
          keyExtractor={(transcript) => transcript.id}
          refreshControl={
            <RefreshControl
              refreshing={isTranscriptsValidating}
              onRefresh={mutateTranscripts}
            />
          }
          renderHiddenItem={({ item: transcript }) => (
            <HStack
              alignItems="center"
              h="full"
              justifyContent="flex-end"
              px={5}
              py={2}
              space={4}
            >
              <Button
                _text={{ fontSize: 'xs' }}
                colorScheme="danger"
                variant="subtle"
                onPress={() => onDelete(transcript)}
              >
                Delete
              </Button>
            </HStack>
          )}
          renderItem={({ item: transcript }) => (
            <Pressable
              bg={["#2D97DA","#2249D6"]}
              px={5}
              py={2}
              onPress={() => viewTranscript(transcript)}
            >
              <HStack alignItems="center" space={4}>
                <Text color="light.100" fontSize="2xs">
                  {format(
                    new Date(transcript.updatedAt),
                    'PPp'
                  )}
                </Text>
                <VStack flex={1}>
                  <Text color="light.100" fontWeight="bold" numberOfLines={1}>
                    {transcript.title}
                  </Text>
                  <Text color="light.100" numberOfLines={1}>
                    {transcript.body}
                  </Text>
                </VStack>
              </HStack>
            </Pressable>
          )}
          rightOpenValue={-100}
          stopLeftSwipe={100}
        />
      ) : (
        <Center flex={1}>
          <Text color="gray.500" fontWeight="bold">
            Empty
          </Text>
        </Center>
      )}
    </VStack>
  )
}

export default Transcripts
