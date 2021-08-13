/* eslint-disable prettier/prettier */
import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6EAF8',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginVertical: 15,
    marginHorizontal: 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  upperPart: {
    flex: 0.7,
    width: '100%',
    flexDirection: 'row',
  },
  bottomPart: {
    flex: 9.3,
    width: '100%',
    //borderWidth: 1,
  },
  discountContainer: {
    //borderWidth: 1,
    //backgroundColor: 'yellow',
    flexDirection: 'row',
    height: 60,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  timeIconPanel: {
    flex: 1,
    alignItems: 'flex-start',
    height: '100%',
    justifyContent: 'center',
    //backgroundColor: 'blue',
  },
  productPanel: {
    flex: 6.2,
    //backgroundColor: 'yellow',
  },
  productSplitPanel: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    //backgroundColor: 'orange',
  },
  discountPanel: {
    flex: 1.8,
    alignItems: 'flex-start',
    justifyContent: 'center',
    //backgroundColor: 'green',
    height: '100%',
  },
  copyIconPanel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'grey',
    height: '100%',
  },
});
