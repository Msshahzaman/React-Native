import React from 'react'
import { View,Text, TouchableOpacity,StyleSheet } from 'react-native'
import { ImageBackground } from 'react-native';

export default function Home({navigation}) {


const goTocam = ()=>{
    navigation.navigate('usercam')
}





  return (
    <ImageBackground source={{uri: 'https://i.pinimg.com/236x/b9/b1/9f/b9b19f9540c8e142c137a4315b3d466b.jpg'}} style={styles.container}>

    <View style={styles.container}>
        <Text>Welcome to React Native camera app</Text>

        <TouchableOpacity style={styles.button} onPress={goTocam}>
<Text style={styles.text}>Open Camera</Text>
        </TouchableOpacity>



    </View>
    </ImageBackground>

  )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    }
})