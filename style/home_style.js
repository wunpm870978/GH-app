/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6EAF8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'center',
    width: '100%',
    height: 45,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomWidth: 1,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: '#7FE8ED',
  },
  topRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  btnTopRow: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 125,
    marginTop: 10,
    marginBottom: 30,
    flexDirection: 'row',
  },
  btnRow: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 125,
    marginBottom: 30,
    flexDirection: 'row',
  },
  btn: {
    marginHorizontal: 15,
    width: 125,
    height: 125,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
