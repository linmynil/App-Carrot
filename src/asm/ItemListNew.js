import { StyleSheet, Text, View, Image, Dimensions, Pressable, TouchableOpacity,ToastAndroid } from 'react-native'
import React,{useContext} from 'react'
import AxiosIntance from './AxiosIntance'
import { AppContext } from './AppContext'

const ItemListNew = (props) => {
    const { isUpdate,dulieu, navigation } = props;
    const {isReload, setisReload } = useContext(AppContext);
    const ClickItem = () => {
        navigation.navigate("NewsDetail", {dulieu:dulieu});

    }
    const ClickItemUpdate = () => {
        navigation.navigate("UpdatePost", { id: dulieu._id });
    }

    const Delete = async () => {
        const response = await AxiosIntance().delete("/articles/" + dulieu._id + "/delete");
        if (response.error == false) {
            ToastAndroid.show("Delete successful", ToastAndroid.SHORT);
            setisReload(true);
        }
        else {
            ToastAndroid.show("Delete fail", ToastAndroid.SHORT)
        }
    }
    return (

        <View>
            {
                isUpdate == true ? (
                    <View style={styles.item}>
                        <TouchableOpacity onPress={ClickItemUpdate}>
                            <View style={styles.container}>
                                <Image style={styles.image} source={{ uri: dulieu.image }}></Image>
                                <View style={styles.content2}>
                                    {/* <Pressable style={styles.buttonLogin} onPress={ClickNe}> */}
                                    <Text numberOfLines={2} style={[styles.textTitle, { marginBottom: 4 }]}>{dulieu.title}</Text>
                                    {/* </Pressable> */}
                                    <Text numberOfLines={2} style={styles.textcontent}>{dulieu.content}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View>
                            <Pressable onPress={Delete} style={styles.buttonLogin} >
                                <Text style={styles.textLogin} >Delete</Text>
                            </Pressable>
                        </View>
                    </View>
                ) : (
                    <View style={styles.item}>
                        <TouchableOpacity onPress={ClickItem}>
                            <View style={styles.container}>
                                <Image style={styles.image} source={{ uri: dulieu.image }}></Image>
                                <View style={styles.content}>
                                    {/* <Pressable style={styles.buttonLogin} onPress={ClickNe}> */}
                                    <Text numberOfLines={1} style={[styles.textTitle, { marginBottom: 4 }]}>{dulieu.name}</Text>
                                    {/* </Pressable> */}
                                    <Text numberOfLines={1} style={styles.textcontent}>{dulieu.price}</Text>
                                    <Text numberOfLines={1} style={styles.textcontent}>{dulieu.quantity}</Text>

                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            }
        </View>


    )
}

export default ItemListNew

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    item: {
        marginTop: 32,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    image: {
        width: 96,
        height: 90,
        borderRadius: 10,
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000'
    },
    textcontent: {
        fontFamily: 'Popins',
        fontSize: 14,
        marginBottom: 4,
        fontWeight: '400',
        color: '#4E4B66',
        letterSpacing: 0.12,
        fontStyle: 'normal',
    },
    content: {
        height: 90,
        marginStart: 4,
        width: Dimensions.get('window').width - 96 - 4 - 64
    },
    content2: {
        height: 90,
        marginStart: 4,
        width: Dimensions.get('window').width - 96 - 4 - 64 - 70
    },
    buttonLogin: {
        width: 80,
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
})