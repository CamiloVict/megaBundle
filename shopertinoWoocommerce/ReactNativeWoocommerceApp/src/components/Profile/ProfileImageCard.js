import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { useColorScheme } from 'react-native'
import dynamicStyles from './styles'
import FastImage from 'react-native-fast-image'

function ProfileImageCard(props) {
  const colorScheme = useColorScheme()
  const styles = dynamicStyles(colorScheme)

  const { user } = props
  const lastName = user.lastName ? user.lastName : ''
  const fullName = `${user.firstName ?? ''} ${lastName ?? ''}`

  const defaultProfilePhotoURL =
    'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg'

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardImageContainer}>
        <FastImage
          style={styles.cardImage}
          source={{
            uri:
              user.photoURI || user.profilePictureURL || defaultProfilePhotoURL,
          }}
        />
      </View>
      <View style={styles.cardNameContainer}>
        <Text style={styles.cardName}>{fullName?.trimEnd() || user.name}</Text>
      </View>
    </View>
  )
}

ProfileImageCard.propTypes = {
  title: PropTypes.string,
  navigation: PropTypes.func,
  extraData: PropTypes.object,
  user: PropTypes.object,
}

export default ProfileImageCard
