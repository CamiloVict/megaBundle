import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, View, ActivityIndicator } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useColorScheme } from 'react-native'
import Categories from './Categories'
import NewArrivals from './NewArrivals'
import Featured from './Featured'
import BestSellers from './BestSellers'
import ProductDetailModal from '../Modals/ProductDetailModal/ProductDetailModal'
import { useTheme, useTranslations } from 'dopenative'
import { TNEmptyStateView } from '../../Core/truly-native'
import dynamicStyles from './styles'
import AppStyles from '../../AppStyles'

function Home(props) {
  const route = useRoute()
  const { localized } = useTranslations()

  const colorScheme = useColorScheme()
  const styles = dynamicStyles(colorScheme)
  const {
    navigation,
    categories,
    newArrivals,
    bestSellers,
    featured,
    shippingMethods,
    onModalCancelPress,
    onAddToBag,
    wishlist,
    user,
    isProductDetailVisible,
    product,
    appConfig,
    isLoading,
  } = props

  const emptyStateConfig = {
    title: localized('No Products'),
    description: localized('There are no products. Please check back later'),
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          color={AppStyles.colorSet[colorScheme].mainThemeForegroundColor}
        />
      </View>
    )
  }

  // if (!isLoading && !newArrivals?.length) {
  //   return (
  //     <View style={styles.emptyViewContainer}>
  //       <TNEmptyStateView
  //         appStyles={AppStyles}
  //         emptyStateConfig={emptyStateConfig}
  //       />
  //     </View>
  //   )
  // }

  const renderListHeader = () => {
    return (
      <>
        <Categories
          navigation={navigation}
          categories={categories}
          onCategoryPress={props.onCategoryPress}
        />
        <NewArrivals
          title={localized('New Arrivals')}
          dataSource={newArrivals}
          onCardPress={props.onCardPress}
          navigation={navigation}
          appConfig={appConfig}
        />
        <Featured
          onCardPress={props.onCardPress}
          featuredProducts={featured}
          title={localized('Featured')}
          appConfig={appConfig}
        />
      </>
    )
  }

  return (
    <View style={styles.container}>
      <BestSellers
        renderHeaderComponent={renderListHeader}
        onCardPress={props.onCardPress}
        bestSellerProducts={bestSellers}
        title={localized('Best Sellers')}
        navigation={navigation}
        shouldLimit={true}
        limit={10}
        appConfig={appConfig}
      />
      <ProductDetailModal
        item={product}
        visible={isProductDetailVisible}
        wishlist={wishlist}
        user={user}
        onAddToBag={onAddToBag}
        onCancelPress={onModalCancelPress}
        appConfig={appConfig}
        navigation={navigation}
        orderAPIManager={route.params.orderAPIManager}
      />
    </View>
  )
}

Home.propTypes = {
  navigation: PropTypes.object,
  categories: PropTypes.array,
  newArrivals: PropTypes.array,
  bestSellers: PropTypes.array,
  featured: PropTypes.array,
  user: PropTypes.object,
  wishlist: PropTypes.array,
  shippingMethods: PropTypes.array,
  stripeCustomer: PropTypes.string,
  onCardPress: PropTypes.func,
  onCategoryPress: PropTypes.func,
  onAddToBag: PropTypes.func,
  product: PropTypes.object,
  onModalCancelPress: PropTypes.func,
  isProductDetailVisible: PropTypes.bool,
}

export default Home
