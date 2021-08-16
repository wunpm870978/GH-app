/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Alert,
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import styles from '../../style/sales/createSales_style.js';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import NumericInput from 'react-native-numeric-input';
import {apiFetchProductInfo} from '../../api/inventory.js';
import {apiCreateSalesRecord} from '../../api/sales.js';

export function CreateSalesScreen({navigation}) {
  React.useLayoutEffect(() => {
    loadStaff();
  }, [navigation]);
  const loadStaff = async () => {
    try {
      await AsyncStorage.multiGet(
        ['staffID', 'district', 'position', 'userToken', 'shop_id'],
        (err, asyncData) => {
          if (err) {
            console.log(err);
          }
          const temp = {
            staffID: '',
            district: '',
            position: '',
            token: '',
            shopID: '',
          };
          asyncData.map(result => {
            switch (result[0]) {
              case 'staffID':
                temp.staffID = result[1];
                break;
              case 'district':
                temp.district = result[1];
                break;
              case 'position':
                temp.position = result[1];
                break;
              case 'userToken':
                temp.token = result[1];
                break;
              case 'shop_id':
                temp.shopID = result[1];
                break;
            }
          });
          setStaffData({
            staffID: temp.staffID,
            district: temp.district,
            position: temp.position,
            token: temp.token,
            shopID: temp.shopID,
          });
        },
      );
    } catch (e) {
      console.log(e);
    }
  };
  const [datePicker, setDatePicker] = React.useState({
    isVisible: false,
    pickerMode: null,
    display: 'default',
  });
  const [salesData, setSalesData] = React.useState({
    date: '日期',
    time: '時間',
    productID: '',
    name: '',
    brand: '',
    price: '',
    notice: '',
  });
  const [staffData, setStaffData] = React.useState({
    staffID: '',
    district: '',
    position: '',
    token: '',
    shopID: '',
  });
  const [modalVisible, setModalVisible] = React.useState(false);
  const [response, setResponse] = React.useState('未選擇任何相片');
  const [productList, setProductList] = React.useState([]);
  const windowWidth = Dimensions.get('window').width;

  const handleItemChange = val => {
    setSalesData({
      ...salesData,
      productID: val,
    });
  };
  const handlePriceChange = val => {
    setSalesData({
      ...salesData,
      price: val,
    });
  };
  const handleNoticeChange = val => {
    setSalesData({
      ...salesData,
      notice: val,
    });
  };

  const confirmValidation = () => {
    if (
      salesData.date === '日期' ||
      salesData.time === '時間' ||
      productList.length === 0 ||
      salesData.price === '' ||
      response === '未選擇任何相片'
    ) {
      Alert.alert('注意', '日期時間、貨品、價錢及收據不能為空！');
    } else {
      setModalVisible(true);
    }
  };
  const toggleOrderTime = () => {
    setDatePicker({
      ...datePicker,
      pickerMode: 'datetime',
      display: 'spinner',
      isVisible: !datePicker.isVisible,
    });
  };
  const hideDatePicker = () => {
    setDatePicker({
      ...datePicker,
      isVisible: false,
    });
  };
  const handleConfirm = val => {
    let day = ('0' + val.getDate()).slice(-2);
    let month = ('0' + (val.getMonth() + 1)).slice(-2);
    let year = val.getFullYear();
    let hours = ('0' + val.getHours()).slice(-2);
    let minutes = ('0' + val.getMinutes()).slice(-2);
    setSalesData({
      ...salesData,
      date: year + '-' + month + '-' + day,
      time: hours + ':' + minutes + ':' + '00',
    });
    hideDatePicker();
  };

  const createRecord = async () => {
    const [status] = await apiCreateSalesRecord(
      response.assets[0],
      salesData,
      productList,
      staffData,
    );
    if (status === 200) {
      navigation.replace('Success');
      console.log(status);
    } else {
      Alert.alert('錯誤', '新增記錄失敗!');
    }
  };

  const renderItem = productList.map((element, index) => {
    return (
      <View
        key={'mainContainer' + index.toString()}
        style={{
          flexDirection: 'row',
          width: '90%',
          //backgroundColor: 'orange',
          marginBottom: 10,
        }}>
        <View
          key={'textContainer' + index.toString()}
          style={{
            flex: 5.5,
            width: ((windowWidth - 8 * 2) * 5.5) / 10,
            justifyContent: 'center',
          }}>
          <Text key={'text' + index.toString()}>
            {element.name} - {element.brand}
          </Text>
        </View>
        <View
          key={'numericContainer' + index.toString()}
          style={{flex: 2, justifyContent: 'center'}}>
          <NumericInput
            key={'numeric' + index.toString()}
            minValue={1}
            value={element.quantity}
            onChange={value => {
              let tempCart = [];
              productList.map(item => {
                tempCart.push(item);
              });
              tempCart[index].quantity = value;
              setProductList(tempCart);
            }}
            totalWidth={((windowWidth - 8 * 2) * 2) / 10}
            totalHeight={30}
            iconSize={25}
            //step={1.5}
            rounded
            textColor="#B0228C"
            iconStyle={{color: 'white'}}
            rightButtonBackgroundColor="#EA3788"
            leftButtonBackgroundColor="#E56B70"
          />
        </View>
        <View
          key={'iconContainer' + index.toString()}
          style={{
            flexDirection: 'row-reverse',
            flex: 2.5,
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons
            key={'MaterialCommunityIcons' + index.toString()}
            name="delete"
            size={25}
            color="red"
            onPress={() => {
              let tempCart = [];
              productList.map((item, key) => {
                if (key !== index) {
                  tempCart.push(item);
                }
              });
              setProductList(tempCart);
            }}
          />
        </View>
      </View>
    );
  });

  const getProductInfo = async () => {
    const productInfo = await apiFetchProductInfo(
      salesData.productID,
      staffData.token,
    );
    let tempCart = [];
    productList.map(element => {
      tempCart.push(element);
    });
    tempCart.push({
      productID: productInfo[0].productID,
      cCode: productInfo[0].cCode,
      name: productInfo[0].name,
      brand: productInfo[0].brand,
      price: productInfo[0].price,
      quantity: 1,
    });
    setProductList(tempCart);
    handleItemChange('');
  };

  const modalRenderItem = productList.map((item, index) => {
    return (
      <View
        key={'modalMainContainer' + index.toString()}
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          marginBottom: 1,
          //backgroundColor: 'cyan',
        }}>
        <View
          key={'modalTextContainer' + index.toString()}
          style={{
            flex: 7,
            //backgroundColor: 'yellow',
            justifyContent: 'center',
            paddingLeft: 30,
          }}>
          <Text key={'modalText' + index.toString()}>
            {item.name}-{item.brand}
          </Text>
        </View>
        <View
          key={'modalText2Container' + index.toString()}
          style={{flex: 3, alignItems: 'center'}}>
          <Text key={'modalText2' + index.toString()} style={styles.text}>
            {item.quantity}
          </Text>
        </View>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.viewContainer}>
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              toggleOrderTime();
            }}>
            <Text style={styles.text}>
              {salesData.date} {salesData.time}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            display={datePicker.display}
            isVisible={datePicker.isVisible}
            mode={datePicker.pickerMode}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <View style={styles.btn}>
            <TextInput
              style={styles.textInput}
              textAlign={'center'}
              placeholder="貨品號碼 / 條碼"
              placeholderTextColor="grey"
              value={salesData.productID}
              onChangeText={val => handleItemChange(val)}
            />
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => {
                if (salesData.productID !== '') {
                  getProductInfo();
                }
              }}>
              <MaterialIcons
                name="add-circle-outline"
                size={25}
                color="white"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.productList}>
            {productList.length === 0 ? (
              <Text>貨品籃尚未有任何貨品！</Text>
            ) : (
              renderItem
            )}
          </View>
          <View style={styles.btn}>
            <TextInput
              style={styles.textInput}
              textAlign={'center'}
              placeholder="總價錢"
              placeholderTextColor="grey"
              onChangeText={val => handlePriceChange(val)}
            />
          </View>
          <View style={styles.btn}>
            <View style={{flex: 7.5}}>
              <Text style={{marginLeft: 10, fontSize: 14}}>
                收據：{' '}
                {response === '未選擇任何相片' || response.didCancel === true
                  ? '未選擇任何相片'
                  : response.assets[0].fileName}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flex: 2.5,
                //backgroundColor: 'yellow',
              }}>
              <MaterialIcons
                name="add-a-photo"
                size={25}
                color="#A9CA81"
                style={{marginHorizontal: 5}}
                onPress={() => {
                  const options = {
                    mediaType: 'photo',
                    cameraType: 'back',
                    saveToPhotos: true,
                  };
                  launchCamera(options, setResponse);
                }}
              />
              <MaterialIcons
                name="add-photo-alternate"
                size={25}
                color="#A9CA81"
                style={{marginRight: 10}}
                onPress={() => {
                  const options = {
                    mediaType: 'photo',
                  };
                  launchImageLibrary(options, setResponse);
                }}
              />
            </View>
          </View>
          <View style={styles.btn}>
            <TextInput
              style={styles.textInput}
              textAlign={'center'}
              placeholder="備註"
              placeholderTextColor="grey"
              onChangeText={val => handleNoticeChange(val)}
            />
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <View style={styles.modalTitleContainer}>
                  <Text style={styles.modalTitle}>新增本期營業額</Text>
                </View>
                <View style={{borderWidth: 0.5, width: 150, marginBottom: 5}} />
                <ScrollView
                  style={styles.scroll}
                  showsVerticalScrollIndicator={false}>
                  <View style={styles.modalTextContainer}>
                    <View style={styles.modalTextLeftPanel}>
                      <Text style={styles.text}>商鋪： </Text>
                    </View>
                    <View style={styles.modalTextRightPanel}>
                      <Text style={styles.text}>{staffData.shopID}</Text>
                    </View>
                  </View>
                  <View style={styles.modalTextContainer}>
                    <View style={styles.modalTextLeftPanel}>
                      <Text style={styles.text}>時間： </Text>
                    </View>
                    <View style={styles.modalTextRightPanel}>
                      <Text style={styles.text}>
                        {salesData.date} {salesData.time}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.modalTextContainer}>
                    <View
                      style={{
                        flex: 7,
                        justifyContent: 'center',
                        paddingLeft: 30,
                      }}>
                      <Text style={styles.text}>貨品藍 </Text>
                    </View>
                    <View style={{flex: 3, alignItems: 'center'}}>
                      <Text style={styles.text}>數量</Text>
                    </View>
                  </View>
                  {modalRenderItem}
                  <View style={styles.modalTextContainer}>
                    <View style={styles.modalTextLeftPanel}>
                      <Text style={styles.text}>總價： </Text>
                    </View>
                    <View style={styles.modalTextRightPanel}>
                      <Text style={styles.text}>${salesData.price}</Text>
                    </View>
                  </View>
                  <View style={styles.modalTextContainer}>
                    <View style={styles.modalTextLeftPanel}>
                      <Text style={styles.text}>備註： </Text>
                    </View>
                    <View style={styles.modalTextRightPanel}>
                      <Text style={styles.text}>{salesData.notice}</Text>
                    </View>
                  </View>
                </ScrollView>
                <View style={{borderWidth: 0.5, width: 150, marginTop: 5}} />
                <View style={styles.modalBtnContainer}>
                  <TouchableOpacity
                    style={styles.modalBtn}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.modalText}>取消</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalBtn}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      createRecord();
                    }}>
                    <Text style={styles.modalText}>新增</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <View style={styles.confirmBtnContainer}>
            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={() => {
                confirmValidation();
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                }}>
                確認
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
