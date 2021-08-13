/* eslint-disable prettier/prettier */

import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#D6EAF8',
    alignItems: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    backgroundColor: 'yellow',
  },
  scroll: {
    flex: 1,
    //backgroundColor: 'yellow',
  },
  toggleBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    width: windowWidth * 0.92,
    backgroundColor: 'white',
    marginVertical: 15,
    borderRadius: 10,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 330,
    //backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: 300,
    height: 300,
  },
  photoPickerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    //backgroundColor: 'cyan',
    flexDirection: 'row',
  },
  uploadBtn: {
    marginVertical: 10,
    width: '30%',
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //------------render-----------------//
  renderMainContainer: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 5,
    //backgroundColor: 'cyan',
  },
  renderTextContainer: {
    flex: 6,
    justifyContent: 'center',
  },
  renderText1Container: {
    flex: 2,
    //backgroundColor: 'white',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  renderText2Container: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  priceCotainer: {
    alignItems: 'flex-end',
    paddingRight: 20,
    marginVertical: 15,
  },
});
