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
        fontSize: 24,
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

export default class Update extends Component {
    static navigationOptions = {
        title: 'Complemento de Dados',
    }
    state = { nascimento: '', telefone: '', rua: '', numero_casa: '',  message: '', sexo: 'F', cor: 'Outros'};

    handleNascChange = (nascimento) => {
      this.setState({ nascimento });
    };

    handleTelefoneChange = (telefone) => {
    this.setState({ telefone });
    };

    handleRuaChange = (rua) => {
      this.setState({ rua });
    };

    handleNumeroChange = (numero_casa) => {
      this.setState({ numero_casa });
    };

    handleCadastrarPress = async () => {
      const id = await AsyncStorage.getItem('id');
      if (this.state.nascimento.length == 0 ||  this.state.telefone.length == 0 || this.state.rua.length == 0 || this.state.numero_casa.length == 0) {
        this.setState({ error: Alert.alert('Atenção','Preencha todos os campos para continuar.') }, () => false);
      }
       else {
        try {
          const response = await api.put('users/'+id, {
            nascimento : this.state.nascimento,
            telefone: this.state.telefone,
            rua: this.state.rua,
            numero_casa : this.state.numero_casa,
            sexo : this.state.sexo ,
            cor: this.state.cor
        }).then(res=>{
            this.setState({message: res.data.message});
          });
          this.setState({nascimento: '', sexo: '', telefone: '', rua: '', numero_casa: '',  message: ''})
          Alert.alert('Sucesso!', this.state.message);

        } catch (_err) {
          Alert.alert('Atenção', this.state.message);
        }
      }
    };
  
    render() {
      return (
         <SafeAreaView style={styles.Container}> 
          <ScrollView>
            <Text style={styles.titulo}>Complemento de Dados</Text>
            <View style={styles.Form}>
                    <Input 
                      label="Data de Nascimento (Apenas números)"
                      labelStyle={styles.label}
                      inputStyle={styles.input}
                      placeholder="DDMMAAAA" 
                      placeholderColor="#c4c3cb" 
                      style={styles.NameInput}
                      value={this.state.nascimento}
                      onChangeText={this.handleNascChange}
                      autoCapitalize="none"
                      keyboardType= "number-pad"
                      returnKeyType={"next"}
                      onSubmitEditing={() => this.input_3.focus()}
                      ref={(input) => { this.input_2 = input; }}
                      blurOnSubmit={false} 
                    />
                    <Text style={styles.sexo}>Sexo</Text>
                    <Picker
                      selectedValue={this.state.sexo}
                      style={{height: 50, width: 325, marginLeft:3, marginBottom:10}}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({sexo: itemValue})
                      }>
                      <Picker.Item label="Feminino" value="F" />
                      <Picker.Item label="Masculino" value="M" />
                      <Picker.Item label="Outros" value="O" />
                    </Picker>
                    <Input 
                      label="Telefone (de preferência WhatsApp)"
                      labelStyle={styles.label}
                      inputStyle={styles.input}
                      placeholder="(xx)xxxxx-xxxx"
                      placeholderColor="#c4c3cb"
                      keyboardType= "phone-pad" 
                      style={styles.NameInput}
                      value={this.state.telefone}
                      onChangeText={this.handleTelefoneChange}
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={true}
                      returnKeyType={"next"} 
                      onSubmitEditing={() => this.input_4.focus()}
                      ref={(input) => { this.input_3 = input; }}
                      blurOnSubmit={false} 
                    />
                    <Text style={styles.sexo}>Cor</Text>
                    <Picker
                      selectedValue={this.state.cor}
                      style={{height: 50, width: 325, marginLeft:3, marginBottom:10}}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({cor: itemValue})
                      }>
                      <Picker.Item label="Branco(a)" value="Branco" />
                      <Picker.Item label="Negro(a)" value="Negro" />
                      <Picker.Item label="Pardo(a)" value="Pardo" />
                      <Picker.Item label="Outros" value="Outros" />
                    </Picker>
                    <Input 
                      label="Endereço da família (Informar apenas o nome da rua)"
                      labelStyle={styles.label}
                      inputStyle={styles.input}
                      placeholder="Nome da Rua" 
                      placeholderColor="#c4c3cb" 
                      style={styles.NameInput}
                      value={this.state.rua}
                      onChangeText={this.handleRuaChange}
                      returnKeyType={"next"}
                      onSubmitEditing={() => this.input_5.focus()}
                      ref={(input) => { this.input_4 = input; }}
                      blurOnSubmit={false} 
                    />
                    <Input 
                      label="Número"
                      labelStyle={styles.label}
                      inputStyle={styles.input}
                      placeholder="Número da Casa" 
                      placeholderColor="#c4c3cb" 
                      style={styles.NameInput}
                      value={this.state.numero_casa}
                      onChangeText={this.handleNumeroChange}
                      returnKeyType={"next"}
                      ref={(input) => { this.input_5 = input; }}
                      blurOnSubmit={false} 
                    />
                    <Button
                      buttonStyle={styles.CadButton}
                      containerStyle={styles.containerButton}
                      onPress={this.handleCadastrarPress}
                      title="Atualizar"
                    />
          </View>
          </ScrollView>
        </SafeAreaView> 
      );
    }
  }
  