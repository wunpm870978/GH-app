/* eslint-disable prettier/prettier */
import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F4F5F8',
    alignItems: 'center',
    //paddingVertical: windowWidth * 0.92,
  },
  searchView: {
    marginVertical: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'cyan',
  },
  filerContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  leftContainer: {
    flex: 2.5,
    height: '100%',
    //backgroundColor: 'yellow',
    alignItems: 'center',
  },
  rightContainer: {
    flex: 7.5,
    height: '100%',
    //backgroundColor: 'cyan',
  },
  categoryLeftContainer: {
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A9CA81',
  },
  categoryRightContainer: {
    flex: 1,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // padding: 5,
    //backgroundColor: 'purple',
  },
  btnContainer: {
    width: (((windowWidth * 7) / 10) * 1) / 3 - 10,
    marginHorizontal: 5,
    height: (((windowWidth * 7) / 10) * 1) / 3 + 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    borderWidth: 2,
    borderColor: '#A9CA81',
  },
  btnFlatList: {
    //backgroundColor: 'purple',
    padding: 5,
  },
});
