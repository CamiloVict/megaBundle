const functions = require('firebase-functions')
const admin = require('firebase-admin')
// admin.initializeApp();

const apn = require('apn')
const { fetchUser } = require('./core/user')
const { sendPushNotification } = require('./notifications/utils')

exports.sendPushKitNotificationOnUserUpdate = functions.firestore
  .document('users/{userID}/call_data/{callDataID}')
  .onWrite((change, context) => {
    const callData = change.after.data()
    if (!callData) {
      console.log('nope b')
      return
    }

    console.log(
      `sendPushKitNotificationOnUserUpdate ${JSON.stringify(callData)}`,
    )

    const callerID = callData.callerID
    const callType = callData.callType
    const callStatus = callData.callStatus
    if (callStatus !== 'Receiving') {
      console.log(callStatus)
      console.log('nope c')
      return
    }

    console.log(context.params)
    console.log(context.params.userID)

    if (callData.groupCall === true) {
      return handleNewCall('x', 'y', 'call type')
    } else {
      // 1-1 call
      const recipientID = context.params.userID
      return handleNewCall(callerID, recipientID, callType)
    }
  })

exports.initiateChatCall = functions.https.onRequest((request, response) => {
  const callerID = request.body.callerID
  const recipientIDs = request.body.recipientIDs
  const callType = request.body.callType
  const channelName = request.body.channelName
  const topic = request.body.topic
  const uuid = request.body.uuid

  console.log(`initiateChatCall ${JSON.stringify(request.body)}`)

  recipientIDs.forEach(recipientID => {
    handleNewCall(callerID, recipientID, callType, channelName, topic, uuid)
  })
})

async function handleNewCall(
  callerID,
  recipientID,
  callType,
  channelName,
  topic,
  callID,
) {
  console.log(
    'Handling new call between ' +
      callerID +
      ' and ' +
      recipientID +
      ' call type: ' +
      callType,
  )

  try {
    const caller = await fetchUser(callerID)
    const recipient = await fetchUser(recipientID)

    if (recipient.pushKitToken) {
      // We send a push notification (in case the recipients are on Android)
      await sendCallPushNotification(caller, recipient, callType, callID)

      // We also send a regular push notification in case call kit doesn't work on user's device
      await sendPushNotification(
        recipient.id,
        'Instamobile',
        (caller?.firstName ?? 'Someone') +
          ' is ' +
          callType +
          ' calling you...',
        callType + '_call',
        { callID: callID },
      )

      return constructAndSendPushKitNotification(
        caller,
        recipient,
        callType,
        channelName,
        topic,
        callID,
      )
    }
  } catch (error) {
    console.log(error)
  }
}

async function constructAndSendPushKitNotification(
  caller,
  recipient,
  callType,
  channelName,
  topic,
  uuid,
) {
  var callerName = caller.firstName + ' ' + caller.lastName
  if (channelName && channelName.length > 0) {
    callerName = callerName + ' in ' + channelName
  }
  const payload = {
    callerName: callerName,
    handle: recipient.email || recipient.phone || recipient.phoneNumber,
    uuid: uuid,
    chatType: callType,
  }
  return sendPushKitNotification(recipient.pushKitToken, payload, topic)
}

async function sendPushKitNotification(token, payload, topic) {
  const config = {
    production: true /* change this when in production */,
    cert: topic ? topic + '.pem' : 'voipCert.pem',
    key: topic ? topic + '.pem' : 'voipCert.pem',
    passphrase: 'parolamea+',
  }

  const apnProvider = new apn.Provider(config)
  const notification = new apn.Notification()

  const recepients = []
  recepients.push(apn.token(token))

  notification.topic = topic
    ? topic + '.voip'
    : 'io.instamobile.chat.swift.voip' // you have to add the .voip here!!
  notification.payload = payload

  console.log('Send push notifications to ' + token + ' topic: ' + topic)

  return apnProvider.send(notification, recepients).then(reponse => {
    console.log(JSON.stringify(reponse))
    return null
  })
}

const sendCallPushNotification = async (
  sender,
  recipient,
  callType,
  callID,
) => {
  if (!recipient || !recipient.pushToken) {
    return
  }

  const data = {
    message: {
      token: pushToken,
      data: {
        recipientID: recipient.id,
        senderID: sender.id,
        callType,
        callID,
        callerName: sender.firstName,
        priority: 'high',
      },
      apns: {
        payload: {
          aps: {
            contentAvailable: true,
          },
        },
      },
    },
  }

  console.log(`sendCallPushNotification ${JSON.stringify(data)}`)

  try {
    return admin.messaging().send(data.message)
  } catch (error) {
    console.log(error)
  }
}
