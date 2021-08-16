/* eslint-disable prettier/prettier */
import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F8',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  upperContainer: {
    flex: 4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
  toggleContainer: {
    width: '80%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleBtn: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    width: '100%',
    backgroundColor: 'white',
    marginBottom: Math.round(windowHeight * 0.0234375),
    justifyContent: 'center',
    padding: 10,
  },
  loginBtn: {
    width: '60%',
    backgroundColor: '#A9CA81',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Math.round(windowHeight * 0.015625),
    marginBottom: Math.round(windowHeight * 0.015625),
  },
  row: {
    width: '100%',
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
