import React, { useContext } from 'react'

import { useSignOut } from '../actions/auth.action'
import { AuthContext } from '../contexts/auth.context'
import SettingsScreen from '../screens/settings.screen'

const Settings = () => {
  const { signOut, isValidating } = useSignOut()
  const { user } = useContext(AuthContext)

  return (
    <SettingsScreen
      isValidating={isValidating}
      signOut={signOut}
      user={user}
    />
  )
}

export default Settings
