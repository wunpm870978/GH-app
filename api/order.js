/* eslint-disable prettier/prettier */
import {Platform} from 'react-native';

export const apiUploadPaymentRecord = async (
  photo,
  memberInfo,
  productList,
  paymentMethod,
  discountType,
  promotionCode,
  freeProductList,
  shopID,
  staffID,
  totalPrice,
) => {
  const url = 'http://172.104.44.182:3000/uploadPaymentRecord';
  const data = new FormData();
  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
  });
  data.append('memberInfo', JSON.stringify(memberInfo));
  data.append('productList', JSON.stringify(productList));
  data.append('paymentMethod', paymentMethod);
  data.append('discountType', discountType);
  data.append('promotionCode', promotionCode);
  data.append('freeProductList', JSON.stringify(freeProductList));
  data.append('shopID', shopID);
  data.append('staffID', staffID);
  data.append('totalPrice', totalPrice);

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
    console.log('apiUploadPaymentRecord', error);
    throw error;
  }
};

export const apiDiscountCalculation = async (productList, promotionCode) => {
  const url = 'http://172.104.44.182:3000/discountCalculation';

  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      productList: productList,
      promotionCode: promotionCode,
    }),
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
