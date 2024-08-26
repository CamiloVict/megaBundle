import React, { useEffect, useRef, useMemo } from 'react'
import { Video } from 'expo-av'
import convertToProxyURL from 'react-native-video-cache'

const VideoPlayer = ({ video, isMounted, paused, onTouchStart }) => {
  const videoRef = useRef(null)

  useEffect(() => {
    playVideoIfShould()
  }, [paused, isMounted])

  const playVideoIfShould = () => {
    if (!isMounted || paused) {
      videoRef.current?.pauseAsync()
      return
    }
    videoRef.current?.playAsync()
  }

  const videoURL = useMemo(() => {
    return typeof video.url === 'string' ? convertToProxyURL(video.url) : ''
  }, [video.url])

  return (
    <Video
      ref={videoRef}
      removeClippedSubviews={true}
      key={video.url}
      style={{ height: '100%', width: '100%' }}
      volume={1.0}
      useNativeControls={false}
      rate={video.rate ?? 1.0}
      shouldCorrectPitch={true}
      source={isMounted ? { uri: videoURL } : undefined}
      onTouchStart={onTouchStart}
      resizeMode={'contain'}
      isLooping={true}
      onLoad={playVideoIfShould}
      posterSource={{ uri: video.thumbnailURL }}
      posterStyle={{ height: '100%', width: '100%', resizeMode: 'contain' }}
      usePoster={true}
    />
  )
}

export default VideoPlayer
