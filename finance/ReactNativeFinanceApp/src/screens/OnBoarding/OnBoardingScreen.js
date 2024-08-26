/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

export default class OnboardingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false
      //To show the main page of the app
    };
  }

  _onDone = () => {
    this.setState({ showRealApp: true });
    this.props.navigation.navigate('Welcome');
  };
  _onSkip = () => {
    this.setState({ showRealApp: true });
    this.props.navigation.navigate('Welcome');
  };
  render() {
    if (this.state.showRealApp) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 100
          }}
        >
          <Text>
            This will be your screen when you click Skip from any slide or Done button at last
          </Text>
        </View>
      );
    } else {
      return (
        <AppIntroSlider
          slides={slides}
          onDone={this._onDone}
          //Handler for the done On last slide
          showSkipButton={true}
          onSkip={this._onSkip}
        />
      );
    }
  }
}
const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100
  },
  text: {
    color: 'white',
    fontSize: 16
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginTop: 16
  }
});

const slides = [
  {
    key: 's1',
    text:
      'Quickly visualize your total net worth across all accounts as well as your financial progress over time.',
    title: 'Net Worth',
    titleStyle: styles.title,
    textStyle: styles.text,
    image: {
      uri: 'https://a.icons8.com/RxjWedKT/7BHuRQ/combo-chart-icon-1.png'
    },
    imageStyle: styles.image,
    backgroundColor: '#2d65c9'
  },
  {
    key: 's2',
    title: 'Stocks Trading',
    titleStyle: styles.title,
    textStyle: styles.text,
    text: 'Track and trade stock.',
    image: {
      uri: 'https://a.icons8.com/RxjWedKT/S7KVhA/money-bag-empty-icon.png'
    },
    imageStyle: styles.image,
    backgroundColor: '#2d65c9'
  },
  {
    key: 's3',
    title: 'Expense Tracking',
    titleStyle: styles.title,
    textStyle: styles.text,
    text: 'Track your expenses and view their distribution per category.',
    image: {
      uri: 'https://a.icons8.com/RxjWedKT/S7KVhA/money-bag-empty-icon.png'
    },
    imageStyle: styles.image,
    backgroundColor: '#2d65c9'
  },
  {
    key: 's4',
    title: 'Market News',
    titleStyle: styles.title,
    textStyle: styles.text,
    text: 'Stay on top of the market with our awesome news on stock, crypto, real estate, etc.',
    image: {
      uri: 'https://a.icons8.com/RxjWedKT/9AlBzw/expenses-pie-icon-2.png'
    },
    imageStyle: styles.image,
    backgroundColor: '#2d65c9'
  },
  {
    key: 's5',
    title: 'Bank Acconuts',
    titleStyle: styles.title,
    textStyle: styles.text,
    text: 'Link all your bank accounts and manage them in a single app.',
    image: {
      uri: 'https://a.icons8.com/RxjWedKT/ZUAytm/accounts-list-icon-2.png'
    },
    imageStyle: styles.image,
    backgroundColor: '#2d65c9'
  },
  {
    key: 's6',
    title: 'Get notified',
    titleStyle: styles.title,
    textStyle: styles.text,
    text: 'Recive notifications when important events occour, such as payments, deposits or news.',
    image: {
      uri: 'https://a.icons8.com/RxjWedKT/JfGyvP/alarm.png'
    },
    imageStyle: styles.image,
    backgroundColor: '#2d65c9'
  }
];
