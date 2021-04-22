import React, { Component } from "react";

import {Text, View, StyleSheet, Image, TouchableOpacity, Modal, TextInput, Alert} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/Feather';
import api from '../services/api';
import Postagem from '../pages/homeCateg';
import AsyncStorage from '@react-native-community/async-storage';
import {Picker} from '@react-native-community/picker';
import Post_postagem from './post_postagem';

const styles = StyleSheet.create({
  foto_post:{
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:50,
    height:50,
    backgroundColor:'#fff',
    borderRadius:50,
    marginTop: 13,
    marginLeft: 10,

  },
  post:{
    position: 'absolute',
    width: 414,
    height: 75,
    left: 0,
    marginTop: 10,

    backgroundColor: '#ffffff',
    elevation:1,
  },
  ask:{
    borderWidth:1,
    borderColor:'#F5F5F5',
    alignItems:'center',
    justifyContent:'center',
    width:280,
    height:40,
    backgroundColor:'#F5F5F5',
    borderRadius:50,
    marginTop: -45,
    marginLeft: 70,
  },
  duvida:{
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    left: -45,
    fontSize: 17,
    color: '#7A7A7A'
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 100,
    top: 20
  },
  text_titulo: {
    position: 'absolute',
    width: 200,
    height: 49,
    left: 12,
    top: 20,

    fontFamily: 'Roboto',
    fontSize: 24,

    letterSpacing: -0.333333,

    color: '#09576E',
    
  },
  text_desc: {
    position: 'absolute',
    width: 300,
    height: 49,
    left: 12,
    top: 130,

    fontFamily: 'Roboto',
    fontSize: 24,

    letterSpacing: -0.333333,

    color: '#09576E',
    
  },
  loginButton: {
    backgroundColor: '#31788A',
    borderRadius: 5,
    width: 335,
    marginTop: 30,
    marginLeft:15,
    padding: 10,
    left: -10
  },
  icon: {
    marginLeft: 330,
    top: 10
  }
});

export default class Home extends Component {
    static navigationOptions = {
        title: 'Início',
    }
    constructor(props){
      super(props);
      this.state = {isVisible: false};
    }
    
    render() {
      return (
        <View>
          <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.isVisible}
          onRequestClose={() => {
            this.setState({ isVisible: false });
          }}
        >
          <TouchableOpacity onPress={() => {this.setState({ isVisible: false });}}>
            <Icon name="x" size={25} color="#31788A" style={styles.icon} light />
          </TouchableOpacity>
          <Post_postagem />
        </Modal>
            <View style={styles.post}>
              <View
                style={styles.foto_post}>
              </View>
              <TouchableOpacity style={styles.ask} onPress={() => {
                this.setState({ isVisible: true });
              }}>
                <View>
                  <Text style={styles.duvida}>Qual é a sua dúvida?</Text>
                </View>
              </TouchableOpacity>
            </View>    
            <Postagem />
        </View> 
      );
    }
  }
  