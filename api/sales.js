/* eslint-disable prettier/prettier */
import {Platform} from 'react-native';

export const apiCreateSalesRecord = async (
  photo,
  salesData,
  productList,
  staffData,
) => {
  const url = 'http://172.104.44.182:3000/sales/createSales';
  const data = new FormData();
  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
  });

  data.append('date', salesData.date);
  data.append('time', salesData.time);
  data.append('shopID', staffData.shopID);
  data.append('totalPrice', salesData.price);
  data.append('productList', JSON.stringify(productList));

  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: data,
    redirect: 'follow',
  };
  try {
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    const status = await response.status;
    return [status, result];
  } catch (error) {
    console.log('test', error);
    throw error;
  }
};

export const apiFetchSalesRecord = async (
  orderDateStart,
  orderDateEnd,
  shopID,
  token,
) => {
  const url = 'http://172.104.44.182:3000/sales/checkSales';
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      orderDateStart: orderDateStart,
      orderDateEnd: orderDateEnd,
      shopID: shopID,
      token: token,
    }),
    redirect: 'follow',
  };
  try {
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
