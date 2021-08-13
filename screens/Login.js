/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Alert,
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import 'react-native-gesture-handler';
import styles from '../style/login_style.js';
import Anticon from 'react-native-vector-icons/AntDesign';
import Micon from 'react-native-vector-icons/MaterialIcons';
import {AuthContext} from '../api/authText.js';
import {apiLoginHandle} from '../api/login.js';
export function LoginScreen({navigation}) {
  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const [isForgot, setIsForgot] = React.useState(false);

  const {signIn} = React.useContext(AuthContext);

  const loginHandle = async (username, password) => {
    if (data.username.length === 0 || data.password.length === 0) {
      Alert.alert('非有效輸入！', '使用者名稱或密碼不能為空', [{text: 'OK'}]);
      handlePasswordChange('');
      return;
    } else {
      const [status, result] = await apiLoginHandle(username, password);
      if (status !== 200 || result.hasOwnProperty('error')) {
        Alert.alert('非有效用戶', '使用者名稱或密碼錯誤', [{text: 'OK'}]);
        handlePasswordChange('');
      } else {
        signIn(result);
      }
    }
  };

  const textInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = val => {
    setData({
      ...data,
      password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const handleValidPassword = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        isValidPassword: false,
      });
    }
  };

  const forgotHandle = val => {
    setIsForgot(val);
  };

  const signinPanel = () => {
    return (
      <View>
        <View style={styles.inputView}>
          <View style={styles.row}>
            <Anticon
              name="user"
              size={25}
              color="grey"
              style={{paddingRight: 5}}
            />
            <TextInput
              style={[{height: 50}, {color: 'black'}, {width: '80%'}]}
              placeholder="使用者名稱..."
              placeholderTextColor="grey"
              onChangeText={val => textInputChange(val)}
              onEndEditing={e => handleValidUser(e.nativeEvent.text)}
            />
            {data.check_textInputChange ? (
              <Anticon
                name="checkcircleo"
                size={20}
                color="green"
                style={{flexDirection: 'row-reverse'}}
              />
            ) : null}
          </View>
          {data.isValidUser ? null : (
            <Text style={styles.warnText}>使用者名稱最少含4個字符！</Text>
          )}
          <View style={styles.row}>
            <Anticon
              name="lock"
              size={25}
              color="grey"
              style={{paddingRight: 5}}
            />
            <TextInput
              style={[{height: 50}, {color: 'black'}, {width: '80%'}]}
              secureTextEntry={data.secureTextEntry ? true : false}
              placeholder="密碼..."
              placeholderTextColor="grey"
              value={data.password}
              onChangeText={val => handlePasswordChange(val)}
              onEndEditing={e => handleValidPassword(e.nativeEvent.text)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Micon
                  name="visibility-off"
                  size={20}
                  style={[{flexDirection: 'row-reverse'}]}
                />
              ) : (
                <Micon
                  name="visibility"
                  size={20}
                  style={[{flexDirection: 'row-reverse'}]}
                />
              )}
            </TouchableOpacity>
          </View>
          {data.isValidPassword ? null : (
            <Text style={styles.warnText}>密碼最少擁有4個字符！</Text>
          )}
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              loginHandle(data.username, data.password);
            }}>
            <Text style={{color: 'white'}}>登入</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const forgotPanel = () => {
    return (
      <View>
        <View style={styles.inputView}>
          <View style={styles.row}>
            <Anticon
              name="user"
              size={25}
              color="grey"
              style={
                {paddingRight: 5}
                // {flexDirection: 'row-reverse'}
              }
            />
            <TextInput
              style={[{height: 50}, {color: 'black'}, {width: '80%'}]}
              placeholder="Email..."
              placeholderTextColor="grey"
              onChangeText={val => textInputChange(val)}
              onEndEditing={e => handleValidUser(e.nativeEvent.text)}
            />
            {data.check_textInputChange ? (
              <Anticon
                name="checkcircleo"
                size={20}
                color="green"
                style={{flexDirection: 'row-reverse'}}
              />
            ) : null}
          </View>
          {data.isValidUser ? null : (
            <Text style={styles.warnText}>
              Username must be at least 4 characters longs
            </Text>
          )}
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              //loginHandle(data.username, data.password);
              //Alert.alert(Users);
            }}>
            <Text style={{color: 'white'}}>發送電郵</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../images/logo/logo_gh.png')}
          />
        </View>
        <View style={styles.toggleView}>
          <View style={styles.toggleLeft}>
            {!isForgot ? (
              <TouchableOpacity
                onPress={() => forgotHandle(false)}
                style={styles.toggleButton}>
                <Text style={{color: 'black', fontSize: 13}}>登入</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => forgotHandle(false)}
                style={styles.toggleButtonFalse}>
                <Text style={{color: 'white', fontSize: 13}}>登入</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.toggleRight}>
            {isForgot ? (
              <TouchableOpacity
                onPress={() => forgotHandle(true)}
                style={styles.toggleButton}>
                <Text style={{color: 'black', fontSize: 13}}>忘記密碼</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => forgotHandle(true)}
                style={styles.toggleButtonFalse}>
                <Text style={{color: 'white', fontSize: 13}}>忘記密碼</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        {!isForgot ? signinPanel() : forgotPanel()}
      </View>
    </View>
  );
}
