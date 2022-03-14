import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/core'
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { useSignInWithGoogle } from '../actions/auth.action'
import { AuthContext } from '../contexts/auth.context'
import SignInScreen from '../screens/sign-in.screen'

const Authentication = () => {
  const navigation = useNavigation()
  const { signInWithGoogle, isValidating } =
    useSignInWithGoogle()
  const { user, setUser } = useContext(AuthContext)
  const [initializing, setInitializing] = useState(true)

  const onAuthStateChanged = useCallback(
    (user) => {
      setUser(user)
      if (initializing) setInitializing(false)
    },
    [setUser, initializing]
  )

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(
      onAuthStateChanged
    )
    return subscriber
  }, [onAuthStateChanged])

  useEffect(() => {
    user
      ? navigation.navigate('App')
      : navigation.navigate('Auth')
  }, [navigation, user])

  if (initializing || user) return null

  return (
    <SignInScreen
      isValidating={isValidating}
      signInWithGoogle={signInWithGoogle}
    />
  )
}

export default Authentication
