import React from 'react'
import { View,StyleSheet,Image,ActivityIndicator} from 'react-native'
import {widthPercentageToDP as w, heightPercentageToDP as h} from 'react-native-responsive-screen'
import * as FileSystem from 'expo-file-system'
import * as Crypto from 'expo-crypto'

export  class ImageComponent extends React.Component{
constructor(props){
  super(props)
  this.state={
    img:'null',
    loading:true
  }
}

componentDidMount(){
  this.checkCache()
}

checkCache=async ()=>{
  const fileKey=await this.getImageFileSystemKey(this.props.uri) 
  this.getImage(fileKey,this.props.uri)
}

getImageFileSystemKey=async (url)=>{
  // get the file key which is generated using the crypto library
  const hashed = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    url
  )
  return `${FileSystem.cacheDirectory}${hashed}`
}

getImage=async (fileKey,url)=>{
  try {
    // checking if the filekey exists
      const metadata = await FileSystem.getInfoAsync(fileKey)
      if (metadata.exists) {
        this.setState({
          img:fileKey
        })
      }
      // if file not found then downloading it  
      const imageObject = await FileSystem.downloadAsync(url,fileKey)
      this.setState({
        img:imageObject.uri
      })
    }
    catch (err) {
      this.setState({
        img:url
      })
    }
  }
  imageLoaded=()=>{
    this.setState({
      loading:false
    })
  }
  imageLoadingStarted=()=>{
    this.setState({
      loading:true
    })
  }
render(){
  return(
      <View>
        <Image source={{uri:this.state.img}} onLoadStart={this.imageLoadingStarted}  onLoad={this.imageLoaded} style={this.props.style}/>
        <ActivityIndicator animating={this.state.loading} size="small"/>
      </View>
    )
  }
}
