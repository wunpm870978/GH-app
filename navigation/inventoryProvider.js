/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {BarcodeObtainScreen} from '../screens/scanCode/barcodeObtain.js';
import {SearchInventoryScreen} from '../screens/inventory/inventory_search.js';
import {DisplayInventoryScreen} from '../screens/inventory/inventory_display.js';
import {DisplayQuantityScreen} from '../screens/inventory/inventory_display_qty.js';
import {CartInventoryScreen} from '../screens/inventory/inventory_cart.js';
import {InventoryState, InventoryMethod} from '../api/authText.js';

const Stack = createStackNavigator();

export const InventoryProvider = () => {
  const InitialState = {
    isLoading: false,
    searchQuery: '',
    productID: '',
    cCode: '',
    name: '',
    brand: '',
    image: 'http://172.104.44.182/greenhouse/image/default.png',
    price: '',
    promotionCode: '--',
    detail: '--',
    location: '',
    quantity: 0,
    requestQuantity: 1,
    toggleModal: false,
    currentDate: '',
  };
  const reducer = (prevState, action) => {
    switch (action.type) {
      //handle searching box
      case 'ON_CHANGE_QUERY':
        return {
          ...prevState,
          searchQuery: action.searchQuery,
        };
      //deterine isLoading to be triggered
      case 'FETCHING_API':
        return {
          ...prevState,
          isLoading: action.isLoading,
        };
      //set fields after getting info from backend
      case 'SET_PRODUCT_INFO':
        return {
          ...prevState,
          productID: action.productID,
          cCode: action.cCode,
          name: action.name,
          brand: action.brand,
          image: action.image,
          price: action.price,
          promotionCode: action.promotionCode,
          detail: action.detail,
          location: action.location,
          quantity: action.quantity,
        };
      //toggle modal
      case 'TOGGLE_MODAL':
        return {
          ...prevState,
          toggleModal: !prevState.toggleModal,
        };
      //sending request for changing inventory
      case 'SET_REQUEST_QUANTITY_FIELD':
        return {
          ...prevState,
          requestQuantity: action.requestQuantity,
        };
      default:
        break;
    }
  };
  const [state, dispatch] = React.useReducer(reducer, InitialState);

  const inventoryContext = React.useMemo(
    () => ({
      onChangeSearch: query => {
        dispatch({type: 'ON_CHANGE_QUERY', searchQuery: query});
      },
      isLoading: flag => {
        dispatch({type: 'FETCHING_API', isLoading: flag});
      },
      setProductInfo: productInfo => {
        dispatch({
          type: 'SET_PRODUCT_INFO',
          productID: productInfo.productID,
          cCode: productInfo.cCode,
          name: productInfo.name,
          brand: productInfo.brand,
          image:
            productInfo.image === null
              ? 'http://172.104.44.182/greenhouse/image/default.png'
              : productInfo.image,
          price: productInfo.price,
          promotionCode: productInfo.promotionCode,
          detail: productInfo.detail,
          location: productInfo.location,
          quantity: productInfo.unit,
        });
      },
      toggleModal: () => {
        dispatch({type: 'TOGGLE_MODAL'});
      },
      onChangeRequestQuantity: value => {
        dispatch({
          type: 'SET_REQUEST_QUANTITY_FIELD',
          requestQuantity: value,
        });
      },
    }),
    [],
  );
  return (
    <InventoryState.Provider value={state}>
      <InventoryMethod.Provider value={inventoryContext}>
        <Stack.Navigator initialRouteName="SearchInventory">
          <Stack.Screen
            name="SearchInventory"
            component={SearchInventoryScreen}
            options={{
              title: '查詢倉庫',
              headerStyle: {
                backgroundColor: '#F4F5F8',
              },
              headerTintColor: '#EA5E2A',
            }}
          />
          <Stack.Screen
            name="BarcodeObtain"
            component={BarcodeObtainScreen}
            options={{
              title: 'Barcode',
              headerStyle: {
                backgroundColor: '#F4F5F8',
              },
              headerTintColor: '#EA5E2A',
            }}
          />
          <Stack.Screen
            name="DisplayQuantity"
            component={DisplayQuantityScreen}
            options={{
              title: '貨品資料',
              headerStyle: {
                backgroundColor: '#F4F5F8',
              },
              headerTintColor: '#EA5E2A',
            }}
          />
          <Stack.Screen
            name="DisplayInventory"
            component={DisplayInventoryScreen}
            options={{
              title: '倉庫',
              headerStyle: {
                backgroundColor: '#F4F5F8',
              },
              headerTintColor: '#EA5E2A',
            }}
          />
          <Stack.Screen
            name="CartInventory"
            component={CartInventoryScreen}
            options={{
              title: '調貨籃',
              headerStyle: {
                backgroundColor: '#F4F5F8',
              },
              headerTintColor: '#EA5E2A',
            }}
          />
        </Stack.Navigator>
      </InventoryMethod.Provider>
    </InventoryState.Provider>
  );
};
