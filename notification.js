import { Permissions, Notifications } from 'expo'
import { setUserPushToken } from './firebase/users'

export async function registerForNotification() {
  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
  let finalStatus = existingStatus

  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    finalStatus = status
  }

  if (finalStatus !== 'granted') {
    return
  }

  let token = await Notifications.getExpoPushTokenAsync()

  setUserPushToken(token)
}
