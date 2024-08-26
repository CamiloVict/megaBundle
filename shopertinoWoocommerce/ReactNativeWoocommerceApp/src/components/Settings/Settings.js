import React, { useState, useRef } from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { useColorScheme } from 'react-native'
import SettingsItem from './SettingsItem'
import DataAPIManager from '../../apis/DataAPIManager'
import deviceStorage from '../../utils/deviceStorage'
import { useTranslations } from 'dopenative'
import dynamicStyles from './styles'
import AppStyles from '../../AppStyles'
import { useConfig } from '../../config'

function Settings(props) {
  const colorScheme = useColorScheme()
  const styles = dynamicStyles(colorScheme)
  const { localized } = useTranslations()
  const config = useConfig()

  const [isFaceID, setIsFaceID] = useState(false)
  const [shouldOrderUpdate, setShouldOrderUpdate] = useState(false)
  const [isNewArrivals, setIsNewArrivals] = useState(false)
  const [isPromotions, setIsPromotions] = useState(false)
  const [isSalesAlerts, setIsSalesAlerts] = useState(false)

  const dataAPIManager = useRef(new DataAPIManager(config))

  const onLogout = async () => {
    await deviceStorage.logoutDeviceStorage()
    await dataAPIManager?.current?.logout()
    await props.logout()
    props.navigation.reset({
      index: 0,
      routes: [
        {
          name: 'LoadScreen',
          params: { appStyles: AppStyles },
        },
      ],
    })
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.body}>
        <View style={styles.labelView}>
          <Text style={styles.label}>{localized('SECURITY')}</Text>
        </View>
        <View style={styles.contentView}>
          <SettingsItem
            title={localized('Enable Face ID / Touch ID Login')}
            value={isFaceID}
            onValueChange={() => setIsFaceID(!isFaceID)}
          />
        </View>
        <View style={styles.captionView}>
          <Text style={styles.caption}>
            {localized(
              'While turned off, you will not be able to login with your password',
            )}
            .
          </Text>
        </View>
        <View style={styles.labelView}>
          <Text style={styles.label}>{localized('PUSH NOTIFICATIONS')}</Text>
        </View>
        <View style={styles.contentView}>
          <SettingsItem
            title={localized('Order updates')}
            value={shouldOrderUpdate}
            onValueChange={() => setShouldOrderUpdate(!shouldOrderUpdate)}
          />
          <View style={styles.lineView} />
          <SettingsItem
            title={localized('New arrivals')}
            value={isNewArrivals}
            onValueChange={() => setIsNewArrivals(!isNewArrivals)}
          />
          <View style={styles.lineView} />
          <SettingsItem
            title={localized('Promotions')}
            value={isPromotions}
            onValueChange={() => setIsPromotions(!isPromotions)}
          />
          <View style={styles.lineView} />
          <SettingsItem
            title={localized('Sales alerts')}
            value={isSalesAlerts}
            onValueChange={() => setIsSalesAlerts(!isSalesAlerts)}
          />
        </View>
        <View style={styles.labelView}>
          <Text style={styles.label}>{localized('ACCOUNT')}</Text>
        </View>
        <View style={styles.contentView}>
          <View style={styles.itemButton}>
            <Text style={[styles.text, { color: '#384c8d' }]}>Support</Text>
          </View>
          <View style={styles.lineView} />
          <TouchableOpacity onPress={() => onLogout} style={styles.itemButton}>
            <Text style={[styles.text, { color: '#384c8d' }]}>Log out</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.labelView} />
      </ScrollView>
    </View>
  )
}

Settings.propTypes = {
  title: PropTypes.string,
  SettingsScreen: PropTypes.array,
  navigation: PropTypes.func,
  extraData: PropTypes.object,
}

export default Settings
