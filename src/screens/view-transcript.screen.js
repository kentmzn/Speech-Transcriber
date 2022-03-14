import { format } from 'date-fns'
import {
  Button,
  Center,
  HStack,
  Icon,
  Input,
  Link,
  Spinner,
  Text,
  TextArea,
  VStack,
} from 'native-base'
import React, { useMemo } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'

const ViewTranscript = ({
  transcript,
  goBack,
  isEdited,
  onEditTitle,
  onEditBody,
  onSave,
  isSaving,
  isTranscriptValidating,
}) => {
  const isLoading = useMemo(
    () => isSaving || isTranscriptValidating,
    [isSaving, isTranscriptValidating]
  )

  const hasSaveButton = useMemo(
    () => !isLoading && isEdited,
    [isLoading, isEdited]
  )

  return (
    <VStack bg="white" flex={1} p={5} space={4}>
      <HStack justifyContent="space-between">
        <Link onPress={goBack}>
          <HStack alignItems="center" space="1">
            <Icon as={AntDesign} name="left" size="xs" />
            <Text>Transcripts</Text>
          </HStack>
        </Link>
        {isLoading && <Spinner />}
        {hasSaveButton && (
          <Button p={0} variant="unstyled" onPress={onSave}>
            Save
          </Button>
        )}
      </HStack>
      <Center>
        <Text
          color="gray.500"
          fontSize="xs"
          lineHeight="xs"
        >
          {transcript?.updatedAt &&
            `${format(
              new Date(transcript?.updatedAt),
              'MMMM d, yyyy'
            )} at ${format(
              new Date(transcript?.updatedAt),
              'p'
            )}`}
        </Text>
      </Center>
      <VStack flex={1}>
        <Input
          defaultValue={transcript?.title}
          fontSize="sm"
          fontWeight="bold"
          placeholder="Title"
          variant="unstyled"
          onChangeText={onEditTitle}
        />
        <TextArea
          defaultValue={transcript?.body}
          flex={1}
          fontSize="sm"
          placeholder="Body"
          variant="unstyled"
          onChangeText={onEditBody}
        />
      </VStack>
    </VStack>
  )
}

export default ViewTranscript
