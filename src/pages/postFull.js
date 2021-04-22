import React, {PureComponent} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
  Keyboard,
} from 'react-native';
import * as ART from '@react-native-community/art';
import * as Progress from 'react-native-progress';
import PropTypes from 'prop-types';
import {withNavigation} from 'react-navigation';
import api from '../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
  },
  content1: {
    marginTop: 5,
    //marginLeft: 5,
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 27,
    color: '#09576E',
  },
  content: {
    marginLeft: 15,
    marginTop: 14,
    marginRight: 15,

    fontFamily: 'Roboto',
    fontStyle: 'normal',
    textAlign: 'left',
    fontWeight: 'normal',
    fontSize: 20,
    letterSpacing: -0.333333,

    color: '#0A0A0A',
  },
  loadingContainer: {
    height: windowHeight * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentsContainer: {
    height: windowHeight,
  },
  comment: {
    backgroundColor: 'white',
    elevation: 5,
    minHeight: 40,
    maxHeight: windowHeight,
    maxWidth: windowWidth * 0.6,
    minWidth: 80,
    borderRadius: 15,
    margin: 15,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  inputContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 15,
    flexDirection: 'row',
    width: windowWidth,
    zIndex: 10,
  },
  input: {
    fontFamily: 'Roboto',
    elevation: 1,
    backgroundColor: 'white',
    height: 50,
    maxHeight: 50,
    borderRadius: 25,
    width: '80%',
    paddingLeft: 15,
  },
  iconContainer: {
    height: 50,
    width: 50,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#31788A',
  },
  verificado: {
    //marginTop: 20,
  },
});

class PostFull extends PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('titulo'),
    };
  };

  state = {
    idUsuario: 0,
    nomeUsuario: '',
    privilegio: '',
    users: [],
    selo: '',
    idPostagem: 0,
    textoDigitado: '',
    comentarios: [],
    loading: true,
  };

  handlePostComment = async () => {
    if (this.state.textoDigitado !== '') {
      const comentario = {
        texto: this.state.textoDigitado, //string
        criador: this.state.idUsuario, //int
        resposta: null, //int
        postagem: this.state.idPostagem,
      };
      console.log(comentario);
      try {
        await api.post('comentarios', comentario);
        comentario.nome = this.state.users.nome;
        this.setState({
          comentarios: [...this.state.comentarios, comentario],
        });
      } catch (e) {
        console.log('erro :', e);
      }

      this.setState({textoDigitado: ''});
      Keyboard.dismiss();
    }
  };

  componentDidMount = () => {
    this.getPrev();
    this.getComments();
  };

  parseComments = async () => {
    const parsedComments = this.state.comentarios.filter((coment) => {
      return coment.postagem == this.state.idPostagem;
    });
    for (let i = 0; i < parsedComments.length; i++) {
      const {data} = await api.get('users/' + parsedComments[i].criador);
      parsedComments[i].nome = data.user.nome;
    }

    this.setState({comentarios: parsedComments});
    this.setState({loading: false});
  };

  getComments = async () => {
    const {data} = await api.get('comentarios');
    this.setState({comentarios: data.comments});
    this.parseComments();
  };

  getPrev = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      this.setState({idUsuario: parseInt(id)});
      this.setState({idPostagem: this.props.navigation.getParam('idPostagem')});

      await api.get('users/' + id).then((res) => {
        this.setState({users: res.data.user});
      });

      this.setState({privilegio: this.state.users.privilegio});
      console.log(this.state.privilegio);

      this.setState({selo: this.props.navigation.getParam('selo')});

      console.log(this.state.selo);
    } catch (error) {
      console.log('error');
    }
  };

  alerta = async () => {
    Alert.alert(
      'Atenção',
      'Tornar a pergunta verificada?',
      [
        {text: 'Não', onPress: () => this.verificando()},
        {text: 'Sim', onPress: () => this.verificandoSim()},
      ],
      {cancelable: true},
    );
  };
  verificandoSim = async () => {
    this.setState({idPostagem: this.props.navigation.getParam('idPostagem')});

    await api.put('selo/' + this.state.idPostagem, {
      selo: true,
    });
  };
  verificando = async () => {
    this.setState({idPostagem: this.props.navigation.getParam('idPostagem')});
    await api.put('selo/' + this.state.idPostagem, {
      selo: false,
    });
  };
  render() {
    var titulo;
    if (this.state.privilegio == 3) {
      titulo = (
        <Text style={styles.content1}>
          {' '}
          {this.props.navigation.getParam('titulo')}{' '}
          {this.state.selo ? (
            <Icon
              style={styles.verificado}
              name="verified"
              size={25}
              color="#31788A"
            />
          ) : (
            <Icon
              style={styles.verificado}
              name="verified"
              size={25}
              color="rgba(52, 52, 52, 0)"
            />
          )}
        </Text>
      );
    } else {
        if(this.state.selo == false){
          titulo = (
            <TouchableOpacity onPress={() => this.alerta()}>
              <Text style={styles.content1}>
                {' '}
                {this.props.navigation.getParam('titulo')}{' '}
                {this.state.selo ? (
                  <Icon
                    style={styles.verificado}
                    name="verified"
                    size={25}
                    color="#31788A"
                  />
                ) : (
                  <Icon
                    style={styles.verificado}
                    name="verified"
                    size={25}
                    color="#31788A30"
                  />
                )}
              </Text>
            </TouchableOpacity>
          );
        } else {
          titulo = (
            <Text style={styles.content1}>
              {' '}
              {this.props.navigation.getParam('titulo')}{' '}
              {this.state.selo ? (
                <Icon
                  style={styles.verificado}
                  name="verified"
                  size={25}
                  color="#31788A"
                />
              ) : (
                <Icon
                  style={styles.verificado}
                  name="verified"
                  size={25}
                  color="#31788A30"
                />
              )}
            </Text>
          );
        }
    }
    return (
      <View style={styles.container}>
        <View style={styles.content1}>{titulo}</View>
        <Text style={styles.content}>
          {this.props.navigation.getParam('texto')}
        </Text>

        {this.state.loading ? (
          <View style={styles.loadingContainer}>
            <Progress.CircleSnail
              style={styles.progressCircle}
              color={['#31788A']}
              size={50}
              indeterminate={true}
            />
          </View>
        ) : (
          <ScrollView style={styles.commentsContainer}>
            {this.state.comentarios.map((e, index) => {
              return (
                <View style={styles.comment} key={index}>
                  <Text style={{fontWeight: 'bold', fontFamily: 'Roboto'}}>
                    {e.nome}
                  </Text>
                  <Text style={{fontFamily: 'Roboto'}}>{e.texto}</Text>
                </View>
              );
            })}
            <View style={{height: 100}} />
          </ScrollView>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={this.state.textoDigitado}
            onChangeText={(text) => this.setState({textoDigitado: text})}
            placeholder="Envie um comentário"
            placeholderTextColor="#999"></TextInput>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => this.handlePostComment()}>
            <Icon style={styles.icon} name="send" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default withNavigation(PostFull);
