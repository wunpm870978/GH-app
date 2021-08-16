/* eslint-disable prettier/prettier */
import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F4F5F8',
    alignItems: 'center',
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
  //<-------------search page css----------------------->
  searchView: {
    alignItems: 'center',
    //justifyContent: 'center',
  },
  categoryRow: {
    marginTop: 10,
    backgroundColor: 'orange',
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barcodeRow: {
    marginTop: 100,
    height: 60,
    width: '60%',
    borderRadius: 10,
    backgroundColor: '#A9CA81',
    alignItems: 'center',
    justifyContent: 'center',
  },
  enquiryRow: {
    marginTop: 20,
    height: 60,
    width: '60%',
    borderRadius: 10,
    backgroundColor: '#A9CA81',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
