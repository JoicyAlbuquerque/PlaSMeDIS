import React, { Component } from "react";

import {Text, View, StatusBar, StyleSheet, Alert, KeyboardAvoidingView,SafeAreaView, ScrollView} from 'react-native';
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import {Picker} from '@react-native-community/picker';

const styles = StyleSheet.create({
    Container:{
        flex: 1,
    },
    titulo:{
        position: 'absolute',
        left: 20,
        top: 15,

        fontFamily: 'Roboto',
        fontSize: 23,
        lineHeight: 25,
        textAlign: 'center',
        letterSpacing: -0.333333,
        color: '#31788A'
    },
    NameInput:{
        borderColor: '#0A566D'
    },
    Form:{
      flex: 1,
      marginBottom: 5,
      marginTop: 60,
      marginLeft: 10,
      marginRight: 15
  },
    CadButton: {
        backgroundColor: '#31788A',
        borderRadius: 5,
        width: 320,
        padding: 10,
      },
      containerButton: {
        bottom: 20,
        marginLeft:10,
        marginTop: 35
      },
    sexo:{
      marginLeft:10,
      fontSize: 18,
    },
    label:{
      color:'#333333',
      fontFamily: 'Roboto',
      fontSize: 17,
      fontWeight: 'normal'
    },
  input:{
    fontSize: 16
  }
    
});

export default class ConfigAdmin extends Component {
    static navigationOptions = {
        title: 'Configurações do Administrador',
    }
    state = { bairro: '', message: '', categoria:''};

    handleBairroChange = (bairro) => {
      this.setState({ bairro });
    };

    handleCategoriaChange = (categoria) => {
      this.setState({ categoria });
    };

    handleCadastrarPress = async () => {
      const id = await AsyncStorage.getItem('id');
      if(this.state.bairro.length === 0)
      {
        Alert.alert('Atenção','Preencha todos os campos')
      }
      else 
      {
        try {
          await api.post('bairros', {
            nome: this.state.bairro
          }).then(res=>{
            this.setState({message: res.data.message});
          });
          Alert.alert('Sucesso!', this.state.message);
          this.setState({bairro: '',  categoria: '', message: ''})
        } catch (_err) {
          Alert.alert('Atenção', this.state.message);
        }
      }
    };
  
    render() {
      return (
         <SafeAreaView style={styles.Container}> 
          <ScrollView>
            <Text style={styles.titulo}>Configurações do Administrador</Text>
            <View style={styles.Form}>
                    <Input 
                      label="Novo Bairro"
                      labelStyle={styles.label}
                      inputStyle={styles.input}
                      placeholder="Nome do Bairro" 
                      placeholderColor="#c4c3cb" 
                      style={styles.NameInput}
                      value={this.state.bairro}
                      onChangeText={this.handleBairroChange}
                      autoCapitalize="none"
                      returnKeyType={"send"}
                      onSubmitEditing={this.handleCadastrarPress} 
                    />
                    <Button
                      buttonStyle={styles.CadButton}
                      containerStyle={styles.containerButton}
                      onPress={this.handleCadastrarPress}
                      title="Enviar"
                    />
          </View>
          </ScrollView>
        </SafeAreaView> 
      );
    }
  }
  