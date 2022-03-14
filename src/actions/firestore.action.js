import firestore from '@react-native-firebase/firestore'
import { useCallback, useEffect, useState } from 'react'

import { COLLECTIONS } from '../constants'
import {
  parseCollectionData,
  parseTranscriptDoc,
  parseUserDoc,
} from '../utils'

export const useUser = (user) => {
  const [data, setData] = useState()
  const [isValidating, setIsValidating] = useState()
  const [error, setError] = useState()

  const mutate = useCallback(async () => {
    setIsValidating(true)
    const userDoc = parseUserDoc(user)
    const doc = await firestore()
      .collection(COLLECTIONS.USERS)
      .doc(userDoc)
      .get()
    const data = doc.data()
    setData(data)
    setIsValidating(false)
  }, [user])

  useEffect(() => {
    if (!user) return
    try {
      mutate()
    } catch (error) {
      setError(error)
    }
  }, [user, mutate])

  return { data, isValidating, error }
}

export const useCreateUser = () => {
  const [data, setData] = useState()
  const [isValidating, setIsValidating] = useState()
  const [error, setError] = useState()

  const createUser = async (user) => {
    setIsValidating(true)
    try {
      const doc = parseUserDoc(user)
      await firestore()
        .collection(COLLECTIONS.USERS)
        .doc(doc)
        .set(user)
      setData('User created')
    } catch (error) {
      setError(error)
    }
    setIsValidating(false)
  }

  return { createUser, data, isValidating, error }
}

export const useUpdateUser = () => {
  const [data, setData] = useState()
  const [isValidating, setIsValidating] = useState()
  const [error, setError] = useState()

  const updateUser = async (user) => {
    setIsValidating(true)
    try {
      const doc = parseUserDoc(user)
      await firestore()
        .collection(COLLECTIONS.USERS)
        .doc(doc)
        .update(user)
      setData('User updated')
    } catch (error) {
      setError(error)
    }
    setIsValidating(false)
  }

  return { updateUser, data, isValidating, error }
}

export const useTranscripts = (user) => {
  const [data, setData] = useState()
  const [isValidating, setIsValidating] = useState()
  const [error, setError] = useState()

  const mutate = useCallback(async () => {
    setIsValidating(true)
    const doc = parseUserDoc(user)
    const collection = await firestore()
      .collection(COLLECTIONS.USERS)
      .doc(doc)
      .collection(COLLECTIONS.TRANSCRIPTS)
      .get()
    const data = parseCollectionData(collection)
    setData(data)
    setIsValidating(false)
  }, [user])

  useEffect(() => {
    if (!user) return
    try {
      mutate()
    } catch (error) {
      setError(error)
    }
  }, [user, mutate])

  return { data, isValidating, error, mutate }
}

export const useTranscript = (user, transcript) => {
  const [data, setData] = useState()
  const [isValidating, setIsValidating] = useState()
  const [error, setError] = useState()

  const mutate = useCallback(async () => {
    setIsValidating(true)
    const userDoc = parseUserDoc(user)
    const transcriptDoc = parseTranscriptDoc(transcript)
    const doc = await firestore()
      .collection(COLLECTIONS.USERS)
      .doc(userDoc)
      .collection(COLLECTIONS.TRANSCRIPTS)
      .doc(transcriptDoc)
      .get()
    const data = doc.data()
    setData(data)
    setIsValidating(false)
  }, [user, transcript])

  useEffect(() => {
    if (!user) return
    try {
      mutate()
    } catch (error) {
      setError(error)
    }
  }, [user, mutate])

  return { data, isValidating, error, mutate }
}

export const useCreateTranscript = () => {
  const [data, setData] = useState()
  const [isValidating, setIsValidating] = useState()
  const [error, setError] = useState()

  const createTranscript = async (user, transcript) => {
    setIsValidating(true)
    try {
      const userDoc = parseUserDoc(user)
      const transcriptDoc = parseTranscriptDoc(transcript)
      await firestore()
        .collection(COLLECTIONS.USERS)
        .doc(userDoc)
        .collection(COLLECTIONS.TRANSCRIPTS)
        .doc(transcriptDoc)
        .set(transcript)
      setData('Transcript created')
    } catch (error) {
      setError(error)
    }
    setIsValidating(false)
  }

  return { createTranscript, data, isValidating, error }
}

export const useUpdateTranscript = () => {
  const [data, setData] = useState()
  const [isValidating, setIsValidating] = useState()
  const [error, setError] = useState()

  const updateTranscript = async (user, transcript) => {
    setIsValidating(true)
    try {
      const userDoc = parseUserDoc(user)
      const transcriptDoc = parseTranscriptDoc(transcript)
      await firestore()
        .collection(COLLECTIONS.USERS)
        .doc(userDoc)
        .collection(COLLECTIONS.TRANSCRIPTS)
        .doc(transcriptDoc)
        .update(transcript)
      setData('Transcript updated')
    } catch (error) {
      setError(error)
    }
    setIsValidating(false)
  }

  return { updateTranscript, data, isValidating, error }
}

export const useDeleteTranscript = () => {
  const [data, setData] = useState()
  const [isValidating, setIsValidating] = useState()
  const [error, setError] = useState()

  const deleteTranscript = async (user, transcript) => {
    setIsValidating(true)
    try {
      const userDoc = parseUserDoc(user)
      const transcriptDoc = parseTranscriptDoc(transcript)
      await firestore()
        .collection(COLLECTIONS.USERS)
        .doc(userDoc)
        .collection(COLLECTIONS.TRANSCRIPTS)
        .doc(transcriptDoc)
        .delete()
      setData('Transcript deleted')
    } catch (error) {
      setError(error)
    }
    setIsValidating(false)
  }

  return { deleteTranscript, data, isValidating, error }
}
