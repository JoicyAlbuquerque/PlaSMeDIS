import React, { Component } from "react";

import {Text, View, StyleSheet, Image, TouchableOpacity, Modal, TextInput, Alert} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/Feather';
import api from '../services/api';
import Postagem from './postagem';
import AsyncStorage from '@react-native-community/async-storage';
import {Picker} from '@react-native-community/picker';

const styles = StyleSheet.create({
  
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
  text_categ:{
    width: 300,
    height: 49,
    marginLeft: -30,
    marginTop: 40,

    fontFamily: 'Roboto',
    fontSize: 24,

    letterSpacing: -0.333333,

    color: '#09576E',
  }
});

export default class Post_postagem extends Component {
  state = {titulo: '', content: '', email:'', message: '', error: '', categorias: [], categoria_valor: ''};

  componentDidMount =()=>{
    this.getCategoria();
};
  getCategoria = async()=>{
      await api.get("categorias").then( res => {
        console.log(res.data.Categorias);
        this.setState({  categorias: res.data.Categorias});
      });
      
      { this.state.categorias.map((item, key)=>(console.log(item.id)))}
  };

  handleTituloChange = (titulo) => {
    this.setState({ titulo });
  };
  
  handleContentChange = (content) => {
   this.setState({ content });
  };
  handleEnviarPress  = async () => {
    const id = await AsyncStorage.getItem('id');
    if (this.state.titulo.length === 0 || this.state.content.length === 0) {
       Alert.alert('Atenção','Preencha usuário e senha para continuar.');
    } else {
      try {

          //const response = await api.get('users/'+id);

          await api.post('postagens', {
            texto: this.state.content,
            criador: id,
            titulo: this.state.titulo,
            categoria: this.state.categoria_valor
          }).then(res=>{
            this.setState({ message: res.data.message});
            this.setState({ error: res.data.error});
          });

          Alert.alert('Sucesso!', this.state.message );
          this.setState({content: '', titulo: '', message: '', error: ''});
          this.props.handler()
                
      } catch (_err) {
        Alert.alert('Atenção!', this.state.error);
        console.log(this.state.categoria_valor);
      }
    }
  };
    render() {
      return (
        <View style={styles.modal}>
            <Text style={styles.text_titulo}>Título</Text>
            <TextInput
              onChangeText={this.handleTituloChange}
              value={this.state.titulo}
              style={{ height: 50, width:335, borderColor: 'gray', borderWidth: 1, borderRadius:5, top: -40, left: -3 }}
              editable
              maxLength={40}
            />
            <Text style={styles.text_desc}>Descrição</Text>
            <TextInput
              multiline
              numberOfLines={4}
              onChangeText={this.handleContentChange}
              value={this.state.content}
              style={{ height: 100, width:300, borderColor: 'gray', borderWidth: 1, borderRadius:5, left: -3,  width:335, top: 20 }}
            
            />
            <Text style={styles.text_categ}>Categoria</Text>
            <Picker
              selectedValue={this.state.categoria_valor}
              style={{height: 50, width: 325, marginLeft:-5, marginTop: -5}}
              onValueChange={(ItemValue, ItemIndex) =>
              this.setState({categoria_valor: ItemValue})
              }>
              { this.state.categorias.map((v, key)=>(
              <Picker.Item label={v.nome} value={v.id} key={key} />
              ))}
            </Picker>
            <Button
              buttonStyle={styles.loginButton}
              onPress={this.handleEnviarPress}
              title="Enviar"
            />
          </View>
      );
    }
  }
  