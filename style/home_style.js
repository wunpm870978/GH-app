/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    //justifyContent: 'center',
    width: '100%',
    height: 45,
    //borderBottomLeftRadius: 15,
    //borderBottomRightRadius: 15,
    borderBottomWidth: 2,
    //borderLeftWidth: 0.5,
    //borderRightWidth: 0.5,
    borderColor: '#A9CA81',
  },
  topRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginHorizontal: 20,
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
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
