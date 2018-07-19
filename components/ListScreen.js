import React, { Component } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
 import { List, ListItem, Input, Fab, Container, Header, Content, ActionSheet, Icon } from "native-base";
import Swipeout from "react-native-swipeout";
import { connect } from "react-redux";
import {
  createDetail,
  deleteDetail,
  toggleDetail
} from "./actions/actionsDetail";
import Autocomplete from "react-native-autocomplete-input";


const mapStateToProps = ({ lists }) => ({ lists });


const mapDispatchToProps = {
  createDetail,
  deleteDetail,
  toggleDetail
};

const Words = [
  "the","of","and","a","to","cheese","bread","you","that","it","he","was","for","on","are","as","with","his","they","I","at","be","this","have","from","or","one","had","by","word","but","not","what","all","were","we","when","your","can","said","there","use","an","each","which","she","do","how","their","if","will","up","other","about","out","many","then","them","these","so","some","her","would","make","like","him","into","time","has","look","two","more","write","go","see","number","no","way","could","people","my","than","first","water","been","call","who","oil","its","now","find","long","down","day","did","get","come","made","may","part"
];



class ListScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
      title: navigation.state.params.title
    });
    state = {
      value: "",
      newRow: false,
      editableId: null,
    };  

updateValue = value => {
      this.setState({ value });
    };
 addRow = () => {
 
  this.setState({ newRow: true });
};
cancelRow = () => {
  this.setState({ newRow: false, value: ""  });
}
setNewRow = () => {
 
  this.props.createDetail({ todo: this.state.value, parentId: this.props.navigation.state.params.id, done: false });
  this.setState({ newRow: false, value: "" });

};

deleteDetail = id => {
  this.props.deleteDetail({
    parentId: this.props.navigation.state.params.id,
    id
  });
};

toggleDone = id => {
  this.props.toggleDetail({
    parentId: this.props.navigation.state.params.id,
    id
  });
};
renderDetails = (list) =>{
  if (!list){
    return null;
  };
  aa= list.map(detail => {
        const buttons = [
          {
            text: "Delete",
            type: "delete",
            onPress: () => this.deleteDetail(detail.id)
          },
        ]; 
      return (
      
        <View key = {detail.id } style={{ flexDirection: 'row'}}>  
        {detail.done ? 
       <Icon name="checkmark" color="white" style={{marginTop: 10}} />  :   <Icon name="square" color="white" style={{marginTop: 10}} />} 
          <Swipeout autoClose right={buttons}>
            <ListItem  onPress = {()=>this.toggleDone(detail.id)} 
                style={{ height: 50, width: 360}}> 
                <Text>Title: {detail.todo} </Text>   
              </ListItem>
            </Swipeout>
        
        </View>
           );}
    );
    return aa;
  }
    render() {
      const detail = this.props.lists.find( i => i.id === this.props.navigation.state.params.id
      );
      return (
        <View style={{ flex: 1 }} >
           <List>{this.renderDetails(detail.items)}</List>
           {this.state.newRow ? (
          
          <View style= {{flex: 1}}>  
             
          <Autocomplete
           autoFocus
           data={Words.filter(el =>
            el.toLowerCase().includes(this.state.value.toLowerCase())
          )}
            value={this.state.value}
            style={{width: 350,height: 50, backgroundColor: "yellow" }}
            renderItem={item => (
              <TouchableOpacity
                onPress={() => this.setState({ value: item })}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
            onChangeText={this.updateValue}
            onSubmitEditing={this.setNewRow}
          /> 
          <Button  title= 'Cancel' onPress={this.cancelRow}> </Button> 
         
          </View>
        ) : null}
          <Fab
          position="bottomLeft"
          style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: '#34A34F' }}
          onPress={this.addRow}
        >
          <Icon name="md-add" color="white" />
        </Fab>
        </View>
      );
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(ListScreen);