import React, { useState, useEffect, useRef } from 'react';

import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import { Camera } from 'expo-camera';



export default function App() {

  const [hasPermission, setHasPermission] = useState(null);

  const [type, setType] = useState(Camera.Constants.Type.back);

  const [picture,setPicture] = useState('');

  const ref = useRef(null)

  useEffect(() => {

    (async () => {

      const { status } = await Camera.requestPermissionsAsync();

      setHasPermission(status === 'granted');

    })();

  }, []);



  async function takePicture(){

     let photo =  await ref.current.takePictureAsync();

     console.log(photo.uri);

     setPicture(photo.uri);

  }



  if (hasPermission === null) {

    return <View />;

  }

  if (hasPermission === false) {

    return <Text>No access to camera</Text>;

  }

  return (

    <View style={styles.container}>

      {

      (picture == '')?

      <Camera style={styles.camera} type={type} ref={ref}>

        <View style={styles.buttonContainer}>

          {

            /*

          <TouchableOpacity

            style={styles.button}

            onPress={() => {

              setType(

                type === Camera.Constants.Type.back

                  ? Camera.Constants.Type.front

                  : Camera.Constants.Type.back

              );

            }}>

            <Text style={styles.text}> Flip </Text>



          </TouchableOpacity>

          */

        }

          <TouchableOpacity style={styles.button} onPress={()=>takePicture()}  >

            <Text style={styles.text}>Take Pic</Text>

          </TouchableOpacity>

        </View>

      </Camera>

      :

      <View style={{width:'100%', height:'100%'}}>

        <Image style={{width:'100%',height:'90%'}} source={{uri:picture}}/>
        
        <View style={{width:'100%', height:'10%', flexDirection:'row'}}>
        <TouchableOpacity style={styles.buttonDelete} onPress={()=>setPicture('')}><Text style={styles.textDelete}>DELETE</Text></TouchableOpacity>
        <TouchableOpacity style={styles.buttonShare} onPress={()=>setPicture('')}><Text style={styles.textDelete}>SHARE</Text></TouchableOpacity>
        </View>  


        </View>

      }

      

    </View>

  );

}



const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  camera: {
    flex: 1,
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 20,
  },

  button: {
    flex: 0.3,
    height: 35,
    borderRadius:40,
    borderColor:'white',
    borderWidth:2,
    alignSelf: 'flex-end',
    textAlign:'center',
    alignItems: 'center',
    justifyContent:'center'
  },

  text: {
    fontSize: 18,
    textAlign: 'center',
    alignItems:'center',
    color: 'white',
  },

  buttonDelete: {
    height: '100%',
    width: '50%',
    alignSelf: 'center',
    textAlign:'center',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor:'red'
  },

  buttonShare: {
    height: '100%',
    width: '50%',
    alignSelf: 'center',
    textAlign:'center',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor:'green'
  },

  textDelete: {
    fontSize: 18,
    textAlign: 'center',
    alignItems:'flex-end',
    color: 'white',
  },

});