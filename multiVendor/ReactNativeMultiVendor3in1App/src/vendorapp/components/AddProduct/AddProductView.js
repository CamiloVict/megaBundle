import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  Modal,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { useTheme, useTranslations } from 'dopenative'
import TextButton from 'react-native-button'
import dynamicStyles from './styles'
import Icon from 'react-native-vector-icons/FontAwesome'
import ImagePicker from 'react-native-image-crop-picker'
import FastImage from 'react-native-fast-image'
import { TNActivityIndicator } from '../../../Core/truly-native'
import ActionSheet from 'react-native-actionsheet'
import { storageAPI } from '../../../Core/media'
import ModalSelector from 'react-native-modal-selector'
import { useConfig } from '../../../config'

export function AddProductView(props) {
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const config = useConfig()

  const { initialProduct, categoryData } = props

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState({ title: localized('Select...') })
  const [price, setPrice] = useState('10')
  const [localPhotos, setLocalPhotos] = useState([])
  const [uploadedPhotos, setUploadedPhotos] = useState([])
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null)
  const [loading, setLoading] = useState(false)

  const actionsheetRef = useRef(null)

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name)
      setDescription(initialProduct.description)
      setUploadedPhotos(initialProduct.photos)
      setPrice(initialProduct.price)
    }
  }, [])

  useEffect(() => {
    if (initialProduct && !config.isMultiVendorEnabled) {
      setCategory(
        categoryData.find(
          category => initialProduct.categoryID === category.id,
        ),
      )
    }
  }, [categoryData])

  const onPressAddPhotoBtn = () => {
    // More info on all the options is below in the API Reference... just some common use cases shown here
    const options = {
      title: localized('Select a photo'),
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }

    ImagePicker.openPicker({
      cropping: false,
      multiple: false,
    })
      .then(response => {
        setLocalPhotos([...localPhotos, response])
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const onRemoveLocalPhoto = index => {
    if (index == 0) {
      var array = [...localPhotos]
      array.splice(selectedPhotoIndex, 1)
      setLocalPhotos(array)
    }
  }

  const showActionSheet = async index => {
    await setSelectedPhotoIndex(index)
    actionsheetRef.current.show()
  }

  const photos = localPhotos.map((photo, index) => (
    <TouchableOpacity
      key={index.toString()}
      onPress={() => {
        showActionSheet(index)
      }}>
      <FastImage style={styles.photo} source={{ uri: photo?.sourceURL }} />
    </TouchableOpacity>
  ))

  const onlinePhotos = uploadedPhotos.map((photo, index) => (
    <TouchableOpacity
      key={index.toString()}
      onPress={() => {
        showActionSheet(index)
      }}>
      <FastImage style={styles.photo} source={{ uri: photo }} />
    </TouchableOpacity>
  ))

  const onCancel = () => {
    props.onCancel()
  }

  const onPost = () => {
    if (!name) {
      alert(localized('Title was not provided.'))
      return
    }
    if (!description) {
      alert(localized('Description was not set.'))
      return
    }
    if (!price) {
      alert(localized('Price is empty.'))
      return
    }
    if (localPhotos?.length == 0 && uploadedPhotos?.length == 0) {
      alert(localized('Please choose at least one photo.'))
      return
    }
    setLoading(true)

    let photoUrls = [...uploadedPhotos]

    const uploadPromiseArray = []
    localPhotos.forEach(file => {
      if (!file?.uri?.startsWith('https://')) {
        uploadPromiseArray.push(
          new Promise((resolve, reject) => {
            storageAPI.processAndUploadMediaFile(file).then(
              response => {
                if (response.downloadURL) {
                  photoUrls.push(response.downloadURL)
                }
                resolve()
              },
              error => {
                reject()
              },
            )
          }),
        )
      }
    })

    Promise.all(uploadPromiseArray)
      .then(values => {
        var uploadObject = {
          name: name,
          price: price,
          photo: photoUrls.length > 0 ? photoUrls[0] : null,
          photos: photoUrls,
          description,
        }
        if (!config.isMultiVendorEnabled) {
          uploadObject.categoryID = category.id
        }
        if (initialProduct) {
          props.onUpdate({
            id: initialProduct.id,
            ...uploadObject,
          })
        } else {
          props.addProduct(uploadObject)
        }
        onCancel()
        setLoading(false)
      })
      .catch(reason => {
        onCancel()
        console.log(reason)
        setLoading(false)
        alert(reason)
      })
  }

  return (
    <Modal
      visible={props.isVisible}
      animationType="slide"
      onRequestClose={onCancel}>
      <View style={[styles.bar, styles.navBarContainer]}>
        <Text style={styles.headerTitle}>{localized('Add Product')}</Text>
        <TextButton
          style={[styles.rightButton, styles.selectorRightButton]}
          onPress={onCancel}>
          {localized('Cancel')}
        </TextButton>
      </View>
      <ScrollView style={styles.body}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{localized('Title')}</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={text => setName(text)}
            placeholder="Start typing"
            placeholderTextColor={theme.colors[appearance].grey6}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{localized('Description')}</Text>
          <TextInput
            multiline={true}
            numberOfLines={2}
            style={styles.input}
            onChangeText={text => setDescription(text)}
            value={description}
            placeholder="Start typing"
            placeholderTextColor={theme.colors[appearance].grey6}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.title}>{localized('Price')}</Text>
            <TextInput
              style={styles.priceInput}
              keyboardType="numeric"
              value={price}
              onChangeText={text => setPrice(text)}
              placeholderTextColor={theme.colors[appearance].grey6}
              underlineColorAndroid="transparent"
            />
          </View>
          {!config.isMultiVendorEnabled && (
            <ModalSelector
              touchableActiveOpacity={0.9}
              data={categoryData}
              sectionTextStyle={styles.sectionTextStyle}
              optionTextStyle={styles.optionTextStyle}
              optionContainerStyle={styles.optionContainerStyle}
              cancelContainerStyle={styles.cancelContainerStyle}
              cancelTextStyle={styles.cancelTextStyle}
              selectedItemTextStyle={styles.selectedItemTextStyle}
              backdropPressToClose={true}
              cancelText={localized('Cancel')}
              initValue={category?.title ?? localized('Select...')}
              onChange={option => {
                setCategory({ id: option.id, title: option.title })
              }}>
              <View style={styles.row}>
                <Text style={styles.title}>{localized('Category')}</Text>
                <Text style={styles.value}>
                  {category?.title ?? localized('Select...')}
                </Text>
              </View>
            </ModalSelector>
          )}
          <Text style={styles.addPhotoTitle}>{localized('Add Photos')}</Text>
          <ScrollView style={styles.photoList} horizontal={true}>
            {photos}
            {onlinePhotos}
            <TouchableOpacity onPress={onPressAddPhotoBtn}>
              <View style={[styles.addButton, styles.photo]}>
                <Icon name="camera" size={30} color="white" />
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
        {loading ? (
          <TNActivityIndicator />
        ) : (
          <TextButton
            containerStyle={styles.addButtonContainer}
            onPress={onPost}
            style={styles.addButtonText}>
            {initialProduct
              ? localized('Update Product')
              : localized('Add Product')}
          </TextButton>
        )}
      </ScrollView>

      <ActionSheet
        ref={actionsheetRef}
        options={[localized('Remove Photo'), localized('Cancel')]}
        cancelButtonIndex={1}
        destructiveButtonIndex={0}
        onPress={index => {
          onRemoveLocalPhoto(index)
        }}
      />
    </Modal>
  )
}
