/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {
  Alert,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styles from '../../style/discountInfo_style.js';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiDiscountList, combineFetchPromotion} from '../../api/discount.js';

export function DiscountInfoScreen({route, navigation}) {
  const InitialState = {
    isLoading: true,
    token: '',
    toggleFilter: false,
    newRelease: null,
    soonEnd: null,
  };
  const reducer = (prevState, action) => {
    switch (action.type) {
      case 'TOGGLENEW':
        return {
          ...prevState,
          toggleFilter: false,
        };
      case 'TOGGLEEND':
        return {
          ...prevState,
          toggleFilter: true,
        };
      case 'ENDFETCHING':
        return {
          ...prevState,
          token: action.token,
          newRelease: action.newRelease,
          soonEnd: action.soonEnd,
          isLoading: false,
        };
    }
  };
  const [state, dispatch] = React.useReducer(reducer, InitialState);

  React.useLayoutEffect(() => {
    loadPage();
  }, [navigation]);
  const loadPage = async () => {
    let userToken = '';
    userToken = await AsyncStorage.getItem('userToken');

    const [status, results] = await combineFetchPromotion(userToken);
    if (status !== 200 || results.hasOwnProperty('error')) {
      Alert.alert('Error', results.error, [{text: 'OK'}]);
    } else {
      dispatch({
        type: 'ENDFETCHING',
        token: userToken,
        newRelease: results.newP,
        soonEnd: results.endP,
      });
    }
  };

  const searchDiscountList = async (tk, promotionCode) => {
    const [status, result] = await apiDiscountList(tk, promotionCode);
    if (status !== 200) {
      Alert.alert('錯誤', '請稍後再試');
    } else {
      navigation.push('DiscountList', {
        discountList: result,
      });
    }
  };

  const renderItem = React.useCallback(
    function renderItem(props) {
      return <Item data={props.item} />;
    },
    [state.token],
  );

  const Item = React.memo(function Item(props) {
    // console.log('---------------------------------');
    // console.log('I am break line');
    // console.log('---------------------------------');
    // console.log(JSON.stringify(props));
    if (dateTimeValidation(props.data.endDate) === false) {
      return (
        <View style={styles.discountContainer}>
          <View style={styles.timeIconPanel}>
            {dateTimeValidationIcon(props.data.endDate)}
          </View>
          <View style={styles.productPanel}>
            <View style={styles.productSplitPanel}>
              <Text style={{color: 'grey'}}>{props.data.promotionCode}</Text>
            </View>
            <View style={styles.productSplitPanel}>
              <Text style={{color: 'grey'}}>{props.data.detail}</Text>
            </View>
            <View style={styles.productSplitPanel}>
              <Text style={{color: 'grey'}}>
                {dateFormating(props.data.startDate)} -{' '}
                {dateFormating(props.data.endDate)}
              </Text>
            </View>
          </View>
          <View style={styles.discountPanel}>
            <Text style={{color: 'grey'}}>
              {props.data.theme === null ? 'ALL' : props.data.theme}
            </Text>
          </View>
          <View style={styles.copyIconPanel}>
            <Ionicons name="clipboard-outline" size={25} color="grey" />
          </View>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.discountContainer}
          onPress={() => {
            searchDiscountList(state.token, props.data.promotionCode);
          }}>
          <View style={styles.timeIconPanel}>
            {dateTimeValidationIcon(props.data.endDate)}
          </View>
          <View style={styles.productPanel}>
            <View style={styles.productSplitPanel}>
              <Text>{props.data.promotionCode}</Text>
            </View>
            <View style={styles.productSplitPanel}>
              <Text>{props.data.detail}</Text>
            </View>
            <View style={styles.productSplitPanel}>
              <Text>
                {dateFormating(props.data.startDate)} -{' '}
                {dateFormating(props.data.endDate)}
              </Text>
            </View>
          </View>
          <View style={styles.discountPanel}>
            <Text>{props.data.theme === null ? 'ALL' : props.data.theme}</Text>
          </View>
          <View style={styles.copyIconPanel}>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setString(props.data.promotionCode);
              }}>
              <Ionicons name="clipboard-outline" size={25} color="#EA5E2A" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    }
  });

  const dateFormating = val => {
    let newDiscountDate = new Date(val);
    let newDateFormat =
      newDiscountDate.getFullYear() +
      '/' +
      (newDiscountDate.getMonth() + 1) +
      '/' +
      newDiscountDate.getDate();

    return newDateFormat;
  };

  const dateTimeValidation = val => {
    let currentDate = new Date();
    let newDateFormat =
      currentDate.getFullYear() +
      '/' +
      (currentDate.getMonth() + 1) +
      '/' +
      currentDate.getDate();
    let newCurrentDate = new Date(newDateFormat);
    let newDiscountDate = new Date(val);
    if (newDiscountDate.getTime() < newCurrentDate.getTime()) {
      return false;
    } else {
      return true;
    }
  };

  const dateTimeValidationIcon = val => {
    let currentDate = new Date();
    let newDateFormat =
      currentDate.getFullYear() +
      '/' +
      (currentDate.getMonth() + 1) +
      '/' +
      currentDate.getDate();
    let newCurrentDate = new Date(newDateFormat);
    //let newDiscountDateFormat = val.split('/').reverse().join('/');
    //let newDiscountDateFormat = val.split('-').join('/');
    //let newDiscountDate = new Date(newDiscountDateFormat);
    let newDiscountDate = new Date(val);
    switch (true) {
      case newDiscountDate.getTime() < newCurrentDate.getTime():
        return (
          <MaterialIcons name="do-not-disturb-on" size={25} color="grey" />
        );
      case newDiscountDate.getTime() >= newCurrentDate.getTime() + 259200000:
        return <Ionicons name="time" size={25} color="#00ff00" />;
      case newDiscountDate.getTime() < newCurrentDate.getTime() + 259200000:
        return <MaterialIcons name="new-releases" size={25} color="#E5E535" />;
      default:
        break;
    }
  };

  if (state.isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.upperPart}>
          <TouchableOpacity
            onPress={() => {
              //console.log(newRelease);
            }}>
            <MaterialCommunityIcons
              name="lightbulb-on-outline"
              size={state.toggleFilter ? 15 : 20}
              color={state.toggleFilter ? 'grey' : '#E5E535'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch({type: 'TOGGLENEW'});
            }}>
            <Text
              style={[
                {fontSize: state.toggleFilter ? 13 : 15},
                {color: state.toggleFilter ? 'grey' : 'black'},
              ]}>
              最新發佈
            </Text>
          </TouchableOpacity>
          <Text style={{fontSize: 15}}> / </Text>
          <TouchableOpacity
            onPress={() => {
              //console.log(soonEnd);
            }}>
            <MaterialCommunityIcons
              name="exclamation-thick"
              size={state.toggleFilter ? 20 : 15}
              color={state.toggleFilter ? 'red' : 'grey'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch({type: 'TOGGLEEND'});
            }}>
            <Text
              style={[
                {fontSize: state.toggleFilter ? 15 : 13},
                {color: state.toggleFilter ? 'black' : 'grey'},
              ]}>
              即將完結
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomPart}>
          <FlatList
            style={{width: '100%'}}
            keyExtractor={
              state.toggleFilter === false
                ? index => 'newRelease' + index.promotionCode
                : index => 'soonEnd' + index.promotionCode
            }
            data={
              state.toggleFilter === false ? state.newRelease : state.soonEnd
            }
            extraData={state.token}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
}
