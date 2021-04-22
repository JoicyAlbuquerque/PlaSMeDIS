import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
import Postagem from '../pages/postagem';
import PropTypes from 'prop-types';
import Post_postagem from './post_postagem';
import {Dimensions} from 'react-native';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
  foto_post: {
    borderWidth: 1,
    //borderColor:'rgba(0,0,0,0.2)',
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 50,
    marginTop: 13,
    marginLeft: 10,
  },
  post: {
    width: width,
    position: 'absolute',
    height: 75,
    left: 0,
    marginTop: 10,

    backgroundColor: '#ffffff',
    elevation: 1,
  },
  ask: {
    borderWidth: 1,
    borderColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    //width:280,
    width: 340,
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 50,
    marginTop: -45,
    marginLeft: 10,
    elevation: 1,
  },
  duvida: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    //left: -45,
    textAlign: 'center',
    fontSize: 17,
    color: '#7A7A7A',
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 100,
    top: 20,
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
    marginLeft: 15,
    padding: 10,
    left: -10,
  },
  icon: {
    marginLeft: 330,
    top: 10,
  },
});

export default class Home extends Component {
  static navigationOptions = {
    title: 'Início',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.state = {isVisible: false};
  }

  handler() {
    this.setState({isVisible: false});
  }

  render() {
    return (
      <View>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.isVisible}
          onRequestClose={() => {
            this.setState({isVisible: false});
          }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({isVisible: false});
            }}>
            <Icon
              name="x"
              size={25}
              color="#31788A"
              style={styles.icon}
              light
            />
          </TouchableOpacity>
          <Post_postagem handler={this.handler} />
        </Modal>
        <View style={styles.post}>
          <View style={styles.foto_post}></View>
          <TouchableOpacity
            style={styles.ask}
            onPress={() => {
              this.setState({isVisible: true});
            }}>
            <View>
              <Text style={styles.duvida}>No que você está pensando?</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Postagem />
      </View>
    );
  }
}
