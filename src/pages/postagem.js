import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  StackActions,
  NavigationActions,
  withNavigation,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/Feather';
import api from '../services/api';
import PostFull from './postFull';
import {Dimensions} from 'react-native';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
  content: {
    marginTop: 85,
    //marginBottom: 10
  },
  box: {
    width: width,
    height: 180,
    left: 0,
    marginTop: 10,
    flex: 1,
    backgroundColor: '#FFFFFF',
    elevation: 1,
  },
  iconComment: {
    top: 40,
    left: 300,
  },
  titulo: {
    //width: 300,
    //height: 29,
    left: 12,
    marginRight: 10,
    top: 20,

    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 24,
    //lineHeight: 28,
    /* identical to box height */
    letterSpacing: -0.333333,

    color: '#09576E',
  },
  tempo: {
    position: 'absolute',
    width: 67,
    height: 13,
    left: 58,
    top: 30,

    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: -0.333333,

    color: '#179AAB',
  },
  foto: {
    elevation: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 50,
    marginTop: 10,
    marginLeft: 10,
  },
  identificador: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
  },
  message: {
    left: 30,
    bottom: 25,
    fontSize: 18,
    color: '#31788A',
  },
  texto: {
    position: 'absolute',
    width: 80,
    height: 90,
    left: 57,
    //top: 10,
    top: 20,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: -0.333333,

    color: '#179AAB',
  },
});

class Postagem extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.page = 1;
    this.state = {
      isVisible: false,
      refreshing: false, // user list loading
      isRefreshing: false, //for pull to refresh
      posts: [], //user list
      error: '',
      count: '',
      id: '',
    };
  }

  componentDidMount = () => {
    this.getPostagem();
  };

  getColor = () => {
    return `rgba(${Math.floor(Math.random() * 255)},${Math.floor(
      Math.random() * 255,
    )},${Math.floor(Math.random() * 255)},0.5)`;
  };

  getPostagem = async () => {
    await api.get('postagens').then((res) => {
      res.data.post.forEach((info, index) => {
        const nome = info.criador.split(' ');
        res.data.post[index].criador =
          `${nome[0]} ` + `${nome[1] ? nome[1].charAt(0) : ''}`;
      });

      const posts = res.data.post.reverse();
      this.setState({posts: posts, cont: res.data.count, id: res.data.id});
    });

  };
  onRefresh = async () => {
    this.setState({
      isRefreshing: true,
      refreshing: true,
    });
    await api.get('postagens').then((res) => {
      res.data.post.forEach((info, index) => {
        const nome = info.criador.split(' ');
        res.data.post[index].criador =
          `${nome[0]} ` + `${nome[1] ? nome[1].charAt(0) : ''}`;
      });
      
      const posts = res.data.post.reverse();
      this.setState({posts: posts, cont: res.data.count, id: res.data.id});
    });
    
    this.setState({
      isRefreshing: false,
      refreshing: false,
    });
  };
  render() {
    return (
      <View style={styles.content}>
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
              size={45}
              color="#31788A"
              style={styles.icon}
              light
            />
          </TouchableOpacity>
          <PostFull />
        </Modal>
        <FlatList
          onRefresh={this.onRefresh}
          refreshing={this.state.refreshing}
          extraData={this.extraData}
          data={this.state.posts}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('PostFull', {
                  titulo: item.titulo,
                  texto: item.texto,
                  selo: item.selo,
                  idPostagem: item.id,
                })
              }>
              <View style={styles.box}>
                <View
                  style={{
                    ...styles.foto,
                    ...{backgroundColor: this.getColor()},
                  }}>
                  <Text style={styles.identificador}>
                    {item.criador[0].toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.texto}>{item.criador}</Text>
                {/*<Text  style={styles.tempo}>30 min.</Text>*/}
                <View>
                  <Text style={styles.titulo}>{item.titulo}</Text>
                </View>
                {/*<TouchableOpacity style={styles.iconComment}>
                  <Icon name="message-circle" size={25} color="#31788A" />
                  <Text style={styles.message}>0</Text>
                </TouchableOpacity>*/}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

export default withNavigation(Postagem);
