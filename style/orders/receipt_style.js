/* eslint-disable prettier/prettier */

import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F4F5F8',
    alignItems: 'center',
    //paddingVertical: windowWidth * 0.92,
  },
  container: {
    flex: 1,
    width: windowWidth * 0.92,
    backgroundColor: 'white',
    borderRadius: 10,
    //alignItems: 'center',
    //justifyContent: 'center',
    marginVertical: 15,
  },
  receiptTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  confirmBtnContainer: {
    width: '100%',
    marginVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#A9CA81',
  },
  //----------------render-----------------//
  renderMainContainer: {
    flexDirection: 'row',
    width: '80%',
    marginBottom: 10,
    justifyContent: 'center',
  },
  renderTextContainer: {
    flex: 6,
    width: ((windowWidth - 8 * 2) * 5.5) / 10,
    justifyContent: 'center',
    //flexWrap: 'wrap',
  },
  renderText1Container: {
    flex: 2,
    flexDirection: 'row-reverse',
  },
});
