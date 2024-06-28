import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  getFirestore,
} from "firebase/firestore";
import connection from "../../utils/connection";

export default function Delete() {
  const [contactos, setContactos] = useState([]);
  const db = getFirestore(connection);

  useEffect(() => {
    const fetchContactos = async () => {
      const querySnapshot = await getDocs(collection(db, "contactos"));
      const contactosOrdenados = querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .sort((a, b) => a.nombre.localeCompare(b.nombre)); // Ordena alfabéticamente por el nombre del contacto

      setContactos(contactosOrdenados);
    };

    fetchContactos();
  }, []);

  const eliminarContacto = async (id) => {
    await deleteDoc(doc(db, "contactos", id));
    setContactos(contactos.filter((contacto) => contacto.id !== id));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contactos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.nombre}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => eliminarContacto(item.id)}
            >
              <Text style={styles.buttonText}>Borrar Contacto</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d0fdd7',
    padding: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    color: '#2a8c4a',
  },
  button: {
    backgroundColor: '#64c27b',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: "bold",
  },
});
