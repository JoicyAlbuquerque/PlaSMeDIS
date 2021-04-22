import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View, StyleSheet} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
  },
  navItemStyle: {
    padding: 10,
    fontSize: 16,
    color: '#31788A',
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderColor: '#fafafa',
  },
  navSectionStyle: {
    backgroundColor: '#fff',
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#fafafa',
  },
  footerContainer: {
    padding: 20,
    backgroundColor: 'lightgrey',
  },
  navSectionStyleForm: {
    backgroundColor: '#fff',
    marginTop: 50,
  },
  navSectionStyleCateg: {
    backgroundColor: '#fff',
    marginTop: 30,
  },
});

class SideMenu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <View style={styles.navSectionStyle}>
              <Text
                style={styles.navItemStyle}
                onPress={this.navigateToScreen('Inicio')}>
                Início
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.navSectionStyleCateg}>
              <Text
                style={styles.navItemStyle}
                onPress={this.navigateToScreen('Saúde')}>
                Saúde
              </Text>
              <Text
                style={styles.navItemStyle}
                onPress={this.navigateToScreen('Trocas')}>
                Trocas
              </Text>
              <Text
                style={styles.navItemStyle}
                onPress={this.navigateToScreen('Cultura')}>
                Cultura e Lazer
              </Text>
            </View>
          </View>
          <View style={styles.navSectionStyleForm}>
            <Text
              style={styles.navItemStyle}
              onPress={this.navigateToScreen('Cadastro')}>
              Cadastro de Novos Usuários
            </Text>
            <Text
              style={styles.navItemStyle}
              onPress={this.navigateToScreen('ConfigAdmin')}>
              Configurações do Administrador
            </Text>
          </View>
          <View style={styles.navSectionStyleForm}>
            <Text
              style={styles.navItemStyle}
              onPress={async () => {
                await AsyncStorage.removeItem('user_type');
                await AsyncStorage.removeItem('id');
                this.props.navigation.navigate('Login');
              }}>
              Logout
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object,
};
export default SideMenu;
