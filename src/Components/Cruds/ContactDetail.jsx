import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Share, Linking } from 'react-native';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import connection from '../../utils/connection';

const db = getFirestore(connection);

const ContactDetail = ({ route, navigation }) => {
  const { id, nombre, apellido, edad, sexo, telefono } = route.params;

  const confirmarEliminacion = () => {
    Alert.alert(
      "Eliminar Contacto",
      "¿Estás seguro de que deseas eliminar este contacto?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: eliminarContacto,
          style: "destructive"
        }
      ]
    );
  };

  const eliminarContacto = async () => {
    try {
      await deleteDoc(doc(db, "contactos", id));
      Alert.alert('Contacto eliminado');
      navigation.navigate("Ver", { refresh: true });
    } catch (error) {
      console.error("Error al eliminar el contacto: ", error);
    }
  };

  const compartirContacto = async () => {
    try {
      await Share.share({
        message: `Contacto: ${nombre} ${apellido}\nEdad: ${edad}\nSexo: ${sexo}\nTeléfono: ${telefono}`,
      });
    } catch (error) {
      console.error("Error al compartir el contacto: ", error);
    }
  };

  const llamarContacto = (telefono) => {
    Linking.openURL(`tel:${telefono}`);
  };

  return (
    <View style={styles.container}>
      <Icon name="person" size={100} color="#2a8c4a" style={styles.icon} />
      <Text style={styles.title}>Información del Contacto</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.text}><Text style={styles.label}>Nombre:</Text> {nombre}</Text>
        <Text style={styles.text}><Text style={styles.label}>Apellido:</Text> {apellido}</Text>
        <Text style={styles.text}><Text style={styles.label}>Edad:</Text> {edad}</Text>
        <Text style={styles.text}><Text style={styles.label}>Sexo:</Text> {sexo}</Text>
        <View style={styles.phoneContainer}>
          <Text style={styles.text}><Text style={styles.label}>Teléfono:</Text> {telefono}</Text>
          <TouchableOpacity onPress={() => llamarContacto(telefono)}>
            <Icon name="phone" size={20} color="#2a8c4a" style={styles.phoneIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Editar Formulario", { id })}
      >
        <Icon name="edit" size={20} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={confirmarEliminacion}>
        <Icon name="delete" size={20} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Eliminar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={compartirContacto}>
        <Icon name="share" size={20} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Compartir</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContactDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d0fdd7',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2a8c4a',
  },
  infoContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: '#2a8c4a',
  },
  label: {
    fontWeight: 'bold',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneIcon: {
    marginLeft: 10,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#64c27b',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: '#ff6961', // Rojo pastel
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 10,
  },
  buttonIcon: {
    marginRight: 5,
  },
});
