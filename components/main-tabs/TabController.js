import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cadastro from './tabs/Cadastro';
import Home from './tabs/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../utils/colors';

const Tab = createBottomTabNavigator();

export default function TabController() {
  return (
    <Tab.Navigator 
    screenOptions={
      ({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'ios-information-circle-outline';
        } else if (route.name === 'Cadastro') {
          iconName = 'car-outline';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      headerShown: false,
      tabBarStyle:{
        backgroundColor:'#121212',
        borderTopColor:'#121212'
      },
      tabBarActiveTintColor: colors.textPrimary,
      tabBarInactiveTintColor: colors.textSecundary,
    })
    }>
      <Tab.Screen name="Home" options={{}} component={Home} />
      <Tab.Screen name="Cadastro" component={Cadastro} />
    </Tab.Navigator>
  );
}