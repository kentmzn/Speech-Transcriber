import React, {
  createContext,
  useEffect,
  useState,
} from 'react'

import {
  useCreateUser,
  useUpdateUser,
  useUser,
} from '../actions/firestore.action'
import { parsePayload } from '../utils'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState()
  const { data: userData } = useUser(user)
  const { createUser } = useCreateUser()
  const { updateUser } = useUpdateUser()

  useEffect(() => {
    if (!user) return
    const payload = parsePayload(user)
    !userData ? createUser(payload) : updateUser(payload)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, userData])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
