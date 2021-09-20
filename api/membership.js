/* eslint-disable prettier/prettier */

export const apiCreateMembership = async (
  phone,
  email,
  firstName,
  lastName,
  token,
) => {
  const url = 'http://172.104.44.182:3000/createMembership';
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({
      phone: phone,
      email: email,
      firstName: firstName,
      lastName: lastName,
    }),
    redirect: 'follow',
  };
  try {
    const response = await fetch(url, requestOptions);
    const status = await response.status;
    return status;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
