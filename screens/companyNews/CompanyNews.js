/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import styles from '../../style/companyNews_style.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export function CompanyNewsScreen({route, navigation}) {
  React.useLayoutEffect(() => {
    apiNews();
  }, [navigation]);
  const [apiData, setApiData] = React.useState(null);
  const apiNews = async () => {
    let userToken = '';
    userToken = await AsyncStorage.getItem('userToken');
    const requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
      redirect: 'follow',
    };

    fetch('http://172.104.44.182:3000/news', requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.hasOwnProperty('error')) {
          Alert.alert('Error', result.error, [{text: 'OK'}]);
        } else {
          setApiData(result);
        }
      })
      .catch(error => console.log('error', error));
  };

  const renderItem = React.useCallback(function renderItem(props) {
    console.log('test');
    return <Item data={props.item} />;
  }, []);

  const Item = React.memo(function Item(props) {
    console.log('---------------------------------');
    console.log('I am break line');
    console.log('---------------------------------');
    console.log(JSON.stringify(props));
    let year = moment(props.data.createDate).get('year');
    let month = moment(props.data.createDate).get('month') + 1;
    let day = moment(props.data.createDate).get('date');
    let fullDateForm = year + '/' + month + '/' + day;
    return (
      <TouchableOpacity
        style={styles.newsContainer}
        onPress={() => {
          navigation.navigate({
            name: 'NewsContent',
            params: {news: props.data},
            merge: true,
          });
        }}>
        <View style={styles.newsLeftPanel}>
          <Text>{fullDateForm}</Text>
          <Text>{props.data.title}</Text>
        </View>
        <View style={styles.newsRightPanel}>
          <FontAwesome name="newspaper-o" size={25} color="black" />
        </View>
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.upperPart}>
          <Text style={{fontSize: 15}}>最新發佈</Text>
          <View style={{borderWidth: 1, width: 75, borderColor: '#F1948A'}} />
        </View>
        <View style={styles.bottomPart}>
          <FlatList
            style={{width: '100%'}}
            keyExtractor={flatItem => String(flatItem.newsID)}
            data={apiData}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
}
