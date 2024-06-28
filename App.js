import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from './src/Components/Login/LoginForm.jsx';
import Home from './src/Components/Home/Home.jsx';
import RegisterForm from './src/Components/Login/RegisterForm.jsx';
import Create from './src/Components/Cruds/Create.jsx'
import Delete from './src/Components/Cruds/Delete.jsx'
import ContactDetail from './src/Components/Cruds/ContactDetail.jsx'
import Vista from './src/Components/Cruds/Vista.jsx'
import EditForm from './src/Components/Cruds/EditForm.jsx';

export default function App() {
  const Stack = createStackNavigator();

  function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Bienvenido a Contactos" component={LoginForm} />
        <Stack.Screen name="Registro" component={RegisterForm} />
        <Stack.Screen name="Página Principal" component={Home} />
        <Stack.Screen name="Crear" component={Create} />
        <Stack.Screen name="Detalles del Contacto" component={ContactDetail} />
        <Stack.Screen name="Borrar" component={Delete} />
        <Stack.Screen name="Editar Formulario" component={EditForm} />
        <Stack.Screen name="Ver" component={Vista} />
        
      </Stack.Navigator>
    );
  }

  return (
  <NavigationContainer>
    <MyStack/>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ABCFF1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
