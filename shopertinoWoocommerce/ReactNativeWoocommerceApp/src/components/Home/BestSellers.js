import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import ProductGrid from '../ProductGrid/ProductGrid'
import FooterButton from '../FooterButton/FooterButton'
import { useColorScheme } from 'react-native'
import { useTheme, useTranslations } from 'dopenative'
import dynamicStyles from './styles'

function BestSellers(props) {
  const colorScheme = useColorScheme()
  const styles = dynamicStyles(colorScheme)
  const { localized } = useTranslations()

  const {
    bestSellerProducts,
    title,
    extraData,
    onCardPress,
    shouldLimit,
    limit,
    appConfig,
    renderHeaderComponent,
  } = props

  const onFooterPress = () => {
    props.navigation.navigate('CategoryProductGrid', {
      title: localized('Best Sellers'),
      products: bestSellerProducts,
      appConfig,
    })
  }

  const renderlistFooter = () => (
    <FooterButton
      onPress={() => onFooterPress()}
      title={localized('Browse all')}
    />
  )

  const renderListHeader = () => (
    <>
      {renderHeaderComponent?.()}
      <View style={styles.unitContainer}>
        <Text style={styles.unitTitle}>{title}</Text>
      </View>
    </>
  )

  const data = [...bestSellerProducts]

  return (
    <ProductGrid
      products={shouldLimit ? data.splice(0, limit) : data}
      onCardPress={onCardPress}
      extraData={extraData}
      ListFooterComponent={renderlistFooter}
      ListHeaderComponent={renderListHeader}
      itemContainerStyle={{ alignItems: 'center' }}
      appConfig={appConfig}
    />
  )

  return (
    <>
      {/* {renderListHeader?.()} */}
      <View style={styles.unitContainer}>
        <Text style={styles.unitTitle}>{title}</Text>
        <ProductGrid
          products={shouldLimit ? data.splice(0, limit) : data}
          onCardPress={onCardPress}
          extraData={extraData}
          ListFooterComponent={renderlistFooter}
          ListHeaderComponent={renderListHeader}
          itemContainerStyle={{ alignItems: 'center' }}
          appConfig={appConfig}
        />
      </View>
    </>
  )
}

BestSellers.propTypes = {
  title: PropTypes.string,
  bestSellerProducts: PropTypes.array,
  navigation: PropTypes.object,
  extraData: PropTypes.object,
  onCardPress: PropTypes.func,
  shouldLimit: PropTypes.bool,
  limit: PropTypes.number,
}

export default BestSellers
