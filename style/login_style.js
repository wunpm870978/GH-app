/* eslint-disable prettier/prettier */
import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDFCFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  upperContainer: {
    flex: 4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 6,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logoContainer: {
    width: '50%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    margin: Math.round(windowHeight * 0.0625),
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  toggleView: {
    width: '60%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleLeft: {
    width: '50%',
    height: 50,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  toggleRight: {
    width: '50%',
    height: 50,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  toggleButton: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleButtonFalse: {
    width: '100%',
    borderRadius: 20,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: Math.round(windowHeight * 0.0234375),
    justifyContent: 'center',
    padding: 10,
  },
  loginBtn: {
    width: '60%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Math.round(windowHeight * 0.015625),
    marginBottom: Math.round(windowHeight * 0.015625),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  warnText: {
    fontSize: 12,
    color: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: {
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
