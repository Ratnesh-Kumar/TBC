import { StyleSheet, Dimensions } from 'react-native';

// eslint-disable-next-line no-undef
export default (styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    margin: 10
  },
  viewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'black',
  },
}));