/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable radix */

import React from 'react';
import {
  Alert,
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SectionList,
  Modal,
} from 'react-native';
import styles from '../../style/inventory/inventory_display_style.js';
import Clipboard from '@react-native-clipboard/clipboard';
import Collapsible from 'react-native-collapsible';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import NumericInput from 'react-native-numeric-input';

export function DisplayInventoryScreen({route, navigation}) {
  //<----------------------hooks------------------------>
  React.useLayoutEffect(() => {
    setInventoryInfo(route.params?.inventoryInfo);
    setProductInfo({
      productID: route.params?.productInfo.productID,
      name: route.params?.productInfo.name,
      brand: route.params?.productInfo.brand,
      image:
        route.params?.productInfo.image === null
          ? 'http://172.104.44.182/greenhouse/image/default.png'
          : route.params?.productInfo.image,
      price: route.params?.productInfo.price,
      promotionID: route.params?.productInfo.promotionID,
      promotionCode: route.params?.productInfo.promotionCode,
      detail: route.params?.productInfo.detail,
      startDate: route.params?.productInfo.startDate,
      endDate: route.params?.productInfo.endDate,
    });
    setStaffData(route.params?.staffData);
  }, [
    navigation,
    route.params?.inventoryInfo,
    route.params?.productInfo,
    route.params?.staffData,
  ]);
  //<------------------------------------------->
  //<-----------------initialization---------------------------->
  const [staffData, setStaffData] = React.useState(null);
  const [districtData, setDistrictData] = React.useState({
    Islands: true,
    Kwai_Tsing: true,
    North: true,
    Sai_Kung: true,
    Sha_Tin: true,
    Tai_Po: true,
    Tsuen_Wan: true,
    Tuen_Mun: true,
    Yuen_Long: true,
    //-------------------------
    Sham_Shui_Po: true,
    Kowloon_City: true,
    Kwun_Tong: true,
    Wong_Tai_Sin: true,
    Yau_Tsim_Mong: true,
    //----------------------------
    Central_and_Western: true,
    Eastern: true,
    Southern: true,
    Wan_Chai: true,
  });

  const [datePicker, setDatePicker] = React.useState({
    isVisible: false,
    pickerMode: null,
    display: 'default',
  });

  const toggleDistrict = districtName => {
    switch (districtName) {
      case 'Islands':
        setDistrictData({
          ...districtData,
          Islands: !districtData.Islands,
        });
        break;
      case 'Kwai_Tsing':
        setDistrictData({
          ...districtData,
          Kwai_Tsing: !districtData.Kwai_Tsing,
        });
        break;
      case 'North':
        setDistrictData({
          ...districtData,
          North: !districtData.North,
        });
        break;
      case 'Sai_Kung':
        setDistrictData({
          ...districtData,
          Sai_Kung: !districtData.Sai_Kung,
        });
        break;
      case 'Sha_Tin':
        setDistrictData({
          ...districtData,
          Sha_Tin: !districtData.Sha_Tin,
        });
        break;
      case 'Tai_Po':
        setDistrictData({
          ...districtData,
          Tai_Po: !districtData.Tai_Po,
        });
        break;
      case 'Tsuen_Wan':
        setDistrictData({
          ...districtData,
          Tsuen_Wan: !districtData.Tsuen_Wan,
        });
        break;
      case 'Tuen_Mun':
        setDistrictData({
          ...districtData,
          Tuen_Mun: !districtData.Tuen_Mun,
        });
        break;
      case 'Yuen_Long':
        setDistrictData({
          ...districtData,
          Yuen_Long: !districtData.Yuen_Long,
        });
        break;
      case 'Sham_Shui_Po':
        setDistrictData({
          ...districtData,
          Sham_Shui_Po: !districtData.Sham_Shui_Po,
        });
        break;
      case 'Kowloon_City':
        setDistrictData({
          ...districtData,
          Kowloon_City: !districtData.Kowloon_City,
        });
        break;
      case 'Kwun_Tong':
        setDistrictData({
          ...districtData,
          Kwun_Tong: !districtData.Kwun_Tong,
        });
        break;
      case 'Wong_Tai_Sin':
        setDistrictData({
          ...districtData,
          Wong_Tai_Sin: !districtData.Wong_Tai_Sin,
        });
        break;
      case 'Yau_Tsim_Mong':
        setDistrictData({
          ...districtData,
          Yau_Tsim_Mong: !districtData.Yau_Tsim_Mong,
        });
        break;
      case 'Central_and_Western':
        setDistrictData({
          ...districtData,
          Central_and_Western: !districtData.Central_and_Western,
        });
        break;
      case 'Eastern':
        setDistrictData({
          ...districtData,
          Eastern: !districtData.Eastern,
        });
        break;
      case 'Southern':
        setDistrictData({
          ...districtData,
          Southern: !districtData.Southern,
        });
        break;
      case 'Wan_Chai':
        setDistrictData({
          ...districtData,
          Wan_Chai: !districtData.Wan_Chai,
        });
        break;
      default:
        break;
    }
  };

  const collapseDistrict = districtName => {
    switch (districtName) {
      case 'Islands':
        return districtData.Islands;
      case 'Kwai_Tsing':
        return districtData.Kwai_Tsing;
      case 'North':
        return districtData.North;
      case 'Sai_Kung':
        return districtData.Sai_Kung;
      case 'Sha_Tin':
        return districtData.Sha_Tin;
      case 'Tai_Po':
        return districtData.Tai_Po;
      case 'Tsuen_Wan':
        return districtData.Tsuen_Wan;
      case 'Tuen_Mun':
        return districtData.Tuen_Mun;
      case 'Yuen_Long':
        return districtData.Yuen_Long;
      case 'Sham_Shui_Po':
        return districtData.Sham_Shui_Po;
      case 'Kowloon_City':
        return districtData.Kowloon_City;
      case 'Kwun_Tong':
        return districtData.Kwun_Tong;
      case 'Wong_Tai_Sin':
        return districtData.Wong_Tai_Sin;
      case 'Yau_Tsim_Mong':
        return districtData.Yau_Tsim_Mong;
      case 'Central_and_Western':
        return districtData.Central_and_Western;
      case 'Eastern':
        return districtData.Eastern;
      case 'Southern':
        return districtData.Southern;
      case 'Wan_Chai':
        return districtData.Wan_Chai;
      default:
        break;
    }
  };

  const [inventoryInfo, setInventoryInfo] = React.useState([]);
  const [productInfo, setProductInfo] = React.useState({
    productID: '',
    name: '',
    brand: '',
    image: 'http://172.104.44.182/greenhouse/image/default.png',
    price: '',
    promotionID: '',
    promotionCode: '--',
    detail: '',
    startDate: '',
    endDate: '',
  });
  const [cart, setCart] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState({
    shop: '',
    district: '',
    quantity: 1,
    deliveryDate: '運送日期',
    deliveryTime: '',
    item: '',
    maxQty: 1,
  });

  //<----------------SectionList & FlatList------------------------>
  //<----------------------render---------------------------------->
  const renderSectionHeader = React.useCallback(
    function renderSectionHeader(props) {
      if (typeof props.section.index === 'undefined') {
        let toggleName = props.section.key.toString();
        console.log('header');
        return (
          <TouchableOpacity
            style={styles.collapseToggleContainer}
            onPress={() => {
              toggleDistrict(toggleName);
            }}>
            <Text style={{color: '#F1948A', fontSize: 15}}>
              {props.section.title}
            </Text>
            {collapseDistrict(toggleName) ? (
              <Ionicons name="caret-down-outline" size={25} color="#F1948A" />
            ) : (
              <Ionicons name="caret-up-outline" size={25} color="#F1948A" />
            )}
          </TouchableOpacity>
        );
      }
    },
    [districtData],
  );

  const renderSection = React.useCallback(
    function renderSection(props) {
      console.log('testing...');
      let collapseTemp = props.item.key;
      if (typeof props.item.index === 'undefined') {
        console.log('rendering header collapse');
        return (
          <Collapsible
            collapsed={collapseDistrict(collapseTemp)}
            style={styles.collapsible}>
            <Section item={props.item} />
          </Collapsible>
        );
      } else {
        console.log('rendering cart/////cartttttttttttttt');
        return (
          <View style={styles.viewBtn}>
            <TouchableOpacity
              style={styles.sendBtn}
              onPress={() => {
                console.log(cart);
                navigation.navigate('CartInventory', {
                  cartInfo: cart,
                  productInfo: productInfo,
                  staffData: staffData,
                });
              }}>
              <Text style={{color: 'white'}}>查看調貨籃</Text>
            </TouchableOpacity>
            <View style={{height: 1, width: '100%', marginBottom: 10}} />
          </View>
        );
      }
    },
    [districtData],
  );

  const Section = React.memo(function Section(props) {
    console.log('                  section2 you should render flat-list');
    return (
      <FlatList
        style={{width: '100%'}}
        keyExtractor={flatItem => String(flatItem.shopID)}
        data={props.item.branch}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    );
  });

  const renderItem = React.useCallback(function renderItem({item}) {
    //console.log('item1' + JSON.stringify(item));
    console.log('item1');
    return <Item data={item} />;
  }, []);

  const Item = React.memo(function Item({data}) {
    console.log('item 2------------button open cart ');
    console.log('item1' + JSON.stringify(data));
    return (
      <View style={styles.renderItemListContainer}>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => {
            if (parseInt(data.quantity) > 6) {
              if (parseInt(data.quantity) - 6 > 6) {
                setCurrentItem({
                  ...currentItem,
                  shop: data.shopID,
                  location: data.location,
                  quantity: 1,
                  maxQty: 6,
                });
              } else {
                setCurrentItem({
                  ...currentItem,
                  shop: data.shopID,
                  location: data.location,
                  quantity: 1,
                  maxQty: parseInt(data.quantity) - 6,
                });
              }
              setModalVisible(!modalVisible);
            }
          }}>
          <Text
            style={{
              fontSize: 13,
            }}>
            {data.location}
          </Text>
          <Text
            style={{
              fontSize: 13,
            }}>
            {data.quantity}
          </Text>
        </TouchableOpacity>
      </View>
    );
  });
  //<------------------Widgets------------------------>
  const toggleDiliveryTime = () => {
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
    setCurrentItem({
      ...currentItem,
      deliveryDate: year + '-' + month + '-' + day,
      deliveryTime: hours + ':' + minutes + ':' + '00',
    });
    hideDatePicker();
  };
  //<-------------------------------------------------------->

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.productInfoRow}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: productInfo.image}} />
          </View>
          <View style={styles.productInfoContainer}>
            <View style={(styles.productTextContainer, {marginBottom: 5})}>
              <Text style={{fontSize: 16}}>{productInfo.name}</Text>
            </View>
            <View style={styles.productTextContainer}>
              <Text style={styles.productText}>品牌： {productInfo.brand}</Text>
            </View>
            <View style={styles.productTextContainerWithButton}>
              <View style={styles.productTitleContainer}>
                <Text style={styles.productText}>
                  編號： {productInfo.productID}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.copyBtnContainer}
                onPress={() => {
                  Clipboard.setString(productInfo.productID);
                }}>
                <Text style={{fontSize: 16, color: 'white'}}>複製</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.productTextContainer}>
              <Text style={styles.productText}>單價： {productInfo.price}</Text>
            </View>
            <View style={styles.productTextContainer}>
              <Text style={styles.productText}>
                優惠： {productInfo.detail}
              </Text>
            </View>
          </View>
        </View>
        <SectionList
          style={{width: '100%'}}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          sections={inventoryInfo}
          keyExtractor={(item, index) => index.toString()}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderSection}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <DateTimePickerModal
        display={datePicker.display}
        isVisible={datePicker.isVisible}
        mode={datePicker.pickerMode}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: 'row-reverse',
                width: '100%',
                height: 25,
                //backgroundColor: 'green',
                alignItems: 'center',
              }}>
              <Ionicons
                name="close"
                size={25}
                color="red"
                style={{marginHorizontal: 5}}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                height: 35,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.modalTitle}>{staffData.district}</Text>
              <Text style={styles.modalTitle}>{currentItem.shop}</Text>
            </View>
            <View style={{borderWidth: 0.5, width: 250}} />
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <NumericInput
                maxValue={currentItem.maxQty}
                minValue={1}
                value={currentItem.quantity}
                onChange={value =>
                  setCurrentItem({
                    ...currentItem,
                    quantity: value,
                  })
                }
                totalWidth={240}
                totalHeight={50}
                iconSize={25}
                //step={1.5}
                rounded
                textColor="#B0228C"
                iconStyle={{color: 'white'}}
                rightButtonBackgroundColor="#EA3788"
                leftButtonBackgroundColor="#E56B70"
              />
              <TouchableOpacity
                style={styles.modalDate}
                onPress={() => {
                  toggleDiliveryTime();
                }}>
                <Text style={styles.modalText}>
                  {currentItem.deliveryDate} {currentItem.deliveryTime}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalDate}
                onPress={() => {
                  if (
                    currentItem.deliveryDate === '運送日期' ||
                    currentItem.deliveryTime === ''
                  ) {
                    Alert.alert('注意', '日期時間不能為空！');
                  } else {
                    cart.push({
                      shopID: currentItem.shop,
                      district: currentItem.district,
                      deliveryDate: currentItem.deliveryDate,
                      deliveryTime: currentItem.deliveryTime,
                      quantity: currentItem.quantity,
                      maxQty: currentItem.maxQty,
                    });
                    setModalVisible(!modalVisible);
                  }
                }}>
                <Text style={styles.modalText}>加入調貨籃</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
