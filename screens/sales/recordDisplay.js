/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {View, Text, SectionList, FlatList} from 'react-native';
import styles from '../../style/sales/recordDisplay_style.js';

export function SalesRecordScreen({route, navigation}) {
  React.useLayoutEffect(() => {
    if (route.params?.salesRecord) {
      setSalesRecord(state => route.params?.salesRecord);
    }
  }, [navigation, route.params?.salesRecord]);
  const [salesRecord, setSalesRecord] = React.useState([]);

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
    console.log('item1');
    return <Item data={item} />;
  }, []);
  const Item = React.memo(function Item({data}) {
    console.log(JSON.stringify(data));
    return (
      <View style={styles.itemContainer}>
        <View style={{flex: 7.5, paddingRight: 20}}>
          <Text
            style={{
              fontSize: 15,
              color: 'black',
            }}>
            {data.name} - {data.brand}
          </Text>
        </View>

        <View style={{flex: 2.5}}>
          <Text
            style={{
              fontSize: 15,
              color: 'black',
            }}>
            x {data.quantity}
          </Text>
        </View>
      </View>
    );
  });

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <SectionList
          style={{
            flex: 1,
            width: '100%',
            //backgroundColor: 'blue',
          }}
          contentContainerStyle={{
            width: '100%',
            alignItems: 'center',
            //backgroundColor: 'cyan',
          }}
          sections={salesRecord}
          keyExtractor={item => item.key}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderSection}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
