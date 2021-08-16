/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {
  Image,
  FlatList,
  Text,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
} from 'react-native';
import styles from '../../style/mall/productList_style.js';

export function ProductListScreen({route, navigation}) {
  React.useLayoutEffect(() => {
    if (route.params?.productList) {
      setProductList(state => route.params?.productList);
    }
  }, [navigation, route.params?.productList]);

  const [productList, setProductList] = React.useState([]);
  const renderItem = React.useCallback(function renderItem(props) {
    console.log(props);
    return (
      <View style={styles.productRow}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri:
                props.item.image === null
                  ? 'http://172.104.44.182/greenhouse/image/default.png'
                  : props.item.image,
            }}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text>名稱：{props.item.name}</Text>
          <Text>品牌：{props.item.brand}</Text>
          <Text>單價：${props.item.price}</Text>
          <Text>數量：{props.item.unit}</Text>
        </View>
      </View>
    );
  }, []);

  return (
    <View style={styles.mainContainer}>
      <FlatList
        style={{width: '100%'}}
        keyExtractor={item => String(item.cCode)}
        data={productList}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
