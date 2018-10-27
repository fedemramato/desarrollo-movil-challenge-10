import { db, auth } from './index'

export const usersCollection = db.collection('users')

export const setUserPushToken = async push_token => {
  const userId = await auth.currentUser.uid
  usersCollection.doc(userId).set({
    push_token,
  })
}
