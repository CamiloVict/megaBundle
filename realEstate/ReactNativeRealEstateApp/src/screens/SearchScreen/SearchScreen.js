import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { FlatList, BackHandler, Keyboard, View, Platform } from 'react-native'
import { useTheme, useTranslations } from 'dopenative'
import { listingsAPI } from '../../Core/listing/api'
import { SearchBar } from '../../Core/ui'
import dynamicStyles from './styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ListingView from '../../components/ListingView/ListingView'
import { useConfig } from '../../config'

function SearchScreen(props) {
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const config = useConfig()

  const [data, setData] = useState([])
  const [originalData, setOriginalData] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const searchRef = useRef(null)

  const insets = useSafeAreaInsets()

  useLayoutEffect(() => {
    let currentTheme = theme.colors[appearance]
    props.navigation.setOptions({
      ...Platform.select({
        ios: {
          header: () => (
            <View
              style={{
                paddingTop: insets.top,
                backgroundColor: currentTheme.primaryBackground,
                width: 800,
              }}>
              <SearchBar
                onChangeText={onSearch}
                onSearchBarCancel={onCancel}
                onSearch={onSearch}
                searchContainerStyle={styles.searchContainer}
                searchRef={searchRef}
                placeholder={localized('Search listings...')}
              />
            </View>
          ),
        },
        android: {
          headerTitle: () => (
            <SearchBar
              onChangeText={onSearch}
              onSearchBarCancel={onCancel}
              searchContainerStyle={styles.searchContainer}
              onSearch={onSearch}
              searchRef={searchRef}
              placeholder={localized('Search listings...')}
            />
          ),
        },
      }),
      headerStyle: {
        backgroundColor: currentTheme.primaryBackground,
        borderBottomColor: currentTheme.hairline,
      },
    })
  }, [originalData])

  const onCancel = () => {
    Keyboard.dismiss()
    searchRef.current.clearText()
  }

  const unsubscribe = useRef(null)
  const searchedText = useRef(null)
  const willBlurSubscription = useRef(null)
  const didFocusSubscription = useRef(
    props.navigation.addListener('focus', payload =>
      BackHandler.addEventListener(
        'hardwareBackPress',
        onBackButtonPressAndroid,
      ),
    ),
  )

  useEffect(() => {
    unsubscribe.current = listingsAPI.subscribeListings(
      {},
      null,
      config.serverConfig.collections.listings,
      onListingsUpdate,
    )

    willBlurSubscription.current = props.navigation.addListener(
      'blur',
      payload =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onBackButtonPressAndroid,
        ),
    )
    return () => {
      unsubscribe?.current && unsubscribe?.current()
      didFocusSubscription.current && didFocusSubscription.current()
      willBlurSubscription.current && willBlurSubscription.current()
    }
  }, [])

  const onSearch = text => {
    searchedText.current = text
    filterByCurrentKeyword(originalData)
  }

  const filterByCurrentKeyword = originalData => {
    const data = []
    if (!originalData) {
      return
    }
    var text =
      searchedText.current !== null
        ? searchedText.current.toLowerCase().trim()
        : ''
    originalData.forEach(listing => {
      if (listing?.title) {
        var index = listing.title.toLowerCase().search(text)
        if (index !== -1) {
          data.push(listing)
        }
      }
    })
    setData(data)
  }

  const onListingsUpdate = listingsData => {
    setOriginalData(listingsData)
    filterByCurrentKeyword(listingsData)
  }

  const onBackButtonPressAndroid = () => {
    BackHandler.exitApp()
    return true
  }

  const onListingPress = listing => {
    props.navigation.navigate('SearchDetail', {
      item: listing,
      customLeft: true,
      headerLeft: () => <View />,
      routeName: 'Search',
    })
  }

  const renderListing = ({ item, index }) => {
    return (
      <ListingView
        listing={item}
        onPress={() => onListingPress(item)}
        index={index}
      />
    )
  }

  return (
    <FlatList
      data={data}
      style={styles.container}
      renderItem={renderListing}
      keyExtractor={item => `${item.id}`}
      initialNumToRender={5}
      refreshing={refreshing}
      keyboardDismissMode="on-drag"
    />
  )
}

export default SearchScreen
