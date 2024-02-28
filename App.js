import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Components/Home';
import UserCamera from './src/Components/UserCamera';


export default function App() {
  const Stack = createNativeStackNavigator()

  return (

<NavigationContainer>
  <Stack.Navigator>
<Stack.Screen name='home' component={Home} options={{
  HeaderTitle : 'Home Main',
  headerTintColor: 'black',
  headerStyle : {
    backgroundColor : 'green'
  }
}} />
<Stack.Screen name='usercam' component={UserCamera}/>

  </Stack.Navigator>

</NavigationContainer>


  );
}



// const style = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'gray',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
