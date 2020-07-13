import React ,{useState,useEffect} from 'react'
import {View,FlatList,Text,StyleSheet,ActivityIndicator,SectionList,TouchableHighlight,TouchableOpacity} from 'react-native'
import {widthPercentageToDP as w, heightPercentageToDP as h} from 'react-native-responsive-screen'
import {ImageComponent} from './cachingComponent'
import Modal from './displayPage'

export default class ImageScroll extends React.Component{
	constructor(props){
		super()
		this.state={
			initialGet:false,
			page:1,
			limit:12,
			data:[],
			selectedId:0,
			index:-1,
			showModal:false,
			selectedItem:[]
		}
		this.fetchData=this.fetchData.bind(this)
		this.showImages=this.showImages.bind(this)
	}
	componentDidMount(){
		this.fetchData()
	}
	fetchData(){
		//Function to call api and store the response in state
		fetch("https://picsum.photos/v2/list?page=+"+this.state.page+"&limit="+this.state.limit)
		.then((res)=>{
		 	return res.text()
		})
		.then((res)=>{
			let ob={
				title:Math.random,
				data:JSON.parse(res)
			}
			this.setState({
				data:[...this.state.data,ob],
				initialGet:true,
				index:this.state.index+1
			})
		})
	}
	showModal(item){
		this.setState({
			selectedItem:item,
			showModal:true
		})
		// Setting state to display modal
	}
	showImages({item,index}){
		// To render each item 
		return(
		index%2==0 ?
		<View style={styles.showImage}>
			<TouchableOpacity onPress = {()=>this.showModal(item)}>
				<View style={styles.imageContainer}>
					<ImageComponent  uri={item.download_url} style={styles.image}/>
					<Text style={styles.author}>Auth: {item.author}</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress = {()=>this.showModal(this.state.data[this.state.index].data[index+1])}>
			<View style={styles.imageContainer}>
				<ImageComponent  uri={this.state.data[this.state.index].data[index+1].download_url} style={styles.image}/>
				<Text style={styles.author}>Auth: {this.state.data[this.state.index].data[index+1].author}</Text>
			</View>
			</TouchableOpacity>
		</View>
		:
		<View></View>
		)
	}

	listFooter=()=>{
		//footer component
		return(
		<View style={{paddingBottom:130}}>
			<ActivityIndicator size="large" color="#0c5945"/>
		</View>)
	}
	
	closeModal(value){
		//function to close modal displayed 
		this.setState({
			showModal:!this.state.showModal
		})
	}

	reachedEnd({ distanceFromEnd }){
		//function called when reached end of section list. 
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
		//Before api call setting the new limit and page number for api query
		this.fetchData()
	}
	render(){
	if(!this.state.initialGet)
		return (//return if the first api is not yet called 
				<View style={styles.container}>
					<ActivityIndicator size="large" color="#0c5945" style={styles.indicator}/>
				</View>
			)
	else
		return(//Show the api response in a list
			<View style={styles.container}>
				<SectionList //using sectionlist to show data
			      sections={this.state.data}
			      keyExtractor={(item, index) => item + index}
			      renderItem={this.showImages}//function to renderitems
			      onEndReachedThreshold={0.5}
			      onEndReached={this.reachedEnd.bind(this)}
			      ListFooterComponent={this.listFooter}//rendering footer component
			    />
			    {this.state.showModal ? 
			    	<Modal item={this.state.selectedItem} closeModal={this.closeModal.bind(this)} visible={true}/>//showing modal if an item is selected and passing item object to Modal Component
			    	: 
			    	<View></View>
			    }
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
	imageContainer:{
		width:w('38%')
	},
	image:{
		width:w('38%'),
		height:w('38%'),
		borderRadius:10
	},
	showImage:{
		flex:2,
		flexDirection:'row',
		justifyContent:'space-around'
	},
	author:{
		fontFamily:'Raleway',
		fontSize:10,
		paddingTop:h('1%'),
		textAlign:'center',
		paddingBottom:h('3%')
	}
})