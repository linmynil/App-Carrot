import { StyleSheet, Text, View, Image, TextInput, Pressable, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext } from 'react'
import { transform } from '@babel/core'
import { AppContext } from './AppContext'
import AxiosIntance from './AxiosIntance'
import { launchCamera } from 'react-native-image-picker'

const Profile = (props) => {
  const { navigation } = props;
  const { infoUser, setinfoUser } = useContext(AppContext);
  const { setisLogin } = useContext(AppContext);
  console.log(infoUser);
  const ClickNe = () => {
    //Truyền tên Screen muốn chuyển qua vào navigate
    navigation.navigate('ChangePass');
  }
  const Logout = async () => {
    try {
      const responseDK = await AxiosIntance().get('/auth/logout');
      if (responseDK.error == false) {
        ToastAndroid.show("Logout successful", ToastAndroid.SHORT);
        navigation.navigate('News');
        setisLogin(false);
        
      }
      else {
        ToastAndroid.show("Logout fail", ToastAndroid.SHORT)
      }
    } catch (e) {
      console.log(e);
    }
    return false;
  }
  const capture = async () => {
    const result = await launchCamera();
    console.log(result.assets[0].uri);
    const formdata = new FormData();
    formdata.append('image', {
      uri: result.assets[0].uri,
      type: 'image/jpeg',
      name: 'image.jpg',
    }); const response = await AxiosIntance("multipart/form-data").post('/media/upload', formdata);
    console.log(response.data.path);
    setinfoUser({ ...infoUser, avatar: response.data.path })
  }

  const UpdateProfile = async () => {
    const response = await AxiosIntance().post("/users/update-profile", { name: infoUser.name, address: infoUser.address, email: infoUser.email, phone: infoUser.phone, avatar: infoUser.avatar })
    if (response.error == false) {
      ToastAndroid.show("Update successful", ToastAndroid.SHORT)
    }
    else {
      ToastAndroid.show("Update fail", ToastAndroid.SHORT)
    }
  }



  return (
    <View style={styles.container}>
      <View style={styles.viewtitle}>
        <Image style={styles.imageSocial} source={require('./images/Vector.png')}>
        </Image>

        <Text style={[styles.texttitle, { fontSize: 16, marginLeft: 117, color: '#000000', fontWeight: 'bold' }]}>Fill your Profile</Text>
      </View>
      <View style={[styles.viewtitle, { justifyContent: 'center' }]}>

        {
          infoUser.avatar == ""
            ?
            <Image style={[styles.imageSocial, { height: 120, width: 120, borderRadius: 100, marginTop: 16, position: 'absolute' }]} source={require('./images/mypic.jpg')}></Image>
            :
            <Image style={[styles.imageSocial, { height: 120, width: 120, borderRadius: 100, marginTop: 16, position: 'absolute' }]} source={{ uri: infoUser.avatar }}></Image>
        }
        <TouchableOpacity onPress={capture}>
          <Image style={[styles.imageSocial, { height: 30, width: 30, position: 'absolute', bottom: -135, transform: [{ translateX: 40 }] }]} source={require('./images/Frame.png')}></Image>
        </TouchableOpacity>
      </View>
      <Text style={[styles.texttitle, { marginTop: 150 }]}>Username</Text>
      <TextInput style={styles.textInput} value={infoUser.name} onChangeText={(text) => setinfoUser({ ...infoUser, name: text })}></TextInput>
      <Text style={styles.texttitle}>Address</Text>
      <TextInput style={[styles.textInput, { marginBottom: 4 }]} value={infoUser.address} onChangeText={(text) => setinfoUser({ ...infoUser, address: text })}></TextInput>
      <View style={[styles.viewtitle, { marginTop: 16 }]}>
        <Text style={styles.texttitle}>Email address</Text>
        <Text style={[styles.texttitle, { color: 'red' }]}>*</Text>
      </View>
      <TextInput style={[styles.textInput, { marginBottom: 4 }]} value={infoUser.email} onChangeText={(text) => setinfoUser({ ...infoUser, email: text })}></TextInput>
      <View style={[styles.viewtitle, { marginTop: 16 }]}>
        <Text style={styles.texttitle}>Phone Number</Text>
        <Text style={[styles.texttitle, { color: 'red' }]}>*</Text>
      </View>
      <TextInput style={[styles.textInput, { marginBottom: 4 }]} value={infoUser.phone} onChangeText={(text) => setinfoUser({ ...infoUser, phone: text })}></TextInput>

      <Pressable style={styles.buttonLogin} onPress={UpdateProfile}>
        <Text style={styles.textLogin}>Update</Text>
      </Pressable>
      <View style={styles.button}>
        <Pressable style={[styles.buttonLogin, { width: 160 }]} onPress={ClickNe}>
          <Text style={styles.textLogin}>ChangePass</Text>
        </Pressable>
        <Pressable style={[styles.buttonLogin, { width: 150 }]} onPress={Logout}>
          <Text style={styles.textLogin} >Logout</Text>
        </Pressable>
      </View>

    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginStart: 20,
    marginEnd: 24,
    flexDirection: 'column'
  },
  viewtitle: {
    flexDirection: 'row',
  },
  texttitle: {
    fontFamily: 'Popins',
    fontSize: 14,
    marginBottom: 4,
    fontWeight: '600',
    color: '#4E4B66',
    letterSpacing: 0.12,
    fontStyle: 'normal',
  },
  textInput: {
    height: 48,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#4E4B66',
    marginBottom: 16,

  },
  imageSocial: {
    width: 16,
    height: 16,
  },
  buttonLogin: {
    height: 48,
    marginTop: 20,
    backgroundColor: '#1877F2',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLogin: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }

})