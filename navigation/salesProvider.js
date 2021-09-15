/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SelectSalesScreen} from '../screens/sales/selectSales.js';
import {CreateSalesScreen} from '../screens/sales/createSales.js';
import {CheckSalesScreen} from '../screens/sales/checkSales.js';
import {SalesRecordScreen} from '../screens/sales/recordDisplay.js';
import {SuccessScreen} from '../screens/sales/success.js';

import {SalesState, SalesMethod} from '../api/authText.js';

const Stack = createStackNavigator();

export const SalesProvider = () => {
  const InitialState = {
    // variables from checkSales.js
    isVisible: false,
    pickerMode: null,
    display: 'calendar',
    flag: false,
    startDate: '開始日期',
    endDate: '結束日期',
    salesRecord: [],
    overallRecord: [],
    accumulatedRecord: [],
    //variables from createSales.js
    date: '日期',
    time: '時間',
    productID: '',
    name: '',
    brand: '',
    promotionPickerList: [],
    promotionCode: null,
    paymentMethod: '',
    price: '',
    remark: '',
    isVisible_createSales: false,
    modalVisible_createSales: false,
    pickerMode_createSales: 'datetime',
    display_createSales: 'spinner',
    response: '未選擇任何相片',
    productList: [],
  };
  const reducer = (prevState, action) => {
    switch (action.type) {
      //state for checkSales.js
      case 'TOGGLE_CALENDAR':
        return {
          ...prevState,
          flag: action.flag,
          pickerMode: action.pickerMode,
          isVisible: !prevState.isVisible,
        };
      case 'RESET_CALENDAR':
        return {
          ...prevState,
          startDate: action.startDate,
          endDate: action.endDate,
          pickerMode: null,
          isVisible: false,
          flag: false,
        };
      case 'SET_SALES_PERIOD':
        return {
          ...prevState,
          startDate: action.startDate,
          endDate: action.endDate,
          isVisible: false,
        };
      case 'SET_SALES_RECORD':
        return {
          ...prevState,
          salesRecord: action.salesRecord,
          overallRecord: action.overallRecord,
          accumulatedRecord: action.accumulatedRecord,
        };
      //State for createSales.js
      case 'UPLOADING_RECORD':
        return {
          ...prevState,
          isLoading: action.isLoading,
        };
      case 'SET_PRODUCTID':
        return {
          ...prevState,
          productID: action.productID,
        };
      case 'SET_PRODUCTLIST':
        return {
          ...prevState,
          productList: action.productList,
          price: action.price,
        };
      case 'SET_PROMOTION_PICKER':
        return {
          ...prevState,
          promotionPickerList: action.promotionPickerList,
        };
      case 'SELECT_PROMOTION_PICKER':
        return {
          ...prevState,
          promotionCode: action.promotionCode,
        };
      case 'SET_PROMOTION':
        return {
          ...prevState,
          promotionCode: action.promotionCode,
        };
      case 'SET_PRICE':
        return {
          ...prevState,
          price: action.price,
        };
      case 'SET_PAYMENTMETHOD':
        return {
          ...prevState,
          paymentMethod: action.paymentMethod,
        };
      case 'SET_REMARK':
        return {
          ...prevState,
          remark: action.remark,
        };
      case 'TOGGLE_MODAL':
        return {
          ...prevState,
          modalVisible_createSales: !prevState.modalVisible_createSales,
        };
      case 'TOGGLE_ORDERTIME':
        return {
          ...prevState,
          isVisible_createSales: !prevState.isVisible_createSales,
        };
      case 'CONFIRM_DATE_TIME_PICKER':
        return {
          ...prevState,
          date: action.date,
          time: action.time,
          isVisible_createSales: !prevState.isVisible_createSales,
        };

      case 'LAUNCH_CAMERA':
        return {
          ...prevState,
          response: action.response,
        };
      //Reset variables...
      case 'RESET_ALL_FIELDS':
        return {
          ...prevState,
          // variables from checkSales.js
          isVisible: false,
          pickerMode: null,
          display: 'calendar',
          flag: false,
          startDate: '開始日期',
          endDate: '結束日期',
          salesRecord: [],
          //variables from createSales.js
          date: '日期',
          time: '時間',
          productID: '',
          name: '',
          brand: '',
          promotionPickerList: [],
          promotionCode: null,
          paymentMethod: '',
          price: '',
          remark: '',
          isVisible_createSales: false,
          modalVisible_createSales: false,
          pickerMode_createSales: 'datetime',
          display_createSales: 'spinner',
          response: '未選擇任何相片',
          productList: [],
        };
      case 'RESET_DATES':
        return {
          ...prevState,
          startDate: '開始日期',
          endDate: '結束日期',
        };
      default:
        break;
    }
  };
  const [state, dispatch] = React.useReducer(reducer, InitialState);
  const salesContext = React.useMemo(
    () => ({
      //--------------checkSales.js-------------------//
      //flag is to determine startDate or endDate
      toggleCalendar: flag => {
        dispatch({
          type: 'TOGGLE_CALENDAR',
          pickerMode: 'date',
          flag: flag,
        });
      },
      resetCalendar: () => {
        if (state.flag === false) {
          dispatch({
            type: 'RESET_CALENDAR',
            startDate: '開始日期',
            endDate: state.endDate,
          });
        } else {
          dispatch({
            type: 'RESET_CALENDAR',
            endDate: '結束日期',
            startDate: state.startDate,
          });
        }
      },
      setSalesPeriodDate: val => {
        let day = ('0' + val.getDate()).slice(-2);
        let month = ('0' + (val.getMonth() + 1)).slice(-2);
        let year = val.getFullYear();
        if (state.flag === false) {
          dispatch({
            type: 'SET_SALES_PERIOD',
            startDate: year + '-' + month + '-' + day,
            endDate: state.endDate,
          });
        } else {
          dispatch({
            type: 'SET_SALES_PERIOD',
            startDate: state.startDate,
            endDate: year + '-' + month + '-' + day,
          });
        }
      },
      setSalesPeriodRecord: (salesRecord, overallRecord, accumulatedRecord) => {
        dispatch({
          type: 'SET_SALES_RECORD',
          salesRecord: salesRecord,
          overallRecord: overallRecord,
          accumulatedRecord: accumulatedRecord,
        });
      },
      //------------------createSales.js--------------//
      //time field
      toggleDateTime: () => {
        dispatch({
          type: 'TOGGLE_ORDERTIME',
        });
      },
      setSalesDateTime: val => {
        let day = ('0' + val.getDate()).slice(-2);
        let month = ('0' + (val.getMonth() + 1)).slice(-2);
        let year = val.getFullYear();
        let hours = ('0' + val.getHours()).slice(-2);
        let minutes = ('0' + val.getMinutes()).slice(-2);
        dispatch({
          type: 'CONFIRM_DATE_TIME_PICKER',
          date: year + '-' + month + '-' + day,
          time: hours + ':' + minutes + ':' + '00',
        });
      },
      resetSalesDateTime: () => {
        dispatch({
          type: 'CONFIRM_DATE_TIME_PICKER',
          date: '日期',
          time: '時間',
        });
      },
      //search with product id or name
      handleItemChange: val => {
        dispatch({
          type: 'SET_PRODUCTID',
          productID: val,
        });
      },
      //promotion field
      handlePromotionChange: val => {
        dispatch({
          type: 'SET_PRODUCTID',
          promotionCode: val,
        });
      },
      setPromotionPicker: promotionPickerList => {
        dispatch({
          type: 'SET_PROMOTION_PICKER',
          promotionPickerList: promotionPickerList,
        });
      },
      selectPromotionPicker: selected => {
        dispatch({type: 'SELECT_PROMOTION_PICKER', promotionCode: selected});
      },
      //price field
      handlePriceChange: val => {
        dispatch({
          type: 'SET_PRICE',
          price: val,
        });
      },
      //payment method field
      handlePaymentMethodChange: val => {
        dispatch({type: 'SET_PAYMENTMETHOD', paymentMethod: val});
      },
      //remark field
      handleRemarkChange: val => {
        dispatch({
          type: 'SET_NOTICE',
          notice: val,
        });
      },
      toggleModal: () => {
        dispatch({type: 'TOGGLE_MODAL'});
      },
      isLoading: val => {
        dispatch({
          type: 'UPLOADING_RECORD',
          isLoading: val,
        });
      },
      setProductList: (cart, price) => {
        dispatch({
          type: 'SET_PRODUCTLIST',
          productList: cart,
          price: price,
        });
      },
      toggleCamera: val => {
        dispatch({
          type: 'LAUNCH_CAMERA',
          response: val,
        });
      },
      //---------reset all <variables-------------//
      resetAllFields: () => {
        dispatch({type: 'RESET_ALL_FIELDS'});
      },
      resetDates: () => {
        dispatch({type: 'RESET_DATES'});
      },
    }),
    [state.endDate, state.flag, state.startDate],
  );
  return (
    <SalesState.Provider value={state}>
      <SalesMethod.Provider value={salesContext}>
        <Stack.Navigator initialRouteName="SelectSales">
          <Stack.Screen
            name="SelectSales"
            component={SelectSalesScreen}
            options={{
              title: '營業額',
              headerStyle: {
                backgroundColor: '#F4F5F8',
              },
              headerTintColor: '#EA5E2A',
            }}
          />
          <Stack.Screen
            name="CreateSales"
            component={CreateSalesScreen}
            options={{
              title: '新增本期營業額',
              headerStyle: {
                backgroundColor: '#F4F5F8',
              },
              headerTintColor: '#EA5E2A',
            }}
          />
          <Stack.Screen
            name="Success"
            component={SuccessScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CheckSales"
            component={CheckSalesScreen}
            options={{
              title: '查看營業額',
              headerStyle: {
                backgroundColor: '#F4F5F8',
              },
              headerTintColor: '#EA5E2A',
            }}
          />
          <Stack.Screen
            name="SalesRecord"
            component={SalesRecordScreen}
            options={{
              title: '營業額數據',
              headerStyle: {
                backgroundColor: '#F4F5F8',
              },
              headerTintColor: '#EA5E2A',
            }}
          />
        </Stack.Navigator>
      </SalesMethod.Provider>
    </SalesState.Provider>
  );
};
