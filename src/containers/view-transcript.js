import {
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Keyboard } from 'react-native'

import { useTranscript } from '../actions/firestore.action'
import { AuthContext } from '../contexts/auth.context'
import { TranscriptContext } from '../contexts/transcript.context'
import ViewTranscriptScreen from '../screens/view-transcript.screen'
import { parsePayload } from '../utils'

const ViewTranscript = () => {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()
  const { user } = useContext(AuthContext)
  const route = useRoute()
  const transcript = route.params.transcript
  const {
    data: transcriptData,
    isValidating: isTranscriptValidating,
    mutate: mutateTranscript,
  } = useTranscript(user, transcript)
  const { updateTranscriptAsync } = useContext(
    TranscriptContext
  )
  const [title, setTitle] = useState()
  const [body, setBody] = useState()
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!transcriptData) return
    setTitle(transcriptData.title)
    setBody(transcriptData.body)
  }, [transcriptData])

  const onEditTitle = (title) => setTitle(title)
  const onEditBody = (body) => setBody(body)

  const isEdited = useMemo(() => {
    if (!transcriptData) return false
    if (title !== transcriptData.title) return true
    if (body !== transcriptData.body) return true
    return false
  }, [transcriptData, title, body])

  const onSave = useCallback(async () => {
    setIsSaving(true)
    Keyboard.dismiss()
    const payload = parsePayload({
      ...transcriptData,
      title,
      body,
    })
    await updateTranscriptAsync(payload)
    await mutateTranscript()
    setIsSaving(false)
  }, [
    updateTranscriptAsync,
    transcriptData,
    title,
    body,
    mutateTranscript,
  ])

  return (
    <ViewTranscriptScreen
      goBack={goBack}
      isEdited={isEdited}
      isSaving={isSaving}
      isTranscriptValidating={isTranscriptValidating}
      transcript={transcriptData}
      onEditBody={onEditBody}
      onEditTitle={onEditTitle}
      onRefresh={mutateTranscript}
      onSave={onSave}
    />
  )
}

export default ViewTranscript
