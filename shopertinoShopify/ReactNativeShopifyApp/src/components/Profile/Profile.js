import React from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView } from 'react-native'
import ProfileImageCard from './ProfileImageCard'
import ProfileItem from './ProfileItem'
import FooterButton from '../FooterButton/FooterButton'
import AppStyles from '../../AppStyles'
import { useColorScheme } from 'react-native'
import { useTranslations } from 'dopenative'
import dynamicStyles from './styles'

function Profile(props) {
  const colorScheme = useColorScheme()
  const styles = dynamicStyles(colorScheme)
  const { localized } = useTranslations()
  const { user, onItemPress, onLogout } = props

  return (
    <View style={styles.container}>
      <View style={styles.profileCardContainer}>
        <ProfileImageCard user={user} />
      </View>
      <View style={styles.profileItemContainer}>
        <ScrollView>
          <ProfileItem
            title={localized('Account Details')}
            onPress={() => onItemPress('EditProfile', 'Edit Profile')}
            itemIconStyle={{ tintColor: '#6b7be8' }}
            iconSource={AppStyles.iconSet.accountDetail}
          />
          <ProfileItem
            title={localized('WishList')}
            itemIconStyle={{ tintColor: '#df9292' }}
            onPress={() => onItemPress('Wishlist')}
            iconSource={AppStyles.iconSet.wishlistFilled}
          />
          <ProfileItem
            title={localized('Order History')}
            onPress={() => onItemPress('Order')}
            itemIconStyle={{ tintColor: '#baa3f3' }}
            iconSource={AppStyles.iconSet.orderDrawer}
          />
          <ProfileItem
            title={localized('Settings')}
            onPress={() => onItemPress('Settings')}
            itemIconStyle={{ tintColor: '#a6a4b1' }}
            iconSource={AppStyles.iconSet.settings}
          />
          <ProfileItem
            title={localized('Contact Us')}
            onPress={() => onItemPress('Contact', 'Contact Us')}
            itemIconStyle={{ tintColor: '#9ee19f' }}
            iconSource={AppStyles.iconSet.contactUs}
          />
        </ScrollView>
      </View>
      <View style={styles.footerButtonContainer}>
        <FooterButton
          footerContainerStyle={styles.footerContainerStyle}
          title={localized('Logout')}
          onPress={onLogout}
        />
      </View>
    </View>
  )
}

Profile.propTypes = {
  title: PropTypes.string,
  ProfileScreen: PropTypes.array,
  navigation: PropTypes.object,
  user: PropTypes.object,
  onLogout: PropTypes.func,
  onItemPress: PropTypes.func,
}

export default Profile
