import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput} from 'react-native'

export default class HomeScreen extends React.Component{
constructor(){
    super();
    this.state={
        word:'',
        definition:'',
        lexicalCategory:'',
        
    }
}
getWord=(word)=>{
var searchKeyword=word.toLowerCase()
var url = 'https://rupinwhitehatjr.github.io/dictionary/%22+searchKeyword+%22.json'+searchKeyword+'.json'
return fetch(url)
.then((data)=>{
    if(data.status===200)
    {
        return data.json()
    }
    else
    {
        return null
    }
})
.then ((response)=>{

    var responseObject = response
    if(responseObject)
    {
        var wordData=responseObject.definitions[0]
        var definition=wordData.description
        var lethicalCategory=wordData.wordtype 
        this.setState({
            'word': this.state.text,
            'definition': definition,
            'lexicalCategory': lexicalCategory
        })
    }
    else
    {
        this.setState({
            'word': this.state.text,
            'definition': 'Not Found',
        })
    }
})

    }

    render() {
        <View style={styles.detailsContainer}>
            <Text style={styles.dentailsTitle}>
                Word:{''}
            </Text>
            <Text style={{fontSize:18}}>
                {this.state.word}
            </Text>
        </View>
        

        return (
            <View>
                
            <TextInput
            style={styles.inputBox}
            onChangeText={text =>{
                this.setState({
                    text:text,
                    isSearchPressed: false,
                    word: "Loading....",
                    lexicalCategory: '',
                    examples: [],
                    defination: '' 
                });
            }}
            value = {this.state.text}
            />

            <TouchableOpacity
            style= {styles.searchButton}
            onPress = {() => {
                this.setState({ isSearchPressed:true});
                this.getWord(this.state.text)
            }}
            />

            </View>

        )
    }
}
const styles = StyleSheet.create({
    container: {
    flex:1,
},
inputBoxContainer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center'
},
inputBox: {
    width: '80%',
    alignSelf: 'center',
    height: 40,
}
})
