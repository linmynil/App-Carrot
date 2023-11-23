import { StyleSheet, View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'


const tinhtoan = () => {
    const [number1, setNumber1] = useState('1');
    const [number2, setNumber2] = useState('2');
    const [result, setResult] = useState('3');
    const random = (ischoose) => {
        let sum = number1 + number2
        if ((ischoose == true && sum == result) || (ischoose == false && result != sum)) {
            alert('Bạn đã chọn đúng')
        } else {
            alert('Bạn đã chọn sai')
        }
        setNumber1(Math.floor(Math.random() * 10))
        setNumber2(Math.floor(Math.random() * 10))
        setResult(Math.floor(Math.random() * 20))

    }

    return (
        <View>

            <Text style={styles.title}>BẠN CÓ GIỎI TOÁN ? </Text>
            <Text style={styles.text}>{number1} + {number2} </Text>
            <Text style={styles.text}> = </Text>
            <Text style={styles.text}> {result} </Text>

            <Pressable style={styles.pressable}
                onPress={() => random(true)}>
                <Text style={styles.textpr}>Đúng</Text>
            </Pressable>
            <Pressable style={[styles.pressable, { marginTop: 10 }, { backgroundColor: 'red' }]}
                onPress={() => random(false)}>
                <Text style={styles.textpr}>Sai</Text>
            </Pressable>
        </View>
    )
}

export default tinhtoan
const styles = StyleSheet.create({
    title: {
        fontSize: 30, color: 'red', textAlign: 'center', margin: 10
    },
    text: {
        fontSize: 50, color: 'blue', textAlign: 'center',
    },
    pressable: {
        borderWidth: 2, backgroundColor: 'green', textAlign: 'center', padding: 7, margin: 30, height: 50
    },
    textpr: {
        fontSize: 20, textAlign: 'center', color: 'white'
    }
})