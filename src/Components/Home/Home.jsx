import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import React, { useLayoutEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Home({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  const changeForm = () => {
    navigation.navigate("Crear");
  };
  const viewContacts = () => {
    navigation.navigate("Ver");
  };
  const logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigation.navigate("Bienvenido a Contactos", { reset: true });
    }).catch((error) => {
      console.error("Error al cerrar sesión: ", error);
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Icon name="contacts" size={100} color="#2a8c4a" style={styles.icon} />
      <Text style={styles.titulo}>¡Hola!</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity onPress={changeForm} style={styles.button}>
          <Text style={styles.textBtn}>Agregar un nuevo contacto</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={viewContacts} style={styles.button}>
          <Text style={styles.textBtn}>Ver contactos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.textBtn}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d0fdd7',
    padding: 35,
  },
  icon: {
    marginBottom: 20,
  },
  titulo: {
    textAlign: "center",
    fontSize: 24,
    color: '#2a8c4a',
    marginBottom: 20,
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
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
  logoutButton: {
    backgroundColor: '#ff6961',
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
});
