/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {SafeAreaView, Text, View, ScrollView} from 'react-native';
import styles from '../../style/companyNews_style.js';

export function NewsContentScreen({route, navigation}) {
  React.useLayoutEffect(() => {
    if (route.params?.news) {
      setNewsData(state => ({
        date: route.params?.news.createDate,
        title: route.params?.news.title,
        content: route.params?.news.content,
      }));
    }
  }, [navigation, route.params?.news]);
  const [newsData, setNewsData] = React.useState({
    date: '',
    title: '',
    content: '',
  });
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.upperPart}>
          <Text style={{fontSize: 15}}>
            {newsData.createDate} {newsData.title}
          </Text>
          <View
            style={{borderWidth: 1, width: '80%', borderColor: '#F1948A'}}
          />
        </View>
        <View style={styles.bottomPart}>
          <ScrollView>
            <Text>{newsData.content}</Text>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
