/* eslint-disable prettier/prettier */
import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#D6EAF8',
    alignItems: 'center',
    //paddingVertical: windowWidth * 0.92,
  },
  productRow: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 5,
  },
  imageContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
  },
  image: {
    width: windowWidth * 0.24,
    height: windowWidth * 0.24,
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 7,
    backgroundColor: 'orange',
  },
});
