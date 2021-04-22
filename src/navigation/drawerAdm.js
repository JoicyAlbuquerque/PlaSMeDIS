import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Cadastro from '../pages/cadastro';
import Tab from './tabTop';
import ConfigAdmin from '../pages/configAdmin';
import Postagem from '../pages/homeCateg';
import SideMenu from './DrawerStyleAdm'

const DrawerAdm = createDrawerNavigator({
   Inicio: {
      screen: Tab,
   },
   Cadastro,
   ConfigAdmin,
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

export default DrawerAdm;