import { FlatList, StyleSheet, Text, View, Image, Pressable, ToastAndroid, ActivityIndicator,TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState,useContext } from 'react'
import ItemListNew from './ItemListNew'
import axios from 'axios'
import AxiosIntance from './AxiosIntance'
import { AppContext } from './AppContext'

const ListNew = (props) => {
    const { navigation } = props;
    const [data, setdata] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [searchtext, setsearchtext] = useState("");
    const {isUpdate, setisUpdate } = useContext(AppContext);
    const {isReload, setisReload } = useContext(AppContext);
    // useEffect(() => {
    //     const getNews = async () => {
    //         const res = await axios.get('https://63e44bd5c04baebbcda386d2.mockapi.io/mob306');
    //         if (res != "") {
    //             setdata(res.data);
    //         }
    //     }
    //     getNews();
    //     return () => { }
    // }, []);
    useEffect(() => {
        const getNews = async () => {
            const response = await AxiosIntance().get("/product/get-all");
             if(response.error == false){ // get data successful
                setdata(response.data);
                console.log(response.data);
                setisLoading(false);
             }
             else{
                ToastAndroid.show("Get data fail")
             }
        }
        getNews();
        return () => {

        }
    }, [isReload])

const search =async()=>{
    setisLoading(true);
    const response = await AxiosIntance().get("/articles/search?title=" + searchtext);
    if(response.error == false){ // get data successful
        setdata(response.data);
        setisLoading(false);
        
     }
     else{
        ToastAndroid.show("Get data fail",ToastAndroid.SHORT);
     }
}
    
    // const ClickNe = () => {
    //     //Truyền tên Screen muốn chuyển qua vào navigate
    //     navigation.navigate('NewsDetail');
    // }
    return (
        <View style={styles.container}>
             {
                isLoading ==true ?(
                <View >
                    <ActivityIndicator size='large' color='#fff00'></ActivityIndicator>
                    <Text>Loading...</Text>
                </View>
                ):(
                <View  >
                {/* <View style={styles.viewtitle}>
                    <Image style={styles.imageSocial} source={require('./images/kabar.png')}></Image>
                    <Image style={[styles.imageSocial, { width: 18.5, height:21, marginTop: 4 }]} source={require('./images/ring.png')}></Image>
                </View> */}

                {/* <View  style={styles.search}>
                <TextInput style={styles.texttitle} placeholder='search' onChangeText={setsearchtext}></TextInput>
                <TouchableOpacity onPress={search}>
                <Image style={[styles.imageSocial, { width: 18, height: 19, marginRight:5 }]} source={require('./images/search.png')}></Image>
                </TouchableOpacity>
                </View> */}
                    
                <View style={[styles.viewtitle, { marginTop: 10 }]}>
                    <Text style={[styles.texttitle, { fontSize: 25, color: '#000000', fontWeight: 'bold' }]}>Danh sách sản phẩm</Text>
                    {/* <Text style={styles.texttitle}>See all</Text> */}
                </View>
                {/* <View style={[styles.viewtitle, { marginTop: 16, justifyContent: 'space-between' }]}>
                    <Text style={[styles.texttitle, { fontSize: 16, color: '#000000', fontWeight: 'bold' }]}>All</Text>
                    <Text style={styles.texttitle}>Sports</Text>
                    <Text style={styles.texttitle}>Politics</Text>
                    <Text style={styles.texttitle}>Business</Text>
                    <Text style={styles.texttitle}>Health</Text>
                    <Text style={styles.texttitle}>Travel</Text>
                    <Text style={styles.texttitle}>Science</Text>
                </View> */}
                <Image style={[styles.imageSocial, { width: 19, height: 2, marginTop: 8, color: '#1877F2' }]} source={require('./images/line.png')}></Image>
                <View style={styles.flatlist}>
                
                        <FlatList
                            data={data}
                            renderItem={({ item }) => <ItemListNew dulieu={item} navigation ={navigation} isUpdate={false}/>}
                            keyExtractor={item => item._id}
                            showsVerticalScrollIndicator={false}
                        />
                 

                </View>
            </View>
            
               )
             } 

        </View>
    )
}

export default ListNew

const styles = StyleSheet.create({
    container: {
        justifyContent:'center',
        alignItems: 'center',
        flex: 1,
        marginStart: 24,
        marginEnd: 24,
        flexDirection: 'column',
        marginTop:30
    },
    viewtitle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
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
        marginTop: -8,
        marginStart: 8,
        marginEnd: 8
    },
   search:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 45,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#4E4B66',
    marginTop: 35
   }
})
const datane = [
    {
        "_id": "1",
        "title": "Trường công lập đầu tiên dạy và thi chương trình dự bị đại học Mỹ",
        "content": "Phổ thông Năng khiếu là trường công lập đầu tiên ở Việt Nam dạy và thi 6 môn của chương trình Advanced Placement (AP), thường gọi là chương trình dự bị đại học Mỹ.",
        "image": "https://i1-vnexpress.vnecdn.net/2023/02/02/328463889-891024988600042-6177-9136-2603-1675295134.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=BCVEDMn0Smx1XLiCRi0rrA",
        "createdAt": "2023-01-12T06:26:17.539Z",
        "createdBy": {
            "_id": "63ac39aeedf7c80016c57a67",
            "name": "",
            "avatar": ""
        }
    },
    {
        "_id": "2",
        "title": "Lịch thi đánh giá năng lực, tư duy năm 2023",
        "content": "Các kỳ thi đánh giá năng lực, tư duy diễn ra từ tháng 3 đến 7, thí sinh có thể tham dự nhiều đợt và đăng ký từ đầu tháng 2.",
        "image": "https://i1-vnexpress.vnecdn.net/2023/01/31/117f5804708184dfdd90-162556098-1999-1999-1675148782.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=Ie6cEqbs1YL8PDAG85QrsA",
        "createdAt": "2023-01-12T06:26:17.539Z",
        "createdBy": {
            "_id": "63ac39aeedf7c80016c57a67",
            "name": "",
            "avatar": ""
        }
    },
    {
        "_id": "3",
        "title": "Đối phó với bài tập Tết",
        "content": "Ngày nghỉ Tết cuối cùng, hàng chục trang bài tập Toán, Tiếng Việt và Tiếng Anh của Anh Thư được giải quyết, nhưng do mẹ và dì làm giúp.",
        "image": "https://i1-vnexpress.vnecdn.net/2023/01/30/4313-1662984910-1675082690-4516-1675083076.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=BnjiAv8Bq8iaZcGQ2jJC3Q",
        "createdAt": "2023-01-12T06:26:17.539Z",
        "createdBy": {
            "_id": "63ac39aeedf7c80016c57a67",
            "name": "",
            "avatar": ""
        }
    },
    {
        "_id": "4",
        "title": "Đường trở thành giáo viên ở Mỹ của một phụ nữ Việt",
        "content": "Chị Đinh Thu Hồng phải theo học chương trình đào tạo giáo viên và hoàn thành nhiều thủ tục để được cấp phép hành nghề dạy học ở Mỹ.",
        "image": "https://i1-vnexpress.vnecdn.net/2023/01/31/giao-vien3-7193-1674696213-167-6044-9285-1675150549.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=GJm7EfgbBZ4Pvlut0Bl1rw",
        "createdAt": "2023-01-12T06:26:17.539Z",
        "createdBy": {
            "_id": "63ac39aeedf7c80016c57a67",
            "name": "",
            "avatar": ""
        }
    },
    {
        "_id": "5",
        "title": "Cô giáo đèo hai con giữa mưa rét, vượt 100 km đến trường",
        "content": "Cô Nguyễn Thị Hà gây xúc động khi đèo hai con, vượt 100 km trong mưa lạnh để trở lại điểm trường ở xã Trà Dơn, huyện Nam Trà My, sau Tết.",
        "image": "https://i1-vnexpress.vnecdn.net/2023/01/31/untitled-1675115482-6811-1675116325.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=sDv36arZmV-B6KEYjStHbA",
        "createdAt": "2023-01-12T06:26:17.539Z",
        "createdBy": {
            "_id": "63ac39aeedf7c80016c57a67",
            "name": "",
            "avatar": ""
        }
    },
    {
        "_id": "6",
        "title": "Nam sinh trả lại hơn 40 triệu đồng nhặt được",
        "content": "Lê Hải Thăng, 17 tuổi, được tuyên dương vì nộp lại túi nylon đựng hơn 40 triệu đồng nhặt được hôm 29 Tết.",
        "image": "https://i1-vnexpress.vnecdn.net/2023/01/30/tuyenduongnamsinh-1675076463-2581-1675077291.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=vlqGCurXgocetWe4SYl13g",
        "createdAt": "2023-01-12T06:26:17.539Z",
        "createdBy": {
            "_id": "63ac39aeedf7c80016c57a67",
            "name": "",
            "avatar": ""
        }
    },
    {
        "_id": "7",
        "title": "Cho con đi ngắm trăng, sao từ bé",
        "content": "Từ khi 4 tuổi, con trai chị Hồng Anh đã được đưa đi ngắm nhật thực, mưa sao băng và tham gia câu lạc bộ thiên văn trẻ em.",
        "image": "https://i1-vnexpress.vnecdn.net/2023/01/30/danny-kim-png-1929-1673698701-1199-6656-1675037287.png?w=300&h=180&q=100&dpr=1&fit=crop&s=uYWNW2YjIsttuhLT4s8fqQ",
        "createdAt": "2023-01-12T06:26:17.539Z",
        "createdBy": {
            "_id": "63ac39aeedf7c80016c57a67",
            "name": "",
            "avatar": ""
        }
    }
]


