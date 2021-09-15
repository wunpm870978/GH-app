/* eslint-disable prettier/prettier */
import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewContainer: {
    flex: 1,
    marginVertical: 20,
    width: windowWidth - windowWidth * 0.08 - 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
    width: '100%',
    marginVertical: 20,
    //backgroundColor: 'yellow',
  },
  scrollContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    height: 50,
    width: '85%',
    borderColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productList: {
    marginBottom: 10,
    width: '100%',
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#707070',
    fontSize: 18,
  },
  textInput: {
    height: 50,
    color: '#707070',
    width: '80%',
    fontSize: 18,
  },
  textInputWithPicker: {
    height: 50,
    color: '#707070',
    width: '50%',
    fontSize: 18,
  },
  confirmBtnContainer: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  confirmBtn: {
    borderRadius: 10,
    height: 50,
    width: '50%',
    //borderColor: '#00ff00',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A9CA81',
    marginBottom: 20,
  },
  addBtn: {
    backgroundColor: '#A9CA81',
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
