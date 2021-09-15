/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import styles from '../../style/sales/createSales_style.js';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import NumericInput from 'react-native-numeric-input';
import {apiFetchProductInfo} from '../../api/inventory.js';
import {apiPromotionPicker} from '../../api/order.js';
import {LoginState, SalesState, SalesMethod} from '../../api/authText.js';
import {Picker} from '@react-native-picker/picker';
import {ModalSalesList} from './createSalesModal.js';

export function CreateSalesScreen({navigation}) {
  const loginState = React.useContext(LoginState);
  const salesState = React.useContext(SalesState);
  const {
    handleItemChange,
    handlePromotionChange,
    handlePriceChange,
    handleRemarkChange,
    toggleModal,
    setSalesDateTime,
    setProductList,
    toggleDateTime,
    resetSalesDateTime,
    toggleCamera,
    setPromotionPicker,
    selectPromotionPicker,
    handlePaymentMethodChange,
  } = React.useContext(SalesMethod);

  const windowWidth = Dimensions.get('window').width;

  const confirmValidation = () => {
    if (
      salesState.date === '日期' ||
      salesState.time === '時間' ||
      salesState.productList.length === 0 ||
      salesState.price === '' ||
      salesState.paymentMethod === '' ||
      salesState.response === '未選擇任何相片' ||
      salesState.response.didCancel === true
    ) {
      Alert.alert('注意', '日期時間、貨品、價錢及收據不能為空！');
    } else {
      toggleModal();
    }
  };
  //call http request for each button
  const getProductInfo = async () => {
    const [status, result] = await apiFetchProductInfo(
      salesState.productID,
      loginState.token,
    );
    let tempCart = [];
    if (status === 200) {
      if (salesState.price === '') {
        tempCart.push({
          productID: result[0].productID,
          cCode: result[0].cCode,
          name: result[0].name,
          brand: result[0].brand,
          price: result[0].price,
          quantity: 1,
        });
        setProductList(tempCart, result[0].price);
      } else {
        tempCart = salesState.productList;
        tempCart.push({
          productID: result[0].productID,
          cCode: result[0].cCode,
          name: result[0].name,
          brand: result[0].brand,
          price: result[0].price,
          quantity: 1,
        });
        setProductList(tempCart, salesState.price + result[0].price);
      }
      handleItemChange('');
    } else {
      handleItemChange('');
      Alert.alert('錯誤', result.error);
    }
  };
  //load promotion picker at the beginning
  React.useEffect(() => {
    getPromotionPicker();
  }, [navigation]);
  const getPromotionPicker = async () => {
    const [status, result] = await apiPromotionPicker();
    console.log(result);
    if (status === 200) {
      setPromotionPicker(result);
    }
  };
  //-------------------Render Item-------------------------------//
  const renderItem = salesState.productList.map((element, index) => {
    return (
      <View
        key={'mainContainer' + index.toString()}
        style={{
          flexDirection: 'row',
          width: '90%',
          marginBottom: 10,
        }}>
        <View
          key={'textContainer' + index.toString()}
          style={{
            flex: 5,
            width: ((windowWidth - 8 * 2) * 5.5) / 10,
            justifyContent: 'center',
          }}>
          <Text key={'text' + index.toString()}>
            {element.name} - {element.brand}
          </Text>
        </View>
        <View
          key={'numericContainer' + index.toString()}
          style={{flex: 2.5, justifyContent: 'center'}}>
          <NumericInput
            key={'numeric' + index.toString()}
            minValue={1}
            value={element.quantity}
            onChange={value => {
              let tempCart = [];
              let tempPrice = 0;
              salesState.productList.map(item => {
                tempCart.push(item);
              });
              tempCart[index].quantity = value;
              tempCart.map(item => {
                tempPrice += item.quantity * item.price;
              });
              setProductList(tempCart, tempPrice);
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
          style={{
            flex: 1.5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text key={'price' + index.toString()}>${element.price}</Text>
        </View>
        <View
          key={'iconContainer' + index.toString()}
          style={{
            flexDirection: 'row-reverse',
            flex: 1,
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons
            key={'MaterialCommunityIcons' + index.toString()}
            name="delete"
            size={25}
            color="red"
            onPress={() => {
              let tempCart = [];
              let tempPrice = 0;
              salesState.productList.map((item, key) => {
                if (key !== index) {
                  tempPrice += item.quantity * item.price;
                  tempCart.push(item);
                }
              });
              setProductList(tempCart, tempPrice);
            }}
          />
        </View>
      </View>
    );
  });
  const pickerRender = salesState.promotionPickerList.map((item, index) => {
    return (
      <Picker.Item
        key={'picker' + index.toString()}
        label={item.detail}
        value={item.promotionCode}
      />
    );
  });
  //---------------Loading indicator-----------//
  if (salesState.isLoading) {
    return (
      <View
        style={{
          flex: 1,
          //backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
  //------------html----------------//
  return (
    <View style={styles.container}>
      {/* <View style={styles.viewContainer}> */}
      <ScrollView
        centerContent
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}>
        <TouchableOpacity style={styles.btn} onPress={toggleDateTime}>
          <Text style={styles.text}>
            {salesState.date} {salesState.time}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          display={salesState.display_createSales}
          isVisible={salesState.isVisible_createSales}
          mode={salesState.pickerMode_createSales}
          onConfirm={setSalesDateTime}
          onCancel={resetSalesDateTime}
        />
        <View style={styles.btn}>
          <TextInput
            style={styles.textInput}
            textAlign={'center'}
            placeholder="貨品號碼 / 條碼 / 花名"
            placeholderTextColor="grey"
            value={salesState.productID}
            onChangeText={val => handleItemChange(val)}
          />
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => {
              if (salesState.productID !== '') {
                getProductInfo();
              }
            }}>
            <MaterialIcons name="add-circle-outline" size={25} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.productList}>
          {salesState.productList.length === 0 ? (
            <Text>貨品籃尚未有任何貨品！</Text>
          ) : (
            renderItem
          )}
        </View>
        <View style={styles.btn}>
          <TextInput
            style={styles.textInputWithPicker}
            textAlign={'center'}
            placeholder="優惠碼"
            placeholderTextColor="grey"
            value={salesState.promotionCode}
            onChangeText={val => handlePromotionChange(val)}
          />
          <Picker
            style={{width: '35%'}}
            selectedValue={salesState.promotionCode}
            onValueChange={selectedPicker =>
              selectPromotionPicker(selectedPicker)
            }>
            <Picker.Item label="選擇" value={null} />
            {pickerRender}
          </Picker>
        </View>
        <View style={styles.btn}>
          <TextInput
            style={styles.textInput}
            textAlign={'center'}
            keyboardType="decimal-pad"
            placeholder="總價錢"
            placeholderTextColor="grey"
            value={salesState.price.toString()}
            onChangeText={val => handlePriceChange(val)}
          />
        </View>
        <View style={styles.btn}>
          <Picker
            style={{width: '90%'}}
            selectedValue={salesState.paymentMethod}
            onValueChange={paymentMethod =>
              handlePaymentMethodChange(paymentMethod)
            }>
            <Picker.Item label="付款方式" value={null} />
            <Picker.Item label="AliPay" value={'Alipay'} />
            <Picker.Item label="WeChat Pay" value={'WechatPay'} />
            <Picker.Item label="現金/八達通" value={'Cash'} />
            <Picker.Item label="VISA" value={'VISA'} />
          </Picker>
        </View>
        <View style={styles.btn}>
          <View style={{flex: 7.5}}>
            <Text style={{marginLeft: 10, fontSize: 14}}>
              收據：{' '}
              {salesState.response === '未選擇任何相片' ||
              salesState.response.didCancel === true
                ? '未選擇任何相片'
                : salesState.response.assets[0].fileName}
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
                launchCamera(options, val => toggleCamera(val));
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
                launchImageLibrary(options, val => toggleCamera(val));
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
            value={salesState.remark}
            onChangeText={val => handleRemarkChange(val)}
          />
        </View>
        <ModalSalesList navigation={navigation} />
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
      {/* </View> */}
    </View>
  );
}
