import {StyleSheet,View, Text, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'

const Xoso = () => {
  const [yourNumber, setYournumber] = useState(2);
  const [result, setResult] = useState('Bạn đoán sai òi. Là số 3 nha!');
  const random = () =>{
    let randomNumber =  Math.floor(Math.random() * 100) + 1;
    if (yourNumber == randomNumber){
      setResult('Bạn đoán đúng òi! ')
    }else{
      setResult('Bạn đoán sai òi. Là số '+ randomNumber + ' nha!')
    }
   
  }
  return (
    <View>
       <Text style={styles.title}>XỔ SỐ ĐI!!! </Text>
      <Text style={styles.text}>Nhập từ 1 đến 100 </Text>
      <TextInput style={styles.textInput} placeholder='Nhập vào số bạn muốn nè' onChangeText={newText => setYournumber(newText)}></TextInput>
      <Pressable style={styles.pressable}
      onPress={random}>
        <Text style={styles.textpr}>Dự đoán</Text>
      </Pressable>
      <Text style={[styles.textpr,{color:'red'}]}>{result}</Text>
    </View>
  )
}

export default Xoso
const styles = StyleSheet.create({
  title: {
    fontSize: 40, color: 'blue', textAlign: 'center', margin: 10,
  },
  text: {
    fontSize: 20, color: 'green', textAlign: 'center',
  },
  textInput:{
    borderWidth: 2, textAlign: 'center', padding: 7, margin: 20, height: 50,
  },
  pressable: {
    borderWidth: 2, backgroundColor: 'blue', textAlign: 'center', padding: 7, margin: 20, height: 50
  },
  textpr: {
    fontSize: 20, textAlign: 'center', color: 'white',
  }
})