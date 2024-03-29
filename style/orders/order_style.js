/* eslint-disable prettier/prettier */
import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F8',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  scroll: {
    flex: 1,
    width: '100%',
    padding: 20,
  },
  infoColumn: {
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-start',
  },
  inputView: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#D3D0D0',
    height: 50,
    marginBottom: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 10,
  },
  inputText: {
    height: 50,
    color: '#707070',
    width: '100%',
  },
  //--------------member Info---------------//
  memberInfoRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  memberInfoColumn: {
    flex: 6,
    paddingLeft: 20,
    paddingVertical: 5,
    alignItems: 'flex-start',
    width: '100%',
    justifyContent: 'center',
  },
  QRcodeColumn: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //--------------cart info-----------------//
  cartContainer: {
    flex: 6.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cartSearchButton: {
    flex: 3.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A9CA81',
    borderRadius: 5,
  },
  cartListTitleContainer: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 35,
  },
  cartListContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartListPriceContainer: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productName: {
    flexDirection: 'row',
    flex: 5.5,
  },
  productQuantity: {
    flexDirection: 'row',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productDelete: {
    flexDirection: 'row-reverse',
    flex: 2.5,
  },
  borderLine: {
    borderWidth: 0.5,
    width: '100%',
    marginBottom: 10,
    borderColor: '#707070',
  },
  //----------------------------------//
  itemRow: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  membershipInputView: {
    flexDirection: 'row',
    width: '75%',
    backgroundColor: '#F4F5F8',
    borderRadius: 20,
    height: 40,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  disocuntInputView: {
    flexDirection: 'row',
    width: '75%',
    backgroundColor: '#F4F5F8',
    borderRadius: 20,
    height: 40,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  confirmButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButton: {
    height: 50,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A9CA81',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  textTitle: {
    fontSize: 15,
    color: '#EA5E2A',
  },
  textTitle1: {
    fontSize: 15,
    color: 'white',
  },
  text: {
    fontSize: 15,
    color: '#707070',
  },
  warnTextContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  warnText: {
    fontSize: 13,
    color: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  //--------------Render------------------//
  renderContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
  },
  renderTextContainer: {
    flex: 5.5,
    width: ((windowWidth - 8 * 2) * 5.5) / 10,
    justifyContent: 'center',
  },
  renderIconContainer: {
    flexDirection: 'row-reverse',
    flex: 2.5,
  },
});
