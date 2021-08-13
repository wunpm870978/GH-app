/* eslint-disable prettier/prettier */

//api link
const url = 'http://172.104.44.182:3000/barcode';

export const apiBarcode = async barcode => {
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      productID: barcode,
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
