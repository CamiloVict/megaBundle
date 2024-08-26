import { firebase } from '../../Core/api/firebase/config'
import Product from './../../models/Product'

export const subscribeProducts = (appConfig, callback) => {
  const productsRef = firebase
    .firestore()
    .collection(appConfig.FIREBASE_COLLECTIONS.PRODUCTS)

  return productsRef.onSnapshot(querySnapshot => {
    const products = []

    querySnapshot?.forEach(doc => {
      const data = doc.data()

      products.push(
        new Product(
          data.id,
          data.name,
          data.price,
          data.description,
          data.photo,
          data.details,
          [data.category],
          data.colors,
          data.sizes,
        ),
      )
    })

    return callback(products)
  })
}
