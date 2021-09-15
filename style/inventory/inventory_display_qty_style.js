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
  //<--------------product info page css---------------->
  productInfoRow: {
    flexDirection: 'row',
    marginHorizontal: 15,
    alignItems: 'center',
    height: windowWidth * 0.4,
    //width: windowWidth - windowWidth * 0.08 - 30,
    //justifyContent: 'center',
    //backgroundColor: 'orange',
  },
  imageContainer: {
    width: windowWidth * 0.25,
    height: windowWidth * 0.25,
    borderWidth: 1,
    //backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: windowWidth * 0.24,
    height: windowWidth * 0.24,
    resizeMode: 'contain',
  },
  productInfoContainer: {
    width: windowWidth - windowWidth * 0.33 - 30,
    height: '100%',
    paddingLeft: 10,
    paddingVertical: 10,
    //backgroundColor: 'green',
  },
  productTextContainerWithButton: {
    flexDirection: 'row',
    height: 25,
    width: '100%',
    //backgroundColor: 'cyan',
    alignItems: 'center',
  },
  productTitleContainer: {
    //backgroundColor: 'yellow',
    height: 25,
    width: '60%',
    //fontSize: 18,
    justifyContent: 'center',
  },
  copyBtnContainer: {
    height: 25, //30
    width: 70,
    backgroundColor: '#A9CA81',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  productTextContainer: {
    height: 25,
    width: '100%',
    //backgroundColor: 'blue',
    justifyContent: 'center',
  },
  productText: {
    height: 30,
    fontSize: 14,
  },
  //------------inventory list css---------------------//
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  inventoryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '85%',
    height: 35,
    borderWidth: 1,
  },
  inventoryShop: {
    flex: 7,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  inventoryQuantity: {
    flex: 3,
    justifyContent: 'center',
  },
  inventoryListContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '85%',
    height: 35,
  },
  //request change inventory css-------------------//
  requestContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 50,
  },
  requestBtn: {
    width: 120,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#A9CA81',
  },
});
