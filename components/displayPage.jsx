import React from 'react'
import {Modal,StyleSheet,Text,TouchableOpacity,View,Share,ActivityIndicator} from "react-native"
import {widthPercentageToDP as w, heightPercentageToDP as h} from 'react-native-responsive-screen'
import {ImageComponent,getCacheFileKey} from './cachingComponent'
import * as FileSystem from 'expo-file-system'
import* as MediaLibrary from 'expo-media-library'
import * as permissions from 'expo-permissions'

export default class ModalComponent extends React.Component {
  constructor(props){
  	super(props)
  	this.state={
  		visible:this.props.visible,
  		loading:false
  	}
  }

  closeDialog=()=>{
  	// Function to pass props to parent component to close the modal
  	this.props.closeModal('true')
  	this.setState({visible:false})
  }

  download=async ()=>{
  	// Function invoked when download is clicked
  	this.setState({loading:true})
  	const mission = await permissions.askAsync(permissions.CAMERA_ROLL)
  	// Getting permissions from the user
		if (mission.status !== 'granted') {
		  	alert('We need Folder Permission to Save Image!!')
		  	this.setState({
		  		loading:false
		  	})
		}
		else{
			const uri = this.props.item.download_url
			let fileUri = FileSystem.documentDirectory +'image.jpg'
			// after getting permissions using File System to download the file 
		    FileSystem.downloadAsync(uri, fileUri)
		    .then(async (re)=>{
		    	const assetFile = await MediaLibrary.createAssetAsync(re.uri)
	    	    await MediaLibrary.createAlbumAsync("Image_Gallery", assetFile, false)
	    	    // moving the file from document directory to IMage_Gallery folder
	    	    this.setState({loading:false})
	  	        alert('Image has been Saved in Image_Gallery folder')
	   			
		    })
		}
}
  
  share=async ()=>{
  	// Function called when Share is clicked
  	try{
	  	const result = await Share.share({
	        message:
	          "Hey I found a great image. You can see it too at "+this.props.item.url + " ."
	    })
	    // using Share component from react native to share text using other social media apps.
  	}
  	catch(error){
  		alert('Error in Sharing',error)
  	}
  }

  render() {
    return (
      <View>
       <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.visible}
        onRequestClose={this.closeDialog}
        >
        <View style={styles.view}>
        	<View style={styles.modalView}>
        		<ImageComponent uri={this.props.item.download_url} style={styles.image}/>
        		<Text style={styles.author}>Author: {this.props.item.author}</Text>
        		
        		<View style={styles.viewRow}>
	        		<View style={styles.rView}>
	        		<TouchableOpacity onPress = {this.share}>
	        			<Text style={styles.btn}>Share</Text>
	        		</TouchableOpacity>
	        		</View>
	        		<View style={styles.rView}>
	        		<TouchableOpacity onPress = {this.download}>
	        			{this.state.loading ? <View style={styles.btn}><ActivityIndicator color="white" size="small"/></View>:
	        			<Text style={styles.btn}>Download</Text>
	        			}
	        		</TouchableOpacity>
	        		</View>
        		</View>
        		
        		<TouchableOpacity onPress = {this.closeDialog}>
        			<Text style={styles.close}>Close</Text>
        		</TouchableOpacity>
        	</View>	
        </View>
        </Modal>
        </View>
    )
  }
}




const styles = StyleSheet.create({
  view:{
  	flex: 1,
    justifyContent: "center",
    alignItems: "center",
   },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    width:w('92%'),
    height:h('75%'),
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius:5,
    elevation: 5,
    marginTop:h('10%')
  },
  image:{
  	width:w('92%'),
  	height:w('70%'),
  	borderTopLeftRadius:20,
  	borderTopRightRadius:20
  },
  viewRow:{
  	flex:2,
  	flexDirection:'row',
  	paddingTop:10,
  	justifyContent:'space-around'
  },
  author:{
  	fontFamily:'Raleway',
  	fontSize:22,
  	textAlign:'center',
  	padding:15
  },
  btn:{
  	fontFamily:'Raleway',
  	fontSize:18,
  	backgroundColor:"#0c5945",
  	padding:15,
  	borderRadius:10,
  	color:'white',
  	width:w('30%'),
  	textAlign:'center'
  },
  close:{
  	textAlign:'center',
  	fontSize:20,
  	fontFamily:'Raleway',
  	backgroundColor:'#0c5945',
  	bottom:0,
  	color:'white',
  	padding:12,
  	width:'auto',
  	borderBottomLeftRadius:10,
  	borderBottomRightRadius:10
  }
})