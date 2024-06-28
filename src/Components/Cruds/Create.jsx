import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import connection from '../../utils/connection';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const db = getFirestore(connection);

const Create = (props) => {

  const initialState = {
    nombre: "",
    apellido: "",
    edad: "",
    sexo: "Hombre", // Valor inicial para el Picker
    telefono: "",
  };
  const [state, setState] = useState(initialState);
  const [formError, setFormError] = useState({});

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const guardar = async () => {
    let errors = {};
    if (!state.nombre || !state.apellido || !state.edad || !state.sexo || !state.telefono) {
      if (!state.nombre) errors.nombre = true;
      if (!state.apellido) errors.apellido = true;
      if (!state.edad) errors.edad = true;
      if (!state.sexo) errors.sexo = true;
      if (!state.telefono) errors.telefono = true;
    } else if (state.telefono.length !== 10) {
      errors.telefono = true;
      Alert.alert('Error', 'El número de teléfono debe tener 10 dígitos');
    } else {
      try {
        await addDoc(collection(db, 'contactos'), {
          ...state
        });
        Alert.alert('Listo', 'Guardado con éxito');
        props.navigation.navigate('Página Principal');
      } catch (error) {
        console.error(error);
      }
    }
    setFormError(errors);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Ingresar Contacto</Text>
      <View style={styles.inputGroup}>
        <TextInput
          style={[styles.input, formError.nombre && styles.error]}
          placeholder="Nombre"
          placeholderTextColor="#cccccc"
          value={state.nombre}
          onChangeText={(value) => handleChangeText(value, 'nombre')}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          style={[styles.input, formError.apellido && styles.error]}
          placeholder="Apellido"
          placeholderTextColor="#cccccc"
          value={state.apellido}
          onChangeText={(value) => handleChangeText(value, 'apellido')}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          style={[styles.input, formError.edad && styles.error]}
          placeholder="Edad"
          placeholderTextColor="#cccccc"
          keyboardType="numeric"
          value={state.edad}
          onChangeText={(value) => handleChangeText(value, 'edad')}
        />
      </View>
      <View style={styles.inputGroup}>
        <Picker
          selectedValue={state.sexo}
          style={[styles.input, formError.sexo && styles.error]}
          onValueChange={(itemValue) => handleChangeText(itemValue, 'sexo')}
        >
          <Picker.Item label="Hombre" value="Hombre" />
          <Picker.Item label="Mujer" value="Mujer" />
        </Picker>
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          style={[styles.input, formError.telefono && styles.error]}
          placeholder="Teléfono"
          placeholderTextColor="#cccccc"
          keyboardType="phone-pad"
          value={state.telefono}
          onChangeText={(value) => handleChangeText(value, 'telefono')}
        />
      </View>
      <TouchableOpacity onPress={guardar} style={styles.button}>
        <Text style={styles.textBtn}>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d0fdd7',
    padding: 35,
  },
  titulo: {
    textAlign: "center",
    fontSize: 24,
    color: '#2a8c4a',
    marginBottom: 20,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 50,
    color: '#2a8c4a',
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: '#2a8c4a',
    fontSize: 18,
    paddingHorizontal: 20,
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
  textBtn: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  error: {
    borderWidth: 1.5,
    borderColor: '#9bfab0',
  },
});
