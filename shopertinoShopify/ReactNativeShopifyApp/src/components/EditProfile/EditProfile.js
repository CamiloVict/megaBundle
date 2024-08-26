import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { useTranslations } from 'dopenative'
import PropTypes from 'prop-types'
import EditProfileItemField from './EditProfileItemField'
import { useColorScheme } from 'react-native'
import dynamicStyles from './styles'

function EditProfile(props) {
  const { localized } = useTranslations()
  const colorScheme = useColorScheme()
  const styles = dynamicStyles(colorScheme)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    props.onProfileDataChange({ firstName, lastName, phone, email })
  }, [firstName, lastName, phone, email])

  useEffect(() => {
    if (props.user) {
      const { firstName, lastName, phone, email } = props.user

      setFirstName(firstName)
      setLastName(lastName)
      setPhone(phone)
      setEmail(email)
    }
  }, [])

  const onFirstNamechange = text => {
    setFirstName(text)
  }

  const onLastNamechange = text => {
    setLastName(text)
  }

  const onPhonechange = number => {
    setPhone(number)
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.body}>
        <View style={styles.labelView}>
          <Text style={styles.label}>{localized('PUBLIC PROFILE')}</Text>
        </View>
        <View style={styles.contentView}>
          <EditProfileItemField
            onChange={onFirstNamechange}
            value={firstName}
            title={localized('First Name')}
            placeholder={localized('Your first name')}
            isEditable={true}
          />
          <View style={styles.lineView} />
          <EditProfileItemField
            onChange={onLastNamechange}
            value={lastName}
            title={localized('Last Name')}
            placeholder={localized('Your last name')}
            isEditable={true}
          />
        </View>
        <View style={styles.labelView}>
          <Text style={styles.label}>{localized('PRIVATE DETAILS')}</Text>
        </View>
        <View style={styles.contentView}>
          <EditProfileItemField
            value={email}
            title={localized('E-mail Address')}
            placeholder={localized('Your email')}
            isEditable={false}
          />
          <View style={styles.lineView} />
          <EditProfileItemField
            onChange={onPhonechange}
            value={phone}
            title={localized('Phone Number')}
            keyboardType={localized('numeric')}
            placeholder={localized('Your phone number')}
            isEditable={true}
          />
        </View>
      </View>
    </ScrollView>
  )
}

EditProfile.propTypes = {
  user: PropTypes.object,
  onProfileDataChange: PropTypes.func,
}

export default EditProfile
