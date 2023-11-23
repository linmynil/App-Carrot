import { FlatList, StyleSheet, Text, View, Image, Pressable, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState,useContext } from 'react'
import ItemListNew from './ItemListNew'
import AxiosIntance from './AxiosIntance'
import { AppContext } from './AppContext'
const MyPosts = (props) => {
  const { navigation } = props;
  const [data, setdata] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const {isUpdate, setisUpdate } = useContext(AppContext);
  const {isReload, setisReload } = useContext(AppContext);

  useEffect(() => {
    const getNews = async () => {
      const response = await AxiosIntance().get("/articles/my-articles");
      if (response.error == false) { // get data successful
        setdata(response.data);
        setisLoading(false);
        setisUpdate(true);
      }
      else {
        ToastAndroid.show("Get data fail")
      }
    }
    getNews();
    return () => {

    }
  }, [isReload == true])
  return (
    <View style={styles.content}>
       <View style={[styles.viewtitle,{justifyContent:'center'}]}>
              {/* <Image style={[styles.imageSocial, { width: 16, height: 15.56 }]} source={require('./images/Vector.png')}></Image> */}
              <Text style={[styles.texttitle, {  height: 35,fontSize: 16, color: '#000000', fontWeight: 'bold' }]}>My Posts</Text>
              {/* <Image style={[styles.imageSocial, { width: 19, height: 20 }]} source={require('./images/share.png')}></Image> */}
            </View>
    <View style={styles.container}>
      {
        isLoading == true ? (
          <View>
            <ActivityIndicator size='large' color='#fff00'></ActivityIndicator>
            <Text >Loading...</Text>
          </View>
        ) : (
          <View>
            <View style={styles.flatlist}>
              <FlatList
                data={data}
                renderItem={({ item }) => <ItemListNew dulieu={item} navigation={navigation}  isUpdate={isUpdate}/>}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        )
      }

    </View>
    </View>
  )
}

export default MyPosts

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
},
content: {
  flex: 1,
  marginStart: 24,
  marginEnd: 24,
  flexDirection: 'column',
},

viewtitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:30
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
  imageSocial: {
    width: 99,
    height: 30,
  },
  flatlist: {
    flex: 1,
    flexDirection: 'column',
    marginTop:-20
  },
})