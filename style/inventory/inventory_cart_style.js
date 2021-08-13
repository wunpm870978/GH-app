/* eslint-disable prettier/prettier */

import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#D6EAF8',
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
  productInfoContainer: {
    width: '100%',
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productInfoRow: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  confirmBtnContainer: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  confirmBtn: {
    width: '50%',
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  //---------------renderItem-----------//
  renderItemContainer: {
    width: windowWidth - windowWidth * 0.08 - 30,
    backgroundColor: 'yellow',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  //---------------Modal---------------//
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    height: 290,
    width: windowWidth - windowWidth * 0.08 - 30,
    alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 0.5,
  },
  modalTitle: {
    color: 'grey',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  modalDate: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    height: 50,
    width: 240,
    borderColor: '#00FF00',
    //backgroundColor: '#00FF00',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalIconContainer: {
    flexDirection: 'row-reverse',
    width: '100%',
    height: 25,
    //backgroundColor: 'green',
    alignItems: 'center',
  },
  modalTitleContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalProductContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
