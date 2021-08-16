/* eslint-disable prettier/prettier */
import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F4F5F8',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: windowWidth * 0.92,
    backgroundColor: 'white',
    marginVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  btn: {
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 20,
    height: 50,
    width: '60%',
    borderColor: '#00FF00',
    //backgroundColor: '#00FF00',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  sectionHeader: {
    height: 30,
    //width: '90%',
    width: windowWidth * 0.92 - 30,
    //backgroundColor: 'yellow',
    justifyContent: 'center',
  },
  section: {
    //width: '100%',
    width: windowWidth * 0.92 - 40,
    //backgroundColor: 'green',
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D3D0D0',
    padding: 10,
  },
  itemContainer: {
    //width: '90%',
    width: windowWidth * 0.92 - 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
