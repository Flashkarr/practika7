import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Notes() {
  const [notes, setNotes] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    saveNotes();
  }, [notes]);

  const saveNotes = async () => {
    await AsyncStorage.setItem("notes", JSON.stringify(notes));
  };

  const loadNotes = async () => {
    const data = await AsyncStorage.getItem("notes");
    if (data) setNotes(JSON.parse(data));
  };

  const addNote = () => {
    if (!text) return;

    if (editingId !== null) {
      setNotes(
        notes.map((n) =>
          n.id === editingId ? { ...n, title: text } : n
        )
      );
      setEditingId(null);
    } else {
      setNotes([
        {
          id: Date.now(),
          title: text,
          date: new Date().toLocaleString(),
        },
        ...notes,
      ]);
    }

    setText("");
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const editNote = (item: any) => {
    setText(item.title);
    setEditingId(item.id);
  };

  const filtered = notes.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Нотаток: {notes.length}
      </Text>

      <TextInput
        placeholder="Нова нотатка"
        value={text}
        onChangeText={setText}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={addNote}>
        <Text style={styles.btnText}>
          {editingId ? "Зберегти" : "Додати"}
        </Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Пошук"
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />

      <FlatList
        data={filtered}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.note}>{item.title}</Text>
            <Text>{item.date}</Text>

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.edit}
                onPress={() => editNote(item)}
              >
                <Text>Редагувати</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.delete}
                onPress={() => deleteNote(item.id)}
              >
                <Text>Видалити</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 25, fontWeight: "bold", marginBottom: 15 },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4b7bec",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#eee",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  note: {
    fontSize: 18,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },
  edit: {
    backgroundColor: "yellow",
    padding: 8,
    borderRadius: 10,
  },
  delete: {
    backgroundColor: "tomato",
    padding: 8,
    borderRadius: 10,
  },
});