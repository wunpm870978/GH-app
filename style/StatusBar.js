/* eslint-disable prettier/prettier */
import React from 'react';
import {View, SafeAreaView, StatusBar} from 'react-native';

export const MyStatusBar = ({backgroundColor, ...props}) => (
  <View
    style={[
      //{height: StatusBar.currentHeight},
      {backgroundColor},
    ]}>
    <SafeAreaView>
      <StatusBar backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);
