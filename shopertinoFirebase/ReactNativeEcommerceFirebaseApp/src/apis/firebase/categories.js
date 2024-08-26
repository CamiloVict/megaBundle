import { firebase } from '../../Core/api/firebase/config'
import Category from './../../models/Category'

export const subscribeCategories = (appConfig, callback) => {
  const categoriesRef = firebase
    .firestore()
    .collection(appConfig.FIREBASE_COLLECTIONS.CATEGORIES)

  return categoriesRef.onSnapshot(querySnapshot => {
    const categories = []

    querySnapshot?.forEach(doc => {
      const data = doc.data()

      categories.push(new Category(data.id, data.name, data.photo))
    })

    return callback(categories)
  })
}
