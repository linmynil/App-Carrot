import { useContext, useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View, Image, ToastAndroid, EyeIconOrImage, TouchableOpacity } from 'react-native'
import React from 'react'
import CheckBox from '@react-native-community/checkbox'
import AxiosIntance from './AxiosIntance'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppContext } from './AppContext'
const Login = (props) => {
    const { navigation } = props;
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const { setisLogin } = useContext(AppContext);
    const { setinfoUser } = useContext(AppContext);
    const [showpass, setshowpass] = useState(false);
    const ClickNe = () => {
        //Truyền tên Screen muốn chuyển qua vào navigate
        navigation.navigate('Signup');
    }
    const Login = async () => {
        try {
            console.log(email, password);
            const responseDK = await AxiosIntance().post('user/login', { email: email, password: password });
            console.log(responseDK.data)
            console.log(responseDK.error);
            if (responseDK.error == false) {
                ToastAndroid.show("Đăng nhập thành công", ToastAndroid.SHORT);
                await AsyncStorage.setItem('token', responseDK.data.token);
                console.log(responseDK.data.token);
                setinfoUser(responseDK.data.user)
                setisLogin(true);
            }
            else {
                ToastAndroid.show("Đăng kí Không thành công", ToastAndroid.SHORT)
            }
        } catch (e) {
            console.log(e);
        }

        return false;
    }
    const [toggleCheckBox, setToggleCheckBox,] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello</Text>
            <Text style={[styles.text, { color: '#1877F2' }]}>Again!</Text>
            <Text style={styles.welcomeText}>Welcome back you’ve {'\n'}been missed </Text>
            <View style={styles.viewtitle}>
                <Text style={styles.texttitle}>Username</Text>
                <Text style={[styles.texttitle, { color: 'red' }]}>*</Text>
            </View>
            <TextInput style={styles.textInput} onChangeText={setemail}></TextInput>
            <View style={styles.viewtitle}>
                <Text style={styles.texttitle}>Password</Text>
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

            <View style={[styles.viewRemember, { justifyContent: 'space-between' }]}>
                <View style={styles.viewRemember}>
                    <CheckBox
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={newValue => setToggleCheckBox(newValue)}
                        tintColors={{ true: '#1877F2', false: '#1877F2' }}
                    /><Text style={[styles.texttitle, { marginTop: 5.5 }]}>Remember me</Text>
                </View>
                <Text style={[styles.texttitle, { marginTop: 5.5, color: '#5890FF' }]}>Forgot the password?</Text>
            </View>
            <Pressable style={styles.buttonLogin} onPress={Login}>
                <Text style={styles.textLogin}>Login</Text>
            </Pressable>
            <Pressable style={styles.buttonLogin} onPress={ClickNe}>
                <Text style={styles.textLogin}>Register</Text>
            </Pressable>
            <Text style={[styles.texttitle, { marginTop: 16, marginBottom: 16, textAlign: 'center' }]}>or continue with</Text>
            <View style={[styles.viewRemember, { justifyContent: 'space-between' }]}>
                <Pressable style={[styles.buttonSocial]}>
                    <Image style={styles.imageSocial} source={require('./images/facebook-new.png')}></Image>
                    <Text style={[styles.textLogin, { color: '#667080' }]}>Facebook</Text>
                </Pressable>
                <Pressable style={styles.buttonSocial}>
                    <Image style={styles.imageSocial} source={require('./images/icons8-google-48.png')}></Image>
                    <Text style={[styles.textLogin, { color: '#667080' }]}>Google</Text>
                </Pressable>
            </View>
            <Text style={[styles.texttitle, { marginTop: 16, marginBottom: 16, textAlign: 'center' }]}>don’t have an account ?  </Text>


        </View>

    )
}

export default Login

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
        color: '#050505'
    },
    welcomeText: {
        fontFamily: 'Popins',
        fontSize: 20,
        marginTop: 4,
        fontWeight: '400',
        color: '#4E4B66',
        letterSpacing: 0.12,
        fontStyle: 'normal',
        marginBottom: 48,
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
        flexDirection: 'row',
        justifyContent: 'space-between'
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