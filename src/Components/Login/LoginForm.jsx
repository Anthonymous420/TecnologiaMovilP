import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { app } from '../../utils/connection'
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function LoginForm({ navigation }) {

  const changeForm = () => {
    navigation.navigate('Registro')
  }

  const [formData, setFormData] = useState(initialsValues())
  const [formError, setFormError] = useState(initialsValues())

  function initialsValues() {
    return (
      {
        email: '',
        password: '',
      }
    )
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setFormData(initialsValues());
      setFormError(initialsValues());
    });

    return unsubscribe;
  }, [navigation]);

  const login = () => {
    let errors = {}
    if (!formData.email || !formData.password) {
      if (!formData.email) {
        errors.email = true
      }
      if (!formData.password) {
        errors.password = true
      }
    } else {
      const auth = getAuth(app);
      signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
          const user = userCredential.user;
          console.log(user)
          console.log('Logeado!')

          // Redireccionar a la pantalla de inicio (Home)
          navigation.navigate('Página Principal');
      }).catch((error) => {
        setFormError({
          email: true,
          password: true
        })
        console.log('No existe usuario con esas credenciales')
      })
    }
    setFormError(errors)
  }

  return (
    <View style={styles.container}>
      <Icon name="phone" size={100} color="#2a8c4a" style={styles.icon} />
      <Text style={styles.welcometext}>¡Hola!</Text>
      <Text style={styles.welcometext}>Ingresa tus datos</Text>
      <TextInput
        style={[styles.input, formError.email && styles.error]}
        placeholder="Correo electrónico"
        placeholderTextColor="#cccccc"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.nativeEvent.text })}
      />
      <TextInput
        style={[styles.input, formError.password && styles.error]}
        placeholder="Contraseña"
        placeholderTextColor="#cccccc"
        secureTextEntry={true}
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.nativeEvent.text })}
      />
      <TouchableOpacity onPress={login} style={styles.button}>
        <Text style={styles.textBtn}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={changeForm} style={styles.button}>
        <Text style={styles.textBtn}>¡Regístrate!</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d0fdd7',
  },
  icon: {
    marginBottom: 20,
  },
  textBtn: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center'
  },
  input: {
    height: 50,
    color: '#2a8c4a',
    width: 300,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: '#2a8c4a',
    fontSize: 18,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  welcometext: {
    color: '#2a8c4a',
    margin: 15,
    textAlign: 'center',
    fontSize: 20,
  },
  button: {
    backgroundColor: '#64c27b',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    width: 300,
    alignItems: 'center',
  },
  error: {
    borderWidth: 1.5,
    borderColor: '#9bfab0',
  }
})
