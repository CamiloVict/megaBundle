/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import { FlatList } from 'react-native';
import styles from './styles';
import { storiesArray } from '../../data/dataArrays';
import StoryView from '../../components/StoryView/StoryView';

export default class NewsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  renderStory = ({ item }) => (
    <StoryView
      item={item}
      onPress={() => this.props.navigation.navigate('NewsWebView', { item })}
    />
  )

  render() {
    return (
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        data={storiesArray}
        renderItem={this.renderStory}
        extraData={this.state}
        keyExtractor={item => `${item.id}`}
        listKey="0"
        style={styles.container}
      />
    )
  }
}
