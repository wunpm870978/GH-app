/* eslint-disable prettier/prettier */
import {Platform} from 'react-native';

export const apiCreateSalesRecord = async (
  photo,
  date,
  time,
  price,
  paymentMethod,
  promotionCode,
  productList,
  remark,
  shopID,
  staffID,
) => {
  const url = 'http://172.104.44.182:3000/sales/createSales';
  const data = new FormData();
  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
  });

  data.append('date', date);
  data.append('time', time);
  data.append('totalPrice', price);
  data.append('paymentMethod', paymentMethod);
  data.append('promotionCode', promotionCode);
  data.append('remark', remark);
  data.append('productList', JSON.stringify(productList));
  data.append('shopID', shopID);
  data.append('staffID', staffID);

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
    let status = 404;
    return [status, JSON.stringify(error)];
  }
};

export const apiFetchSalesRecord = async (startDate, endDate, shopID, link) => {
  const url = 'http://172.104.44.182:3000/sales/' + link;
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      startDate: startDate,
      endDate: endDate,
      shopID: shopID,
    }),
    redirect: 'follow',
  };
  try {
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    const status = await response.status;
    return [status, result];
  } catch (error) {
    console.log(error);
    throw error;
  }
};
