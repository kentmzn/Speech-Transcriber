import sortBy from './schwartzianTransform/sort-by'

export const getCurrentDate = () => new Date().toISOString()

export const getDefaultTitle = (str) =>
  str.length > 40 ? `${str.slice(0, 40)}...` : str

export const parseUserDoc = (user) => user.uid

export const parseTranscriptDoc = (transcript) =>
  transcript.id

export const parsePayload = (payload) =>
  JSON.parse(JSON.stringify(payload))

export const parseCollectionData = (collection) =>
  collection.docs.map((doc) => doc.data())

export { sortBy }
