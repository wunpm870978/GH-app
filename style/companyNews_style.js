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
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  upperPart: {
    flex: 1,
    width: '100%',
  },
  bottomPart: {
    flex: 9,
    width: '100%',
    //borderWidth: 1,
  },
  newsContainer: {
    flexDirection: 'row',
    height: 60,
    width: '100%',
    alignItems: 'center',
  },
  newsLeftPanel: {
    flex: 8,
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    //backgroundColor: 'yellow',
  },
  newsRightPanel: {
    flex: 2,
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    //backgroundColor: 'orange',
  },
});
