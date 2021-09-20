/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  KeyboardAvoidingView,
  Alert,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {apiCreateMembership} from '../../api/membership.js';
import {LoginState} from '../../api/authText.js';

export function CreateMembershipScreen({route, navigation}) {
  const loginState = React.useContext(LoginState);
  const InitialState = {
    phoneNo: '',
    email: '',
    firstName: '',
    lastName: '',
  };
  const reducer = (prevState, action) => {
    switch (action.type) {
      case 'SET_PHONE_FIELD':
        return {
          ...prevState,
          phoneNo: action.phoneNo,
        };
      case 'SET_EMAIL_FIELD':
        return {
          ...prevState,
          email: action.email,
        };
      case 'SET_FIRSTNAME_FIELD':
        return {
          ...prevState,
          firstName: action.firstName,
        };
      case 'SET_LASTNAME_FIELD':
        return {
          ...prevState,
          lastName: action.lastName,
        };
      case 'RESET_ALL_FIELDS':
        return {
          ...prevState,
          phoneNo: '',
          email: '',
          firstName: '',
          lastName: '',
        };
      default:
        break;
    }
  };
  const [state, dispatch] = React.useReducer(reducer, InitialState);

  const handlePhoneField = val => {
    dispatch({type: 'SET_PHONE_FIELD', phoneNo: val});
  };
  const handleEmailField = val => {
    dispatch({type: 'SET_EMAIL_FIELD', email: val});
  };
  const handleFNameField = val => {
    dispatch({type: 'SET_FIRSTNAME_FIELD', firstName: val});
  };
  const handleLNameField = val => {
    dispatch({type: 'SET_LASTNAME_FIELD', lastName: val});
  };
  const inputValid = () => {
    if (
      state.phone === '' ||
      state.email === '' ||
      state.firstName === '' ||
      state.lastName === ''
    ) {
      Alert.alert('注意', '輸入不能為空!');
    } else {
      Alert.alert(
        '確認資料',
        '電話號碼: ' +
          state.phoneNo +
          '\nEmail: ' +
          state.email +
          '\n名字: ' +
          state.firstName +
          '\n姓氏: ' +
          state.lastName,
        [
          {
            text: '取消',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: '確定',
            onPress: async () => {
              const status = await apiCreateMembership(
                state.phoneNo,
                state.email,
                state.firstName,
                state.lastName,
                loginState.token,
              );
              if (status === 200) {
                dispatch({type: 'RESET_ALL_FIELDS'});
                navigation.goBack();
              } else {
                Alert.alert('注意', '新增失敗!');
              }
            },
          },
        ],
      );
    }
  };
  const textInputRender = (placeholder, value, onChange) => {
    return (
      <KeyboardAvoidingView style={styles.textinputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor="#707070"
          value={value}
          onChangeText={onChange}
        />
      </KeyboardAvoidingView>
    );
  };
  return (
    <KeyboardAvoidingView style={styles.background}>
      <KeyboardAvoidingView style={styles.container}>
        {textInputRender('電話號碼...', state.phoneNo, handlePhoneField)}
        {textInputRender('Email...', state.email, handleEmailField)}
        {textInputRender('名字...', state.firstName, handleFNameField)}
        {textInputRender('姓氏...', state.lastName, handleLNameField)}
        <KeyboardAvoidingView style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.createBtn}
            onPress={() => {
              inputValid();
            }}>
            <Text style={{color: 'white'}}>創建</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </KeyboardAvoidingView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#F4F5F8',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginVertical: 15,
    marginHorizontal: 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinputContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'grey',
    marginVertical: 10,
    alignItems: 'center',
  },
  textInput: {
    height: 50,
    color: '#707070',
    width: '90%',
  },
  btnContainer: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createBtn: {
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A9CA81',
    borderRadius: 10,
  },
});
