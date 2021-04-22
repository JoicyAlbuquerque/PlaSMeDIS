import React, {Component} from "react";

import {Text, View, StyleSheet, Image, TouchableOpacity, Modal, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
import api from '../services/api';
import PropTypes from 'prop-types';
import Post_postagem from './post_postagem';
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
  content:{
    marginTop: 80,
    marginBottom: 70
    }, 
  box:{
    width: width,
    height: 150,
    left: 0,
    marginTop: 5,
    flex: 1,
    backgroundColor: '#FFFFFF',
    elevation: 1,
  },
  iconComment:{
    top:40,
    left:300
  },
  titulo:{
    //width: 300,
    //height: 29,
    left: 12,
    top: 10,

    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 24,
    //lineHeight: 28,
    /* identical to box height */
    letterSpacing: -0.333333,

    color: '#09576E',

  },
  tempo:{
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
  message:{
    left:30,
    bottom: 25,
    fontSize: 18,
    color: "#31788A",
  },
  texto:{
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
  foto_post:{
    borderWidth:1,
    //borderColor:'rgba(0,0,0,0.2)',
    borderColor:'#fff',
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
    marginTop: 39,

    backgroundColor: '#ffffff',
    elevation:1,
  },
  ask:{
    borderWidth:1,
    borderColor:'#F5F5F5',
    alignItems:'center',
    justifyContent:'center',
    //width:280,
    width: 340,
    height:40,
    backgroundColor:'#F5F5F5',
    borderRadius:50,
    marginTop: -45,
    marginLeft: 10,
    elevation:1
  },
  duvida:{
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    //left: -45,
    textAlign: 'center',
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
  },
  boxNomeCateg:{
    width: width,
    height:35,
    backgroundColor: '#fafafa',
    elevation: 1,
  },
  nomeCateg:{
    color: '#31788A',
    textAlign: 'center',
    fontSize: 18
  }
});

export default class Home extends Component {

    static propTypes = {
      navigation: PropTypes.shape({
        navigate: PropTypes.func,
        dispatch: PropTypes.func,
        getParam: PropTypes.func
      }).isRequired,
    };

    constructor(props){
      super(props);
      this.page = 1;
      this.state = {isVisible: false,
        refreshing: false, // user list loading
        isRefreshing: false, //for pull to refresh
        posts: [], //user list
        error: '',
        count:'',};
    }
    componentDidMount =()=>{
        this.getPostagem();
        console.log(this.props.navigation.getParam('idCateg'))
    };

    getColor = () => {
      return `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},0.5)`
    };

    getPostagem = async () => {
      await api.get("postagens/"+this.props.navigation.getParam('idCateg')).then((res) => {
        res.data.post.forEach((info, index) => {
          const nome = info.criador.split(' ');
          res.data.post[index].criador =
            `${nome[0]} ` + `${nome[1] ? nome[1].charAt(0) : ''}`;
        });
        const posts = res.data.post.reverse();
        this.setState({posts: posts, cont: res.data.count});
      });
    };    

    onRefresh = async () => {
        this.setState({
          isRefreshing: true,
          refreshing: true
        });
        await api.get("postagens/",this.props.navigation.getParam('idCateg')).then( res => {
            this.setState({  posts: res.data.post, cont: res.data.count});
            const posts = this.state.posts.reverse();
            this.setState({  posts: posts});
          });
        this.setState({
          isRefreshing: false,
          refreshing: false
        });
       
      };
    render() {
      if(this.props.navigation.getParam('idCateg') == '1'){
        var title = 'Saúde'
      }
      else if(this.props.navigation.getParam('idCateg') == '2'){
        var title = 'Trocas'
      }
      else if(this.props.navigation.getParam('idCateg') == '3'){
        var title = 'Cultura e Lazer'
      }
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
          <View style={styles.boxNomeCateg}>
            <Text style={styles.nomeCateg}>{title}</Text>
          </View> 
          <View style={styles.post}>
              <View style={styles.foto_post}>
              </View>
              <TouchableOpacity style={styles.ask} onPress={() => {
                this.setState({ isVisible: true });
              }}>
                <View>
                  <Text style={styles.duvida}>No que você está pensando?</Text>
                </View>
              </TouchableOpacity>
            </View>
          <View style={styles.content}>
            <FlatList
                  onRefresh={this.onRefresh}
                  refreshing={this.state.refreshing}
                  extraData={this.extraData}
                  data={this.state.posts}
                  keyExtractor={(item, index) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('PostFull', {
                      titulo: item.titulo,
                      texto: item.texto,
                      selo: item.selo,
                      idPostagem: item.id
                    })}>
                      <View style={styles.box}>
                        <View style={{...styles.foto,  ...{backgroundColor: this.getColor()}}}>
                          <Text style={styles.identificador}>
                            {item.criador[0].toUpperCase()}
                          </Text>
                        </View>
                        <Text  style={styles.texto}>{item.criador}</Text>
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
        </View>
        );
      }
    }
  