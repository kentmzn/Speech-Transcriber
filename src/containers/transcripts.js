import { useNavigation } from '@react-navigation/core'
import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'

import AlertDialog from '../components/AlertDialog'
import { TranscriptContext } from '../contexts/transcript.context'
import TranscriptsScreen from '../screens/transcripts.screen'

const Transcripts = () => {
  const {
    transcripts,
    deleteTranscriptAsync,
    isTranscriptsValidating,
    mutateTranscripts,
  } = useContext(TranscriptContext)

  const navigation = useNavigation()

  const viewTranscript = (transcript) => {
    navigation.navigate('View Transcript', { transcript })
  }

  const [transcript, setTranscript] = useState()
  const isOpen = useMemo(() => !!transcript, [transcript])
  const cancelRef = useRef(null)

  const onDelete = (transcript) => {
    setTranscript(transcript)
  }

  const onCancel = () => {
    setTranscript()
  }

  const onConfirm = useCallback(() => {
    const payload = transcript
    setTranscript()
    deleteTranscriptAsync(payload)
  }, [deleteTranscriptAsync, transcript])

  return (
    <>
      <TranscriptsScreen
        isTranscriptsValidating={isTranscriptsValidating}
        mutateTranscripts={mutateTranscripts}
        transcripts={transcripts}
        viewTranscript={viewTranscript}
        onDelete={onDelete}
      />
      <AlertDialog
        body="This will remove your transcript. This action
      cannot be reversed. Deleted transcript cannot be
      recovered."
        confirm="Delete"
        header="Delete Transcript"
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        status="danger"
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </>
  )
}

export default Transcripts
