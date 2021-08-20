/* eslint-disable prettier/prettier */

export const apiFetchShopInventory = async (searchQuery, district, token) => {
  const url = 'http://172.104.44.182:3000/inventory/inventory';
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({
      productID: searchQuery,
      district: district,
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

export const apiFetchProductInfo = async (searchQuery, token) => {
  const url = 'http://172.104.44.182:3000/inventory/productInfo';
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({
      productID: searchQuery,
    }),
    redirect: 'follow',
  };
  try {
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    const status = await response.status;
    return [status, result];
  } catch (error) {
    console.log('inventory', error);
    let status = 404;
    let result = error;
    return [status, result];
  }
};

export const apiFetchProductQty = async (searchQuery, shopID, token) => {
  const url = 'http://172.104.44.182:3000/inventory/checkProductQuantity';
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({
      productID: searchQuery,
      shopID: shopID,
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
