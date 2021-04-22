import React, { Component } from "react";

import {Text, View, StyleSheet, Alert,SafeAreaView, ScrollView} from 'react-native';
import { Button, Input, CheckBox } from 'react-native-elements';
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

export default class Forms extends Component {
    static navigationOptions = {
        title: 'Formulário Socioeconomico',
    }
    state = { nome_rep_familia: '', qtd_pessoas_familia: '', qtd_criancas: '', gestante: false, checkedNao: false,
              qtd_amamentando: '', amamentando: false, naoAmamentando: false, qtd_criancas_deficiencia: '', qtd_gestantes: ''};

    handleNomeChange = (nome_rep_familia) => {
      this.setState({ nome_rep_familia });
    };

    handlePessoasChange = (qtd_pessoas_familia) => {
    this.setState({ qtd_pessoas_familia });
    };

    handleCriancasChange = (qtd_criancas) => {
      this.setState({ qtd_criancas });
    };

    handleAmamentandoChange = (qtd_amamentando) => {
      this.setState({ qtd_amamentando });
    };

    handleDeficienciaChange = (qtd_criancas_deficiencia) => {
      this.setState({ qtd_criancas_deficiencia });
    };

    handleqtdGestanteChange = (qtd_gestantes) => {
      this.setState({ qtd_gestantes });
    };

    handleCadastrarPress = async () => {
      const id = await AsyncStorage.getItem('id');
      if (this.state.nome_rep_familia.length == 0 ||  this.state.qtd_pessoas_familia.length == 0 || this.state.qtd_criancas.length == 0 || this.state.qtd_amamentando.length == 0 || this.state.qtd_criancas_deficiencia.length == 0 || this.state.nome_rep_familia.length == 0 || this.state.qtd_gestantes.length == 0) {
        this.setState({ error: Alert.alert('Atenção','Preencha todos os campos para continuar.') }, () => false);
      }
      if((this.state.gestante == true && this.state.checkedNao == true) || (this.state.amamentando == true && this.state.naoAmamentando == true) ){
        this.setState({ error: Alert.alert('Atenção','Assinale apenas uma opção!') }, () => false);
      }
       else {
        try {
          const response = await api.post('form_socio/'+id, {
            nome_rep_familia : this.state.nome_rep_familia,
            pessoa: id,
            qtd_pessoas_familia: this.state.qtd_pessoas_familia, 
            qtd_criancas : this.state.qtd_criancas,
            gestante : this.state.gestante,
            qtd_amamentando : this.state.qtd_amamentando,
            qtd_criancas_deficiencia : this.state.qtd_criancas_deficiencia,
            qtd_gestantes : this.state.qtd_gestantes,
            pessoa_amamenta: this.state.amamentando
        }).then(res=>{
            this.setState({message: res.data.message});
          });
          this.setState({nome_rep_familia: '', qtd_pessoas_familia: '', qtd_criancas: '', gestante: false, checkedNao: false,
          qtd_amamentando: '', amamentando: false, naoAmamentando: false, qtd_criancas_deficiencia: '', qtd_gestantes: ''})
          Alert.alert('Sucesso!', this.state.message);

        } catch (_err) {
          Alert.alert('Atenção', this.state.message);
          console.log(this.state.amamentando,this.state.nome_rep_familia,this.state.gestante,this.state.qtd_amamentando,this.state.qtd_criancas,this.state.qtd_criancas_deficiencia,this.state.qtd_pessoas_familia,this.state.qtd_gestantes, id)
        }
      }
    };
  
    render() {
      return (
         <SafeAreaView style={styles.Container}> 
          <ScrollView>
            <Text style={styles.titulo}>Formulário Socioeconômico</Text>
            <View style={styles.Form}>
                    <Input 
                      label="Nome completo da representante da família (sem abreviações)"
                      labelStyle={styles.label}
                      inputStyle={styles.input}
                      placeholder="Nome Completo" 
                      placeholderColor="#c4c3cb" 
                      style={styles.NameInput}
                      value={this.state.nome_rep_familia}
                      onChangeText={this.handleNomeChange}
                      autoCapitalize="none"
                      returnKeyType={"next"}
                      onSubmitEditing={() => this.input_3.focus()}
                      ref={(input) => { this.input_2 = input; }}
                      blurOnSubmit={false} 
                    />
                    <Input 
                      label="Quantas pessoas têm na família?"
                      labelStyle={styles.label}
                      inputStyle={styles.input}
                      placeholder="Ex: 3"
                      placeholderColor="#c4c3cb"
                      keyboardType= "number-pad" 
                      style={styles.NameInput}
                      value={this.state.qtd_pessoas_familia}
                      onChangeText={this.handlePessoasChange}
                      autoCapitalize="none"
                      autoCorrect={false}
                      returnKeyType={"next"} 
                      onSubmitEditing={() => this.input_4.focus()}
                      ref={(input) => { this.input_3 = input; }}
                      blurOnSubmit={false} 
                    />
                    <Input 
                      label="Quantas crianças pequenas (0 a 6 anos) têm na família? (colocar 0 se não tiver)"
                      labelStyle={styles.label}
                      inputStyle={styles.input}
                      placeholder="Ex: 2" 
                      placeholderColor="#c4c3cb" 
                      style={styles.NameInput}
                      value={this.state.qtd_criancas}
                      onChangeText={this.handleCriancasChange}
                      autoCapitalize="none"
                      autoCorrect={false} 
                      keyboardType= "number-pad"
                      ref={(input) => { this.input_4 = input; }}
                      blurOnSubmit={false} 
                    />
                    <Text style={styles.sexo}>Gestante?</Text>
                    <View style={{marginBottom:15}}>
                      <CheckBox
                      center
                      containerStyle={{width:160}}
                      title='Sim'
                      checkedIcon='dot-circle-o'
                      uncheckedIcon='circle-o'
                      checked={this.state.gestante}
                      onPress={() => this.setState({gestante: !this.state.gestante})}
                      />
                      <CheckBox
                        center
                        containerStyle={{width:160, marginLeft:170, marginTop:-51}}
                        title='Não'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.checkedNao}
                        onPress={() => this.setState({checkedNao: !this.state.checkedNao})}
                      />
                    </View>
                    <Input 
                      label="Quantas mulheres estão gestantes na família (colocar 0 se não tiver)?"
                      labelStyle={styles.label}
                      inputStyle={styles.input}
                      placeholder="Ex: 2" 
                      placeholderColor="#c4c3cb" 
                      style={styles.NameInput}
                      value={this.state.qtd_gestantes}
                      onChangeText={this.handleqtdGestanteChange}
                      autoCapitalize="none"
                      autoCorrect={false} 
                      keyboardType= "number-pad"
                      returnKeyType={"next"}
                      onSubmitEditing={() => this.input_5.focus()}
                      ref={(input) => { this.input_4 = input; }}
                      blurOnSubmit={false} 
                    />
                    <Text style={styles.sexo}>Amamentando?</Text>
                    <View style={{marginBottom:15}}>
                      <CheckBox
                      center
                      containerStyle={{width:160}}
                      title='Sim'
                      checkedIcon='dot-circle-o'
                      uncheckedIcon='circle-o'
                      checked={this.state.amamentando}
                      onPress={() => this.setState({amamentando: !this.state.amamentando})}
                      />
                      <CheckBox
                        center
                        containerStyle={{width:160, marginLeft:170, marginTop:-51}}
                        title='Não'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.naoAmamentando}
                        onPress={() => this.setState({naoAmamentando: !this.state.naoAmamentando})}
                      />
                    </View>
                    <Input 
                      label="Quantas mulheres da família estão amamentando? (colocar 0 se não tiver)"
                      labelStyle={styles.label}
                      inputStyle={styles.input}
                      placeholder="Ex: 2" 
                      placeholderColor="#c4c3cb" 
                      style={styles.NameInput}
                      value={this.state.qtd_amamentando}
                      onChangeText={this.handleAmamentandoChange}
                      autoCapitalize="none"
                      autoCorrect={false} 
                      keyboardType= "number-pad"
                      returnKeyType={"next"}
                      onSubmitEditing={() => this.input_6.focus()}
                      ref={(input) => { this.input_5 = input; }}
                      blurOnSubmit={false} 
                    />
                    <Input 
                      label="Quantas crianças com deficiência têm na família? (colocar 0 se não tiver)"
                      labelStyle={styles.label}
                      inputStyle={styles.input}
                      placeholder="Ex: 2" 
                      placeholderColor="#c4c3cb" 
                      style={styles.NameInput}
                      value={this.state.qtd_criancas_deficiencia}
                      onChangeText={this.handleDeficienciaChange}
                      autoCapitalize="none"
                      autoCorrect={false} 
                      keyboardType= "number-pad"
                      returnKeyType={"send"}
                      onSubmitEditing={() => this.handleCadastrarPress}
                      ref={(input) => { this.input_6 = input; }}
                      blurOnSubmit={false} 
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
  