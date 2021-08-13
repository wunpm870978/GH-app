/* eslint-disable prettier/prettier */

export const apiFetchShopInventory = async (searchQuery, district, token) => {
  const url = 'http://172.104.44.182:3000/inventory/inventory';
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      productID: searchQuery,
      district: district,
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

export const apiFetchProductInfo = async (searchQuery, token) => {
  const url = 'http://172.104.44.182:3000/inventory/productInfo';
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      productID: searchQuery,
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

export const apiFetchProductQty = async (searchQuery, shopID, token) => {
  const url = 'http://172.104.44.182:3000/inventory/checkProductQuantity';
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      productID: searchQuery,
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
