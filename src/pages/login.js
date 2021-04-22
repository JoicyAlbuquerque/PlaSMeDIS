import React, {Component} from 'react';

import {Keyboard, Text, View, TextInput, StyleSheet, Alert} from 'react-native';
import * as ART from '@react-native-community/art';
import {Button} from 'react-native-elements';
import * as Progress from 'react-native-progress';
import PropTypes from 'prop-types';
import {StackActions, NavigationActions} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: '#fafafa',
    marginTop: -30,
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontFamily: 'Roboto',
    fontWeight: '800',
    marginTop: 150,
    marginBottom: 30,
    textAlign: 'center',
    color: '#31788A',
  },
  loginFormView: {
    flex: 1,
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  progressCircle: {
    alignSelf: 'center',
  },
  loginButton: {
    backgroundColor: '#31788A',
    borderRadius: 5,
    width: 330,
    marginTop: 10,
    marginLeft: 15,
    padding: 10,
  },
  loginforget: {
    marginLeft: 190,
    marginTop: 10,
    width: 170,
    backgroundColor: 'transparent',
  },
  titleLoginForget: {
    color: '#31788A',
  },
});

export default class Login extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }).isRequired,
  };

  state = {
    email: '',
    password: '',
    error: '',
    user_type: '',
    id: '',
    verificado: '',
    status: '',
    error: '',
    loading: true,
  };

  componentDidMount = () => {
    const mountLogin = async () => {
      const id = await AsyncStorage.getItem('id');
      const user_type = await AsyncStorage.getItem('user_type');

      if (id) {
        if (user_type == '3') {
          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Usuario'})],
          });
          this.props.navigation.dispatch(resetAction);
        } else {
          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Adm'})],
          });
          this.props.navigation.dispatch(resetAction);
        }
      } else {
        this.setState({loading: false})
      }
    };

    mountLogin();
  };
  handleemailChange = (email) => {
    this.setState({email});
  };

  handlePasswordChange = (password) => {
    this.setState({password});
  };

  handleSignInPress = async () => {
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState(
        {
          error: Alert.alert(
            'Atenção',
            'Preencha usuário e senha para continuar.',
          ),
        },
        () => false,
      );
    } else {
      this.setState({loading: true});
      try {
        const response = await api
          .post('login', {
            email: this.state.email,
            password: this.state.password,
          })
          .then((res) => {
            this.setState({user_type: res.data.type});
            this.setState({verificado: res.data.verificado});
            this.setState({id: res.data.id});
            this.setState({status: res.data.status});
            this.setState({error: res.data.error});
          });

        await AsyncStorage.setItem('id', this.state.id);
        await AsyncStorage.setItem('user_type', this.state.user_type);
        console.log(this.state.id);
        if (this.state.status == 1010) {
          this.setState({loading: false});
          this.setState({
            error: Alert.alert('Atenção', 'Email ou Senha incorretos!'),
          });
        } else {
          if (this.state.user_type == '3') {
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({routeName: 'Usuario'})],
            });
            this.props.navigation.dispatch(resetAction);
          } else {
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({routeName: 'Adm'})],
            });
            this.props.navigation.dispatch(resetAction);
          }
        }
      } catch (_err) {
        this.setState({loading: false});
        Alert.alert('Atenção', 'Usuário ou senha incorretos!');
      }
    }
  };
  render() {
    return (
      <View style={styles.containerView}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>IBEApp</Text>
            {this.state.loading ? (
              <Progress.CircleSnail
                style={styles.progressCircle}
                color={['#31788A']}
                size={50}
                indeterminate={true}
              />
            ) : (
              <>
                <TextInput
                  placeholder="Email"
                  placeholderColor="#c4c3cb"
                  style={styles.loginFormTextInput}
                  value={this.state.email}
                  onChangeText={this.handleemailChange}
                  autoCapitalize="none"
                  returnKeyType={'next'}
                  onSubmitEditing={() => this.input_1.focus()}
                  blurOnSubmit={false}
                />
                <TextInput
                  placeholder="Senha"
                  placeholderColor="#c4c3cb"
                  style={styles.loginFormTextInput}
                  value={this.state.password}
                  onChangeText={this.handlePasswordChange}
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry
                  returnKeyType={'send'}
                  ref={(input) => {
                    this.input_1 = input;
                  }}
                  onSubmitEditing={() => this.handleSignInPress()}
                />
                <Button
                  buttonStyle={styles.loginButton}
                  onPress={this.handleSignInPress}
                  title="Entrar"
                />
                <Button
                  buttonStyle={styles.loginforget}
                  type="clear"
                  title="Esqueceu a Senha?"
                  titleStyle={styles.titleLoginForget}
                  size={5}
                />
              </>
            )}
          </View>
        </View>
      </View>
    );
  }
}
