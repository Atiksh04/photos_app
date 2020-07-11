import React from 'react'
import {Text,StyleSheet,View,Image} from 'react-native'
import {widthPercentageToDP as w, heightPercentageToDP as h} from 'react-native-responsive-screen'
import ImageScroll from './imageScroll'

export default function home(){
	return(
		<View>
			<Text style={styles.home}>Image Gallery</Text>
			<ImageScroll/>
		</View>
		)
}

const styles=StyleSheet.create({
	home:{
		color:'white',
		fontSize:30,
		marginTop:h('5%'),
		textAlign:'left',
		marginLeft:w('5%'),
		fontFamily:'Raleway',
		marginBottom:h('4%')
	}
})