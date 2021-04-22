import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// withNavigation allows components to dispatch navigation actions
import { withNavigation } from 'react-navigation';

// DrawerActions is a specific type of navigation dispatcher
import { DrawerActions } from 'react-navigation-drawer';

class DrawerIcon extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.trigger} onPress={() => { this.props.navigation.dispatch(DrawerActions.openDrawer())}}hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}>
        <Icon name="menu" size={35} color="#31788A" style={styles.icon} light />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  trigger: {
    marginLeft: 27.5,
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  icon:{

    top: 12,
    left: -10,
    borderRadius: 10

  }
});

export default withNavigation(DrawerIcon);