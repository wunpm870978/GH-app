/* eslint-disable prettier/prettier */
import {StyleSheet, Dimensions} from 'react-native';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  scroll: {
    flex: 1,
    width: '100%',
    marginVertical: 20,
    //backgroundColor: 'yellow',
  },
  divisionLine: {
    alignSelf: 'center',
    borderWidth: 0.5,
    width: '70%',
    marginVertical: 5,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    height: windowHeight * 0.7,
    paddingVertical: 20,
    width: windowWidth - windowWidth * 0.08 - 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#D3D0D0',
    borderWidth: 1,
  },
  modalTitleContainer: {
    height: 30,
    width: '100%',
    alignItems: 'center',
  },
  modalTextContainer: {
    height: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 1,
  },
  modalTextLeftPanel: {
    flex: 3.5,
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  modalTextRightPanel: {
    flex: 6.5,
    justifyContent: 'flex-start',
  },
  modalBtnContainer: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalBtn: {
    borderRadius: 5,
    height: 30,
    width: 70,
    backgroundColor: '#A9CA81',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  modalText: {
    color: 'white',
  },
  modalTitle: {
    color: 'grey',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
