/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {
  View,
  Text,
  SectionList,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import styles from '../../style/sales/recordDisplay_style.js';
import {SalesState} from '../../api/authText.js';

export function SalesRecordScreen({route, navigation}) {
  const salesState = React.useContext(SalesState);
  const [tabContent, setTabContent] = React.useState('accumulatedOrder');

  const renderSectionHeader = React.useCallback(function renderSectionHeader(
    props,
  ) {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.text}>{props.section.titleDate}</Text>
        <View style={{width: '90%', borderWidth: 0.5, borderColor: 'grey'}} />
      </View>
    );
  },
  []);
  const renderSection = React.useCallback(function renderSection(props) {
    return <Section item={props.item} />;
  }, []);
  const Section = React.memo(function Section(props) {
    console.log(JSON.stringify(props));
    return (
      <View style={styles.section}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 7.5}}>
            <Text>{props.item.time}</Text>
          </View>
          <View style={{flex: 2.5, alignItems: 'flex-end'}}>
            <Text>${props.item.totalPrice}</Text>
          </View>
        </View>
        <FlatList
          style={{width: '100%'}}
          keyExtractor={(flatItem, index) => index.toString()}
          data={props.item.data}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  });
  const renderItem = React.useCallback(function renderItem({item}) {
    //console.log('item1');
    return <Item data={item} />;
  }, []);
  const Item = React.memo(function Item({data}) {
    //console.log(JSON.stringify(data));
    return (
      <View style={styles.itemContainer}>
        <View style={{flex: 7.5, paddingRight: 20}}>
          <Text style={{fontSize: 15}}>
            {data.name} - {data.brand}
          </Text>
        </View>

        <View style={{flex: 2.5}}>
          <Text style={{fontSize: 15}}>x {data.quantity}</Text>
        </View>
      </View>
    );
  });
  const tab_mapping = [
    {key: 'accumulatedOrder', title: '營業額', color: 'green'},
    {key: 'accumulatedProduct', title: '累積銷售', color: 'red'},
    {key: 'recordList', title: '詳細記錄', color: 'yellow'},
  ];
  const tabRender = tab_mapping.map((element, index) => {
    return (
      <TouchableOpacity
        key={element.key}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: tabContent === element.key ? '#A9CA81' : 'white',
        }}
        onPress={() => setTabContent(element.key)}>
        <Text
          key={element.key + 'Title'}
          style={{color: tabContent === element.key ? 'white' : 'grey'}}>
          {element.title}
        </Text>
      </TouchableOpacity>
    );
  });
  const dateTransform = val => {
    let date = new Date(val);
    return (
      date.getFullYear() +
      ' - ' +
      (date.getMonth() + 1) +
      ' - ' +
      date.getDate()
    );
  };
  const renderItemO = React.useCallback(function renderItemO({item}) {
    return <ItemO data={item} />;
  }, []);
  const ItemO = React.memo(function ItemO({data}) {
    return (
      <View style={styles.overallHeader}>
        <Text style={styles.text}>{dateTransform(data.orderDate)}</Text>
        <View
          style={{
            width: '90%',
            borderWidth: 0.5,
            borderColor: 'grey',
            marginBottom: 5,
          }}
        />
        <View style={styles.section}>
          <View style={styles.overallContent}>
            <Text style={styles.overallText}>當日銷售單數:</Text>
            <Text style={styles.overallText}>{data.countPerDay}</Text>
          </View>
          <View style={styles.overallContent}>
            <Text style={styles.overallText}>當日營業額:</Text>
            <Text style={styles.overallText}>${data.sumPerDay}</Text>
          </View>
        </View>
      </View>
    );
  });
  const renderItemA = React.useCallback(function renderItemA({item}) {
    return <ItemA data={item} />;
  }, []);
  const ItemA = React.memo(function ItemA({data}) {
    return (
      <View style={styles.overallContentA}>
        <View style={{flex: 2}}>
          <Text style={{fontSize: 15}}>{data.productID}</Text>
        </View>
        <View style={{flex: 3.5}}>
          <Text style={{fontSize: 15}}>{data.name}</Text>
        </View>
        <View style={{flex: 2.5}}>
          <Text style={{fontSize: 15}}>{data.brand}</Text>
        </View>
        <View style={{flex: 2}}>
          <Text style={{alignSelf: 'center', fontSize: 15}}>
            {data.accumulatedQty}
          </Text>
        </View>
      </View>
    );
  });

  const panel = tab => {
    switch (tab) {
      case 'accumulatedOrder':
        return (
          <FlatList
            keyExtractor={item => item.orderDate}
            style={{flex: 1, width: '100%'}}
            contentContainerStyle={{
              width: '100%',
              alignItems: 'center',
            }}
            data={salesState.overallRecord}
            renderItem={renderItemO}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        );
      case 'accumulatedProduct':
        return (
          <View style={styles.overallHeader}>
            <View style={styles.overallTitle}>
              <Text style={{flex: 2}}>編號</Text>
              <Text style={{flex: 3.5}}>名稱</Text>
              <Text style={{flex: 2.5}}>品牌</Text>
              <Text style={{flex: 2}}>共售數量</Text>
            </View>
            <View
              style={{
                width: '100%',
                borderWidth: 0.5,
                borderColor: 'grey',
                marginBottom: 5,
              }}
            />
            <FlatList
              keyExtractor={item => item.productID}
              contentContainerStyle={{
                width: '100%',
                alignItems: 'center',
              }}
              data={salesState.accumulatedRecord}
              renderItem={renderItemA}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        );
      case 'recordList':
        return (
          <SectionList
            style={{flex: 1, width: '100%'}}
            contentContainerStyle={{
              width: '100%',
              alignItems: 'center',
            }}
            sections={salesState.salesRecord}
            keyExtractor={item => item.key}
            renderSectionHeader={renderSectionHeader}
            renderItem={renderSection}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        );
      default:
        break;
    }
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>{panel(tabContent)}</View>
      <View
        style={{
          width: '100%',
          height: 60,
          flexDirection: 'row',
          backgroundColor: 'cyan',
        }}>
        {tabRender}
      </View>
    </View>
  );
}
