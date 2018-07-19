import React, { Component } from "react";
import { View, Text, TextInput, Keyboard } from "react-native";
 import { List, ListItem, Input, Fab,Button, Container, Header, Content, ActionSheet } from "native-base";
import Swipeout from "react-native-swipeout";
import { connect } from "react-redux";
import {
  createList,
  deleteList,
  editTitle
} from "./actions/actionsList";
import {Icon} from 'native-base';

const mapStateToProps = ({ lists }) => ({ lists });

const mapDispatchToProps = {
    createList,
    deleteList,
    editTitle
};

const iconNames = [
    "md-basketball",
    "md-battery-charging",
    "md-bicycle",
    "md-body",
    "md-bowtie",
    "md-chatbubbles",
    "md-cut",
    "md-flame",
    "md-flash"
  ];


class AddNewListScreen extends Component {

    
  state = {
    value: null,
    icon: null
  
  };

  backToList=() =>  {
    this.props.navigation.navigate('MenuScreen');
  }

  save = () =>  {
  }
  
  handleTextChange = (value) => {
      this.setState( {value})
  } 
  cancel = () => {
    this.backToList();
  }
  openList = () => {
      Keyboard.dismiss();
      if(this.state.value){
  const {id} =  this.props.createList({ title: this.state.value, icon: this.state.icon }).payload;
    title=this.state.value;
    this.props.navigation.navigate("ListScreen", {
      title: title,
      id: id,
  })
}

};

select = name => {
    this.setState({ icon: name });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TextInput
          style= {{borderColor: '#ffb6c1', 
          borderWidth: 3, 
          width: 400, 
          fontSize: 25, 
          fontFamily: 'italic', 
          color: '#40e0d0'}}
          placeholder={ 'Type a new task here' }
          onChangeText={ this.handleTextChange }
          onSubmitEditing={ this.save }
          value={ this.state.value || '' }
        />
        <Button style={{backgroundColor: 'white',
        borderRadius: 30,
        alignSelf: 'center',
        borderWidth: 3,
        borderColor: 'navy',
        margin: 10,
        padding: 10
       }}  onPress={this.openList} title={'done'} ><Text
       style={{
        fontSize: 30,
        width: 300,
        textAlign:'center',
        justifyContent: 'center',
        color: 'navy'
    }}> Done</Text></Button>
        <Button style={{backgroundColor: 'white',
        borderRadius: 30,
        alignSelf: 'center',
        borderWidth: 3,
        borderColor: 'red',
        margin: 10,
        padding: 10}}
        onPress={this.cancel} title = {'Cancel'}><Text style={{
            fontSize: 30,
            width: 300,
            textAlign:'center',
            justifyContent: 'center',
            color: 'red'
        }}> Cancel</Text></Button>

<View style={{ flexDirection: "row" }}>
          {iconNames.map(iconName => (
         <Icon
              key={iconName}
              style={
                this.state.icon === iconName
                  ? { color: "blue", margin: 10 }
                  : { margin: 10 }
              }
              name={iconName}
              size={32}
              onPress={() => this.select(iconName)}
            />
          ))}
        </View>

      </View>

     
    );
  }
}




export default connect(mapStateToProps,mapDispatchToProps)(AddNewListScreen);