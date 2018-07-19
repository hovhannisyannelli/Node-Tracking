import React, { Component } from "react";
import { View, Text, TextInput, Button } from "react-native";
 import { List, ListItem, Input, Fab, Container, Header, Content, ActionSheet } from "native-base";
import Swipeout from "react-native-swipeout";
import { connect } from "react-redux";
import {
  createList,
  deleteList,
  editTitle
} from "./actions/actionsList";
import {Icon} from 'native-base';
import { initialize } from "./actions/actionsInitialize";

const mapStateToProps = ({ lists }) => ({ lists });

const mapDispatchToProps = {
    createList,
    deleteList,
    editTitle,
    initialize
};


class MenuScreen extends Component {
  state = {
    editableId: null,
    value: "",
    newRow: false,
    clicked: null
  };


componentWillMount() {
    this.props.initialize();
  }

updateValue = value => {
    this.setState({ value });
  };
addRow = () => {
    this.setState({ newRow: true });
  };

setNewRow = () => {
    this.props.createList({ title: this.state.value });
    this.setState({ newRow: false, value: "" });
  };

cancelRow = () => {
    this.setState({ newRow: false, value: ""  });
  }
openList = list => {
    this.props.navigation.navigate("ListScreen", {
      id: list.id,
      title: list.title
    });
  };
deleteList = id => {
    this.props.deleteList({ id });
  };
editList = list => {
   
    this.setState({ editableId: list.id, value: list.title });
  };
submitEditing = () => {
    this.props.editTitle({
      newone: this.state.value,
      id: this.state.editableId
    });
    this.setState({ editableId: null, value: "" });
  };
openAdding = () => {
    this.props.navigation.navigate('AddNewListScreen')
  }
renderLists = () =>
    this.props.lists.map(list => {
      const buttons = [
        {
          text: "Delete",
          type: "delete",
         
          onPress: () => this.deleteList(list.id)
        },
        {
          text: "Edit",
          onPress: () => this.editList(list)
        }
      ];
      return (
        <View key={list.id} style={{ flexDirection: 'row'}}>

          {list.icon !== null && <Icon style={{marginTop: 10}} name={list.icon} size={20} />}
      
         {/* <Icon name="ios-add-circle-outline" color="white" style={{marginTop: 10}} /> */}
          {this.state.editableId === list.id ? (
            <TextInput
              style={{ width: "100%", height: 50, backgroundColor: "gray" }}
              value={this.state.value}
              onChangeText={this.updateValue}
              onSubmitEditing={this.submitEditing}
            />
          ) : (
            <Swipeout autoClose right={buttons}>
              <ListItem
                style={{ height: 50, width: 360}}
                onPress={() => this.openList(list)}
              >
                <Text>Created: {list.date} </Text> 
                <Text>Title: {list.title} </Text>   
              </ListItem>
            </Swipeout>
          )}
        </View>
      );
    });
  render() {
    return (
      <View style={{ flex: 1 }}>
        <List>{this.renderLists()}</List>
        {this.state.newRow ? (
          <View> 
          <TextInput
            value={this.state.value}
            style={{  height: 50, backgroundColor: "yellow" }}
            onChangeText={this.updateValue}
            onSubmitEditing={this.setNewRow}
          />
          <Button title= 'Cancel' onPress={this.cancelRow}> </Button> 
         
          </View>
        ) : null}
        <Fab
          position="bottomLeft"
          style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: '#34A34F' }}
          onPress={this.openAdding}
        >
      
           
          <Icon name="md-add" color="white" />
        </Fab>
      </View>
    );
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(MenuScreen);





