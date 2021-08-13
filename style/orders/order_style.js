/* eslint-disable prettier/prettier */
import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6EAF8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
    width: '100%',
  },
  infoPanel: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  infoColumn: {
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 8,
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
  infoRow: {
    //flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-start',
  },
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
  containInputView: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#D6EAF8',
  },
  inputView: {
    width: '100%',
    backgroundColor: '#D6EAF8',
    borderRadius: 20,
    height: 50,
    marginBottom: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 10,
  },
  QRcodeColumn: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemRow: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  membershipInputView: {
    width: '75%',
    backgroundColor: '#D6EAF8',
    borderRadius: 20,
    height: 40,
    marginLeft: -12,
    marginBottom: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 10,
  },
  confirmButton: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  text: {
    //flex: 15,
    alignItems: 'flex-start',
    fontSize: 15,
    justifyContent: 'flex-start',
  },
  warnText: {
    fontSize: 12,
    color: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  //--------------Render------------------//
  renderContainer: {
    flexDirection: 'row',
    width: '100%',
    //height: 40,
    //backgroundColor: 'yellow',
    marginBottom: 10,
  },
  renderTextContainer: {
    flex: 5.5,
    width: ((windowWidth - 8 * 2) * 5.5) / 10,
    justifyContent: 'center',
    //flexWrap: 'wrap',
  },
  renderIconContainer: {
    flexDirection: 'row-reverse',
    flex: 2.5,
  },
});
