import React ,{useState,useEffect} from 'react'
import {View,FlatList,Text,StyleSheet,ActivityIndicator,List} from 'react-native'
import {widthPercentageToDP as w, heightPercentageToDP as h} from 'react-native-responsive-screen'
import Image from 'react-native-image-progress'
import Progress from 'react-native-progress/Bar'

export default class ImageScroll extends React.Component{
	constructor(props){
		super()
		this.state={
			initialGet:false,
			page:1,
			limit:12,
			data:[]
		}
		this.fetchData=this.fetchData.bind(this)
		this.cacheImage=this.cacheImage.bind(this)
	}
	componentDidMount(){
		this.fetchData()
	}
	fetchData(){
		fetch("https://picsum.photos/v2/list?page=+"+this.state.page+"&limit="+this.state.limit)
		.then((res)=>{
		 	return res.text()
		})
		.then((res)=>{
			//console.log('Initiall response',res)
			this.setState({
				data:[...this.state.data,...JSON.parse(res)],
				initialGet:true
			})
			//console.log('new data',this.state.data)
		})
	}
	showImages=({item,index}) =>(
	index%2==0 ? 
	<View style={styles.showImage}>
		<View style={styles.imageContainer}>
			<Image source={{uri: item.download_url}} indicator={Progress} indicatorProps={{width:90,color:"#0c5945"}} style={styles.image} />
			<Text style={styles.author}>Auth: {item.author}</Text>
		</View>
		<View style={styles.imageContainerSecond}>
			<Image source={{uri: this.state.data[index+1].download_url}} indicator={Progress} indicatorProps={{width:90,color:"#0c5945"}} style={styles.image} />
			<Text style={styles.author}>Auth: {this.state.data[index+1].author}</Text>
		</View>
	</View>
	:
	<View></View>
	)
	listFooter=()=>(
		<View style={{paddingBottom:130}}>
			<ActivityIndicator size="large" color="#0c5945"/>
		</View>
	)
	cacheImage(){
		
	}
	reachedEnd({ distanceFromEnd }){
		console.log('inside function end')
		let limit=this.state.limit+12
		let page=this.state.page
		if(limit>100)
		{
			limit=12
			page++
		}
		this.setState({
			limit:limit,
			page:page
		})
		this.fetchData()
	}
	render(){
	if(!this.state.initialGet)
		return (
				<View style={styles.container}>
					<ActivityIndicator size="large" color="#0c5945" style={styles.indicator}/>
				</View>
			)
	else
		return(
			<View style={styles.container}>
				<FlatList
		        data={this.state.data}
		        renderItem={this.showImages}
		        extraData={true}
		        initialNumToRender={6}
		      	keyExtractor={item=>item.id+Math.random()}
		      	ListFooterComponent={this.listFooter}
		      	onEndReachedThreshold={0.5}
		      	onEndReached={this.reachedEnd.bind(this)}
		      	/>
			</View>
		)}
}

const styles=StyleSheet.create({
	container:{
		backgroundColor:'white',
		color:'black',
		fontFamily:'Raleway',
		borderTopRightRadius:40,
		borderTopLeftRadius:40,
		height:h("100%"),
		paddingTop:h("4%")
	},
	indicator:{
		justifyContent:'center'
	},
	image:{
		borderRadius:10,
		width: w('40%'), 
		height: w('40%')
	},
	imageContainer:{
		marginRight:w('6%'),
		width:w('40%')
	},
	imageContainerSecond:{
		width:w('40%')
	},
	showImage:{
		flex:2,
		flexDirection:'row',
		paddingLeft:w('6%')
	},
	author:{
		fontFamily:'Raleway',
		fontSize:10,
		paddingTop:5,
		textAlign:'center',
		paddingBottom:h('3%')
	}
})