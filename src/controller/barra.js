import * as React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Feather';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Adicionar from '../View/Adicionar(produtos)/Adicionar'
import taxas from '../View/Configuracao(taxas)/Configuracao'
import perfil from '../View/Perfil/Perfil'


const tab = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
  
        screenOptions={({ route }) => ({
         
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'inicio') {
              return (
                <Icon
                  name={
                    focused
                      ? 'home'
                      : 'home'
                  }
                  size={hp('3.5')}
                  color={color}
                />
              );
            } else if (route.name === 'taxas') {
              return (
                <Icon
                  name={focused ? 'clipboard' : 'clipboard'}
                  size={25}
                  color={color}
                />
              );
            } else if (route.name === 'perfil') {
                return (
                  <Icon
                    name={focused ? 'user' : 'user'}
                    size={hp('3.5')}
                    color={color}
                  />
                );
              }


          },
        })}
        tabBarOptions={{
          activeTintColor: '#047454',
          inactiveTintColor: '#959da4',
          style: { height:hp('6.4') },
          labelStyle: {fontSize:hp('1.4')}
        }}
      >
        <Tab.Screen name="inicio" component={Adicionar} />
        <Tab.Screen name="taxas" component={taxas} />
        <Tab.Screen name="perfil" component={perfil} />

      </Tab.Navigator>
  )
};

export default tab;