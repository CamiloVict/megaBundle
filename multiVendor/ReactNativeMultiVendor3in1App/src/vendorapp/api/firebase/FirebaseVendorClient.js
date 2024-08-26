import firestore from '@react-native-firebase/firestore'

export const subscribeToVendorProducts = (
  vendorProductsTableName,
  vendorID,
  callback,
) => {
  // The current user (viewer) is the admin of a vendor, so they can manage all the products
  if (!vendorID) {
    return null
  }

  return firestore()
    .collection(vendorProductsTableName)
    .where('vendorID', '==', vendorID)
    .onSnapshot(
      querySnapshot => {
        const vendorProducts = []
        querySnapshot?.forEach(doc => {
          vendorProducts.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        callback?.(vendorProducts)
      },
      error => {
        console.warn(error)
      },
    )
}

export const subscribeToCategories = (vendorCategoriesTableName, callback) => {
  const categoriesRef = firestore().collection(vendorCategoriesTableName)

  return categoriesRef.onSnapshot(
    querySnapshot => {
      const categories = []
      querySnapshot?.forEach(doc => {
        categories.push({
          id: doc.id,
          key: doc.id,
          label: doc.data().title,
          ...doc.data(),
        })
      })
      callback?.(categories)
    },
    error => {
      console.log(error)
    },
  )
}

export const updateProduct = async (vendorProductsTableName, product) => {
  if (!product?.id) {
    return null
  }
  return firestore()
    .collection(vendorProductsTableName)
    .doc(product.id)
    .update(product)
}

export const deleteProduct = async (
  vendorProductsTableName,
  productID,
  callback,
) => {
  firestore()
    .collection(vendorProductsTableName)
    .doc(productID)
    .delete()
    .then(result => {
      callback()
      console.warn(result)
    })
    .catch(error => {
      callback()
      console.warn(error)
    })
}

export const addProduct = async (vendorProductsTableName, product) => {
  const productsRef = firestore().collection(vendorProductsTableName)

  const ref = await productsRef.add(product)
  await productsRef.doc(ref.id).update({ id: ref.id })
}
