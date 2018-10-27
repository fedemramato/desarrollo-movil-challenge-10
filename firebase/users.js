import { db, auth } from './index'

export const usersCollection = db.collection('users')

export const setUserPushToken = push_token => {
  const userId = auth.currentUser.uid
  usersCollection.doc(userId).set({
    push_token,
  })
}
