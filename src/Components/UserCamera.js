import React from 'react'
import { Camera,CameraType } from 'expo-camera';
import { useState,useEffect,useRef } from 'react'
import { Button,Text,TouchableOpacity,StyleSheet,View,Image } from 'react-native'
// import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';


export default function UserCamera() {

    const cameraRef = useRef()

const [hasCameraPersmission, setHasCameraPermission] = useState()
const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState()
const [photo, setPhoto] = useState()
const [userAlbum, setuserAlbum] = useState([])
const [galleryStatus, setgalleryStatus] = useState(false)

const [type, setType] = useState(CameraType.back)


useEffect(() => {
    userPermissions()
 }, []);

 
 const userPermissions = async () => {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    const mediaLibararyPermission = await MediaLibrary.requestPermissionsAsync();
    setHasCameraPermission(cameraPermission.status === "granted");
    setHasMediaLibraryPermission(mediaLibararyPermission.status === "granted");

} 

if (hasCameraPersmission === undefined){
    return <Text> Requesting permission...</Text>
}
else if(!hasCameraPersmission) {
    return <Text>Permission for cmera not granted</Text>

}

function toggleCameraFacing(){
    setType(current=>(current===CameraType.back ? CameraType.front : CameraType.back ))
}

const takePicture = async () =>{
    const options = {
        qualtiy :1,
        base64:true,
        exif :false
    }
    const newPhoto = await cameraRef.current.takePictureAsync(options)
    setPhoto(newPhoto)
    }


    
if(photo){


    const sharePic=()=>{
    shareAsync(photo.uri).then(()=>{
        setPhoto(undefined)
    })
    }
    
    
    const savePhoto = ()=>{
        MediaLibrary.saveToLibraryAsync(photo.uri).then(()=>{

            setuserAlbum(prevAlbum=>[...prevAlbum,photo.uri])
            setPhoto(undefined)
        })
    }
    
    
    return (
    
        <View style={style.container} >
    
            <Image style={style.preview} source={{uri : 'data:image/jpg;base64,'+ photo.base64}} />
            <Button title='share' onPress={sharePic}></Button>
    
            {hasMediaLibraryPermission ? <Button title='saveToGallerey' onPress={savePhoto}></Button> :
            undefined}
            <Button title='Discard' onPress={()=>setPhoto(undefined)}></Button>
    
        </View>
    )
    
    
    
    }

    const showGallery = ()=>{
        setgalleryStatus(true)
    }

    const backTocamera=()=>{
        setgalleryStatus(false)
    }
    

  return (
    <>

    {galleryStatus === false ?
    
    <Camera style={style.container} type={type} ref={cameraRef}>

    <View style={style.icons}>

     {/* gallery btn */}
     <TouchableOpacity onPress={showGallery}>
     <Entypo name="images" size={50} color="black" />
       </TouchableOpacity>




        {/* Takepicture btn */}
        <TouchableOpacity onPress={takePicture}>

 <MaterialIcons name="camera" size={40} color="black" />
        </TouchableOpacity>

        {/* Toggle Camera btn */}

        <TouchableOpacity style={style.Button} onPress={toggleCameraFacing}>
        <MaterialCommunityIcons name="camera-flip" size={24} color="black" />
        </TouchableOpacity>


    </View>

</Camera>
: 

<View>

<View style={style.imageContainer}>
    {Array.isArray(userAlbum) && userAlbum.length > 0 ? (
        userAlbum.map((item,index)=>{
            return(
                <View key={index} style={style.imageWrapper}>
<Image source={{uri : item}} style={style.imageThumbnail}></Image>
                </View>

            );
        }) 
    ) : <Text>Gallery is empty</Text>

}

</View>

<Text onPress={backTocamera}>Back to Camera</Text>
</View>


}
   
</>
  )




}

const style = StyleSheet.create({
    container :{
        flex :1
    },
icons : {
    position : 'absolute',
    bottom : 5,
    flex : 1 ,
    flexDirection : 'row',
    justifyContent : 'Space-around',
    alignItems : 'center',
    width: '100%',

},

icon :{},
preview :{
    alignSelf : 'stretch',
    flex : 1
},
imageContainer:{
    flexDirection: 'row',
    flexWrap : 'wrap',
    justifyContent : 'space-between',
    padding : 5 ,
},
imageWrapper : {
    width : '48%' ,
    marginVertical : 5 
},
imageThumbnail :{
    width : '100%',
    aspectRatio : 1
},
backBtn : {
    width : '50%',
    backgroundColor: 'black',
    color : '#fff',
    textAlign : 'center',
    marginRight: 'auto',
    marginLeft : 'auto',
    padding : 10 ,
    verticalAlign : 'middle',
    lineHeight: 30
}



})

