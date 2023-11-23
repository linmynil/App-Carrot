import { useState,useContext } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View, Image, TouchableOpacity,ToastAndroid } from 'react-native'
import React from 'react'
import AxiosIntance from './AxiosIntance'
import { AppContext } from './AppContext'

const ChangePass = (props) => {
  const {navigation} = props;
  const[email,setemail] = useState("");
  const[password,setpassword] = useState("");
  const [showpass, setshowpass] = useState(false);
  const { setisLogin } = useContext(AppContext);
  const{infoUser,setinfoUser}= useContext(AppContext);
      const ChangePass = async()=>{
           console.log(email,password);
           const responseDK = await AxiosIntance().post("/users/change-password",{email:email,password:password});
           console.log(responseDK.data)
           if(responseDK.error == false){
              ToastAndroid.show("Change Password successful",ToastAndroid.SHORT);
              setisLogin(false);
            }
           else{
              ToastAndroid.show("Change Password fail",ToastAndroid.SHORT)
           }
      }
  return (
      <View style={styles.container}>
        <View style={styles.viewtitle}>
        <Text style={[styles.texttitle,{fontSize:16,marginLeft:117,color:'#000000',fontWeight:'bold'}]}>Change Password</Text>
      </View>
      <View style={[styles.viewtitle,{justifyContent:'center'}]}>

        {
          infoUser.avatar == ""
          ?
          <Image style={[styles.imageSocial,{height:120,width:120,borderRadius:100,marginTop:16}]} source={require('./images/mypic.jpg')}></Image>
          :
          <Image style={[styles.imageSocial,{height:120,width:120,borderRadius:100,marginTop:16}]} source={{uri:infoUser.avatar }}></Image>
        }
      
      </View>
          <View style={[styles.viewtitle,{marginTop:30}]}>
              <Text style={styles.texttitle}>Username</Text>
              <Text style={[styles.texttitle, { color: 'red' }]}>*</Text>
          </View>
          <Text style={[styles.textInput,{padding:12}]}>{infoUser.email}</Text>
          
          <View style={styles.viewtitle}>
              <Text style={styles.texttitle}>Old Password</Text>
              <Text style={[styles.texttitle, { color: 'red' }]}>*</Text>
          </View>
          <View style={styles.textInput}>
              <TextInput
                  secureTextEntry={showpass ? false : true}
                  onChangeText={setpassword}
              />
              <TouchableOpacity onPress={() => setshowpass(!showpass)}>
                  <Image style={styles.eye} source={

                      showpass
                          ? require('./images/show.png')
                          : require('./images/hide.png')
                  }>
                  </Image>
              </TouchableOpacity>
          </View>

          <View style={styles.viewtitle}>
              <Text style={styles.texttitle}>New Password</Text>
              <Text style={[styles.texttitle, { color: 'red' }]}>*</Text>
          </View>
          <View style={styles.textInput}>
              <TextInput
                  secureTextEntry={showpass ? false : true}
                  onChangeText={setpassword}
              />
              <TouchableOpacity onPress={() => setshowpass(!showpass)}>
                  <Image style={styles.eye} source={

                      showpass
                          ? require('./images/show.png')
                          : require('./images/hide.png')
                  }>
                  </Image>
              </TouchableOpacity>
          </View>
          
          <Pressable style={styles.buttonLogin} onPress={ChangePass}>
              <Text style={styles.textLogin}>Change</Text>
          </Pressable>
        
      </View>

  )
}

export default ChangePass

const styles = StyleSheet.create({
  container: {
      flex: 1,
      marginTop: 24,
      marginStart: 20,
      marginEnd: 24,
      flexDirection: 'column'
  },
  text: {
      fontWeight: '700',
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontSize: 48,
      lineHeight: 72,
      letterspacing: 0.12,
      color: '#1877F2'
  },
  welcomeText: {
      fontFamily: 'Popins',
      fontSize: 20,
      marginTop: 4,
      fontWeight: '400',
      color: '#4E4B66',
      letterSpacing: 0.12,
      fontStyle: 'normal',
      marginBottom: 45,
  },
  viewtitle: {
      flexDirection: 'row',
       
  },
  texttitle: {
      fontFamily: 'Popins',
      fontSize: 14,
      marginBottom: 4,
      fontWeight: '400',
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
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

  },
  viewRemember: {
      flexDirection: 'row',
      justifyContent:'center'
  },
  buttonLogin: {
      height: 50,
      backgroundColor: '#1877F2',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 17.5,
  },
  textLogin: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold'
  },
  imageSocial: {
      width: 20,
      height: 20,
      marginEnd: 5,
  },
  buttonSocial: {
      flexDirection: 'row',
      width: 160,
      height: 48,
      backgroundColor: '#EEF1F4',
      marginTop: 10,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
  },
  eye: {
      width: 18,
      height: 18,
      marginRight: 15
  }

})