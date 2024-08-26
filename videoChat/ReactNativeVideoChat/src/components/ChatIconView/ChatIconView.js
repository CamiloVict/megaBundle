import React, { useState } from 'react'
import { Image, View } from 'react-native'
import { useTheme } from 'dopenative'
import dynamicStyles from './styles'
export default function ChatIconView(props) {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const [isImgErr, setIsImgErr] = useState(false)
  const [isSecondImgErr, setIsSecondImgErr] = useState(false)

  const onImageError = () => {
    setIsImgErr(true)
  }

  return (
    <View style={styles.container}>
      {props.participants.length == 0 && (
        <View style={[styles.singleParticipation]}>
          <Image
            style={styles.singleChatItemIcon}
            source={theme.icons.userAvatar}
          />
        </View>
      )}
      {props.participants.length == 1 && (
        <View
          style={[
            styles.singleParticipation,
            props.style,

            {
              borderWidth: props.friendsIconStyle ? 1.5 : 0,
              borderColor: '#6b7be8',
            },
          ]}>
          <Image
            style={[
              styles.singleChatItemIcon,
              props.imageStyle,
              props.friendsIconStyle,
            ]}
            onError={onImageError}
            source={
              isImgErr == false
                ? {
                    uri:
                      props.participants[0].profilePictureURL ||
                      props.participants[0].senderProfilePictureURL,
                  }
                : theme.icons.userAvatar
            }
          />
          {props.participants[0].isOnline && <View style={styles.onlineMark} />}
        </View>
      )}
      {props.participants.length > 1 && (
        <View style={styles.multiParticipation}>
          <Image
            style={[styles.multiPaticipationIcon, styles.bottomIcon]}
            onError={onImageError}
            source={
              isImgErr == false
                ? { uri: props.participants[0].profilePictureURL }
                : theme.icons.userAvatar
            }
          />
          <View style={styles.middleIcon} />
          <Image
            style={[styles.multiPaticipationIcon, styles.topIcon]}
            onError={() => setIsSecondImgErr(true)}
            source={
              isSecondImgErr == false
                ? { uri: props.participants[1].profilePictureURL }
                : theme.icons.userAvatar
            }
          />
        </View>
      )}
    </View>
  )
}
