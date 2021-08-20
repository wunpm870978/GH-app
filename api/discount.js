/* eslint-disable prettier/prettier */

export const apiDiscountList = async (token, promotionCode) => {
  const url = 'http://172.104.44.182:3000/promotion/discountProduct';
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({
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

export const combineFetchPromotion = async token => {
  const url = 'http://172.104.44.182:3000/promotion/combinedPromotionList';
  const requestOptions = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    redirect: 'follow',
  };
  try {
    const response = await fetch(url, requestOptions);
    const results = await response.json();
    const status = await response.status;
    return [status, results];
  } catch (error) {
    console.log('test', error);
    throw error;
  }
};
