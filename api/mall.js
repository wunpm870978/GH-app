/* eslint-disable prettier/prettier */

export const apiMallCategory = async (brand, category, shopID) => {
  const url = 'http://172.104.44.182:3000/category';
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      brand: brand,
      category: category,
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
