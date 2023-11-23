import { View, Text,Button } from 'react-native'
import React,{useState} from 'react'

const Welcom = (props) => {
  const {name,old,address} = props
  const [hoten, setHoten] = useState('Huynh Linh')
  const clickNe = () => {
    if(hoten != 'Chi Pu'){
    setHoten('ChiPu'); }
  }
  // if(hoten != 'Huynh Thi My Linh'){
  //   setHoten('Huynh My Linh');
  // }
 
  return (
    <View>
      <Text>Welcome Fpt {name}</Text>
      <Text>Old: {old}</Text>
      <Text>Address: {address}</Text>
      <Text>Welcome Fpt {hoten}</Text>
      <Button title="Bấm em đi"
       onPress={ clickNe } />
    </View>
  )
}

export default Welcom