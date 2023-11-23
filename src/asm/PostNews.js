import { View, Text, StyleSheet, ScrollView, Pressable, TextInput,ToastAndroid, Image,TouchableOpacity } from 'react-native'
import React,{useState,useContext} from 'react'
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AxiosIntance from './AxiosIntance';
import { AppContext } from './AppContext'

const PostNews = (props) => {
  const { navigation } = props;
 const[image,setimage] = useState(null);
 const[title,settitle] = useState("");
 const[content,setcontent] = useState("");
 const {isReload, setisReload } = useContext(AppContext);
 const { setisLogin } = useContext(AppContext);
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
    if(response.error == false){
      setimage(response.data.path);
      ToastAndroid.show("Get image successful", ToastAndroid.SHORT)
    }
    else{
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

    const Push = async()=>{
      const response = await AxiosIntance().post("/articles",{title:title,content:content, image:image});
      if(response.error == false){
        setimage(response.data.path);
        setisLogin(true);
        setisReload(true);
        ToastAndroid.show("Push successful", ToastAndroid.SHORT)
      }
      else{
        ToastAndroid.show("Push image fail", ToastAndroid.SHORT)
      }
    }

  return (
    <View style={styles.container}>
      <View style={[styles.viewtitle, { justifyContent: 'center'}]}>
       {/* // <Image style={[styles.imageSocial, { width: 16, height: 15.56 }]} source={require('./images/Vector.png')}></Image> */}
        <Text style={[styles.texttitle, { fontSize: 16, color: '#000000', fontWeight: 'bold' }]}>Create News</Text>
        {/* <Image style={[styles.imageSocial, { width: 19, height: 20 }]} source={require('./images/share.png')}></Image> */}
      </View>
      <View style={styles.content}>

        <Image style={styles.image} source={{uri: image}}>
        </Image>
        <ScrollView>
          <TextInput placeholder='News title'style={styles.textInput} onChangeText={settitle}></TextInput>
          <TextInput placeholder='Add News/Article' style={[styles.textInput, { fontSize: 16, marginTop: 5 }]} onChangeText={setcontent}></TextInput>
        </ScrollView>
      </View>

      <View style={styles.bottom}>
        <View style={[styles.viewtitle, {
          justifyContent: 'center',
        }]}>
          <TouchableOpacity onPress={getImageLibrary}>
          <Image  style={[styles.imageSocial, { width: 22, height: 19, }]} source={require('./images/pic.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={capture}>
          <Image style={[styles.imageSocial, { width: 25, height: 20, marginLeft: 20 }]} source={require('./images/camera.png')}></Image>
          </TouchableOpacity>           
        </View>

        <Pressable style={styles.buttonLogin} onPress={Push}  >
          <Text style={styles.textLogin}  >Push</Text>
        </Pressable>
      </View>

    </View>
  )
}

export default PostNews

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
    color: '#A0A3BD',
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
