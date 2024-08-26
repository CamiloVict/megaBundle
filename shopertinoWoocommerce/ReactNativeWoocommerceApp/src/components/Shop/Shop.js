import PropTypes from 'prop-types'
import React from 'react'
import { FlatList, View } from 'react-native'
import CategoryCard from '../CategoryCard/CategoryCard'
import { TNEmptyStateView } from '../../Core/truly-native'
import { useTranslations } from 'dopenative'
import { useColorScheme } from 'react-native'
import dynamicStyles from './styles'
import AppStyles from '../../AppStyles'

function Shop(props) {
  const colorScheme = useColorScheme()
  const styles = dynamicStyles(colorScheme)
  const { localized } = useTranslations()

  const { extraData, categories, appConfig } = props

  const onCategoryPress = item => {
    props.navigation.navigate('CategoryProductGrid', {
      title: item.name,
      categoryId: item.id,
      products: item.products,
      appConfig,
    })
  }

  const renderItem = ({ item, index }) => (
    <CategoryCard
      onCategoryPress={() => onCategoryPress(item)}
      imageContainerStyle={styles.categoryImageContainerStyle}
      key={index}
      item={item}
    />
  )

  const emptyStateConfig = {
    title: localized('No Categories'),
    description: localized('There are no categories. Please check back later'),
  }

  const renderEmptyState = () => {
    return (
      <View style={styles.emptyViewContainer}>
        <TNEmptyStateView
          appStyles={AppStyles}
          emptyStateConfig={emptyStateConfig}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={categories}
        keyExtractor={(item, index) => index.toString()}
        extraData={extraData}
        renderItem={renderItem}
        itemContainerStyle={{ alignItems: 'center' }}
        style={{ alignSelf: 'center' }}
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  )
}

Shop.propTypes = {
  navigation: PropTypes.object,
  extraData: PropTypes.object,
  categories: PropTypes.array,
}

export default Shop
