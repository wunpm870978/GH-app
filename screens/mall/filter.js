/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {Alert, Text, View, TouchableOpacity, FlatList} from 'react-native';
import styles from '../../style/mall/filter_style.js';
import {Searchbar} from 'react-native-paper';
import {apiMallCategory} from '../../api/mall.js';

export function MallMainScreen({route, navigation}) {
  React.useLayoutEffect(() => {
    setStaffData(route.params?.staffData);
  }, [navigation, route.params?.staffData]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const [focus, setFocus] = React.useState('1000B');
  const title = ['1000B', '仟八物語', '健康食品', '1000Girl', '即時優惠'];
  const btn1000B = ['面膜', '面霜', '精華', '潤膚水', '潔面', '防曬', '彩妝'];
  const btn1000_8 = [
    '面膜',
    '面霜',
    '精華',
    '潤膚水',
    '潔面',
    '防曬',
    '彩妝',
    '卸妝',
  ];
  const [staffData, setStaffData] = React.useState({
    staffID: '',
    location: '',
    district: '',
    position: '',
    token: '',
    shopID: '',
  });

  const renderItem = React.useCallback(
    function renderItem(props) {
      return (
        <TouchableOpacity
          style={{
            height: 40,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: focus === props.item ? 'white' : null,
          }}
          onPress={() => {
            setFocus(props.item);
          }}>
          <Text style={{fontSize: 15}}>{props.item}</Text>
        </TouchableOpacity>
      );
    },
    [focus],
  );
  const renderItemBtn = React.useCallback(
    function renderItemBtn(props) {
      return (
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => {
            //asd
            categoryResult(props.item);
          }}>
          <Text>{props.item}</Text>
        </TouchableOpacity>
      );
    },
    [staffData, focus],
  );
  const categoryResult = async val => {
    console.log(focus);
    console.log(val);
    console.log(staffData.shopID);
    const response = await apiMallCategory(focus, val, staffData.shopID);
    if (response.hasOwnProperty('error')) {
      Alert.alert('Error', response.error, [{text: 'OK'}]);
    } else {
      console.log(response);
      navigation.push('ProductList', {
        productList: response,
      });
    }
  };

  React.useEffect(() => {
    selection(focus);
  }, [focus]);

  const selection = val => {
    switch (val) {
      case '1000B':
        return (
          <View style={styles.categoryRightContainer}>
            <FlatList
              style={styles.btnFlatList}
              columnWrapperStyle={{flexWrap: 'wrap'}}
              numColumns={3}
              keyExtractor={index => index.toString()}
              data={btn1000B}
              extarData={[staffData, val]}
              renderItem={renderItemBtn}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        );
      case '仟八物語':
        return (
          <View style={styles.categoryRightContainer}>
            <FlatList
              style={styles.btnFlatList}
              columnWrapperStyle={{flexWrap: 'wrap'}}
              numColumns={3}
              keyExtractor={index => index.toString()}
              data={btn1000_8}
              extarData={[staffData, val]}
              renderItem={renderItemBtn}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.searchView}>
        <Searchbar
          style={{width: '100%'}}
          placeholder="在商店內搜索..."
          onChangeText={onChangeSearch}
          value={searchQuery}
          onIconPress={() => {
            //getData();
          }}
        />
      </View>
      <View style={styles.filerContainer}>
        <View style={styles.leftContainer}>
          <View style={styles.categoryLeftContainer}>
            <Text style={{fontSize: 15}}>推薦分類</Text>
          </View>
          <FlatList
            style={{width: '100%'}}
            keyExtractor={index => index.toString()}
            data={title}
            extarData={focus}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={styles.rightContainer}>{selection(focus)}</View>
      </View>
    </View>
  );
}
