import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import uuid from 'react-native-uuid'

import {
  useCreateTranscript,
  useDeleteTranscript,
  useTranscripts,
  useUpdateTranscript,
} from '../actions/firestore.action'
import {
  getCurrentDate,
  getDefaultTitle,
  sortBy,
} from '../utils'
import { AuthContext } from './auth.context'

export const TranscriptContext = createContext()

const TranscriptContextProvider = ({ children }) => {
  const [transcripts, setTranscripts] = useState([])
  const { user } = useContext(AuthContext)
  const {
    data: transcriptsData,
    isValidating: isTranscriptsValidating,
    mutate: mutateTranscripts,
  } = useTranscripts(user)
  const { createTranscript } = useCreateTranscript()
  const {
    updateTranscript,
    isValidating: isUpdateTranscriptValidating,
  } = useUpdateTranscript()
  const { deleteTranscript } = useDeleteTranscript()

  useEffect(() => {
    if (!transcriptsData) return
    const sortedData = sortBy(
      transcriptsData,
      (transcript) => [
        -new Date(transcript.updatedAt),
        -new Date(transcript.createdAt),
        -transcript.id,
      ]
    )
    setTranscripts(sortedData)
  }, [transcriptsData])

  const addTranscriptAsync = useCallback(
    async (transcript) => {
      const now = getCurrentDate()
      const payload = {
        id: uuid.v4(),
        user: user.uid,
        title: getDefaultTitle(transcript),
        body: transcript,
        createdAt: now,
        updatedAt: now,
      }
      await createTranscript(user, payload)
      await mutateTranscripts()
    },
    [user, createTranscript, mutateTranscripts]
  )

  const updateTranscriptAsync = useCallback(
    async (transcript) => {
      const payload = {
        ...transcript,
        updatedAt: getCurrentDate(),
      }
      await updateTranscript(user, payload)
      await mutateTranscripts()
    },
    [user, updateTranscript, mutateTranscripts]
  )

  const deleteTranscriptAsync = useCallback(
    async (transcript) => {
      await deleteTranscript(user, transcript)
      await mutateTranscripts()
    },
    [user, deleteTranscript, mutateTranscripts]
  )

  return (
    <TranscriptContext.Provider
      value={{
        transcripts,
        addTranscriptAsync,
        updateTranscriptAsync,
        deleteTranscriptAsync,
        isTranscriptsValidating,
        isUpdateTranscriptValidating,
        mutateTranscripts,
      }}
    >
      {children}
    </TranscriptContext.Provider>
  )
}

export default TranscriptContextProvider
