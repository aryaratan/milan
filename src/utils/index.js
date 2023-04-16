export * from './constants';

export const setItemInLocalStorage = (key, value) => {
  if(!key || !value){
    console.log("Can not set the value");
    return ;
  }

  const valueToStore = typeof value !== 'string' ? JSON.stringify(value) : value;

  localStorage.setItem(key,valueToStore);
}

export const getItemFromLocalStorage = (key) => {
  if(!key){
    console.log("Can not get item from local storage");
    return ;
  }

  return localStorage.getItem(key);
}

export const removeItemFromLocalStorage = (key) => {
  if(!key){
    console.log("Can not remove item from local storage");
    return ;
  }

  localStorage.removeItem(key);
}


export const getFormBody = (params) => {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
    let encodedValue = encodeURIComponent(params[property]); // aakash 123 => aakash%2020123

    formBody.push(encodedKey + '=' + encodedValue);
  }

  return formBody.join('&'); // 'username=aakash&password=123213'
};
