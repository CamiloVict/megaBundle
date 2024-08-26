/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import { WebView } from 'react-native-webview';

export default class NewsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const item = this.props.route.params?.item;
    return <WebView source={{ uri: item.url }} />;
  }
}
