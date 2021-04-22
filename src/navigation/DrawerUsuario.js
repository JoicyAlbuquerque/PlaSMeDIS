import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Tab from './tabTop';
import Update from '../pages/update';
import Postagem from '../pages/homeCateg';
import Forms from '../pages/forms';
import SideMenu from './DrawerStyle'


const DrawerUsuario = createDrawerNavigator({
  Início:{
    screen:Tab,
    screenOptions:{
      title: 'Início',
    },
  },
  FormsUpdate:{
    screen: Update,
  },
  Formulario:{
    screen: Forms,
  },
  Saúde:{
    screen: Postagem,
    params:{
      idCateg:'1',
      titulo: 'Saúde'
    }
  },
  Trocas:{
    screen: Postagem,
    params:{
      idCateg:'2',
      titulo: 'Trocas'
    }
  },
  Cultura:{
    screen: Postagem,
    params:{
      idCateg:'3',
      titulo: 'Cultura e Lazer'
    },
    navigationOptions:{
      title: 'Cultura e Lazer'
    }
  }
},{
  contentComponent: SideMenu
});

export default DrawerUsuario;

