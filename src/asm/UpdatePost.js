import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, ToastAndroid, Image, TouchableOpacity } from 'react-native'
import React, { useState,useEffect,useContext } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AxiosIntance from './AxiosIntance';
import { AppContext } from './AppContext'
const UpdatePost = (props) => {
  const { navigation } = props;
  const { route } = props;
  const { params } = route;
  const [data, setdata] = useState([]);
  const [image, setimage] = useState(null);
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [isImage, setisImage] = useState(false);
  const {isReload, setisReload } = useContext(AppContext);

  useEffect(() => {
    const getDetails = async () => {
        const response = await AxiosIntance().get("/articles/" + params.id + "/detail");
        console.log(response);
        if (response.error == false) { // get data successful
            settitle(response.data[0].title);
            setcontent(response.data[0].content);
            setimageUrl(response.data[0].image);
            setisImage(flase)
        }
        else {
            ToastAndroid.show("Get data fail", ToastAndroid.SHORT)
        }
    }
    getDetails();
    return () => {

    }
}, [])

  const capture = async () => {
    const result = await launchCamera();
    console.log(result.assets[0].uri);
    const formdata = new FormData();
    formdata.append('image', {
      uri: result.assets[0].uri,
      type: 'image/jpeg',
      name: 'image.jpg',
    });

    const response = await AxiosIntance("multipart/form-data").post('/media/upload', formdata);
    console.log(response.data.path);
    if (response.error == false) {
      setisImage(true);
      setimage(response.data.path);
      ToastAndroid.show("Get image successful", ToastAndroid.SHORT)
    }
    else {
      ToastAndroid.show("Get image fail", ToastAndroid.SHORT)
    }
  }
  const getImageLibrary = async () => {
    const result = await launchImageLibrary();
    console.log(result.assets[0].uri);

    const formdata = new FormData();
    formdata.append('image', {
      uri: result.assets[0].uri,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    const response = await AxiosIntance("multipart/form-data").post('/media/upload', formdata);
    console.log(response.data.path);

  }

  const Push = async () => {
    const response = await AxiosIntance().put("/articles/"+ params.id +"/update", { title: title, content: content, image: image });
    if (response.error == false) {
      setisImage(true);
      setimage(response.data.path);
      ToastAndroid.show("Update successful", ToastAndroid.SHORT)
      setisReload(true);
    }
    else {
      ToastAndroid.show("Update fail", ToastAndroid.SHORT)
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.viewtitle, { justifyContent: 'space-between', marginStart: 28, marginRight: 34.5 }]}>
        <Image style={[styles.imageSocial, { width: 16, height: 15.56 }]} source={require('./images/Vector.png')}></Image>
        <Text style={[styles.texttitle, { fontSize: 16, color: '#000000', fontWeight: 'bold' }]}>Update News</Text>
        <Image style={[styles.imageSocial, { width: 19, height: 20 }]} ></Image>
      </View>
      <View style={styles.content}>
      {
          isImage==true
          ?
          <Image style={styles.image} source={{uri: image}} >
          </Image>
          :
          <Image style={styles.image} source={{ uri: imageUrl }} >
          </Image>
        }
       
        <ScrollView>
          <TextInput placeholder='News title' value={title} style={styles.textInput} onChangeText={settitle}></TextInput>
          <TextInput placeholder='Add News/Article' value={content} style={[styles.textInput, { fontSize: 16, marginTop: 5,color:'#A0A3BD' }]} onChangeText={setcontent}></TextInput>
        </ScrollView>
      </View>

      <View style={styles.bottom}>
        <View style={[styles.viewtitle, {
          justifyContent: 'center',
        }]}>
          <TouchableOpacity onPress={getImageLibrary}>
            <Image style={[styles.imageSocial, { width: 22, height: 19, }]} source={require('./images/pic.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={capture}>
            <Image style={[styles.imageSocial, { width: 25, height: 20, marginLeft: 20 }]} source={require('./images/camera.png')}></Image>
          </TouchableOpacity>
        </View>

        <Pressable style={styles.buttonLogin} onPress={Push}  >
          <Text style={styles.textLogin}>Update</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default UpdatePost

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30.72,
  },
  content: {
    flex: 8,
    marginStart: 24,
    marginEnd: 24,
    flexDirection: 'column'
  },
  image: {
    marginTop: 20,
    width: 343,
    height: 183,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#A0A3BD',
    marginBottom: 16,
  },
  viewtitle: {
    flexDirection: 'row',
  },
  textInput: {
    fontFamily: 'Popins',
    fontSize: 24,
    fontWeight: '400',
    color: '#00000',
    letterSpacing: 0.12,
    fontStyle: 'normal',
  },
  bottom: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginStart: 24,
    marginEnd: 24,
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
  buttonLogin: {
    width: 100,
    height: 40,
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
  imageSocial: {
    width: 50,
    height: 50,
  },

})
