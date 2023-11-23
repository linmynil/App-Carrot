import { View, Text, Image } from 'react-native'
import React, { useContext } from 'react'
import Login from './Login'
import Signup from './Signup'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListNew from './ListNew';
import Profile from './Profile';
import NewsDetail from './NewsDetail';
import { AppContext } from './AppContext';
import PostNews from './PostNews';
import MyPosts from './MyPosts';
import UpdatePost from './UpdatePost';
import ChangePass from './ChangePass';


//login, register => stack
const Stack = createNativeStackNavigator();
const Users = () => {
    return (
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }} >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
    )
}
//list news, profile, news manager
const News = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ListNew" component={ListNew} />
            <Stack.Screen name="NewsDetail" component={NewsDetail} />
        </Stack.Navigator>
    )
}
const Post = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MyPosts" component={MyPosts} />
            <Stack.Screen name="UpdatePost" component={UpdatePost} />
        </Stack.Navigator>
    )
}
const MyProfile = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="ChangePass" component={ChangePass} />
        </Stack.Navigator>
    )
}
const Tab = createBottomTabNavigator();
const Main = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === 'News') {
                        return <Image source={require('./images/home.png')}></Image>
                    } else if (route.name === 'PostNews') {
                        return <Image source={require('./images/explore.png')}></Image>
                    }
                    else if (route.name === 'Post') {
                        return <Image source={require('./images/Mypost.png')}></Image>
                    }
                    else if (route.name === 'MyProfile') {
                        return <Image source={require('./images/profile.png')}></Image>
                    }
                },
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'gray',
            })} >
            <Tab.Screen name="News" component={News} options={{headerShown: false}} />
            <Tab.Screen name="PostNews" component={PostNews} options={{headerShown: false}} />
            <Tab.Screen name="Post" component={Post}options={{headerShown: false}}/>
            <Tab.Screen name="MyProfile" component={MyProfile} options={{headerShown: false}} />
        </Tab.Navigator>
    )
}
const AppNavigator = () => {
    const { isLogin } = useContext(AppContext);
    return (
        <>
            {
                isLogin == false ? <Users /> : <Main />
            }
        </>
    )
}

export default AppNavigator