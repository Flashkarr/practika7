import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function Organizer() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [notes, setNotes] = useState<string[]>([]);
  const [note, setNote] = useState("");

  const addTask = () => {
    if (task)
      setTasks([...tasks, task]);

    setTask("");
  };

  const addNote = () => {
    if (note)
      setNotes([...notes, note]);

    setNote("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Персональний органайзер
      </Text>

      <Text style={styles.subtitle}>
        Завдання
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Нове завдання"
        value={task}
        onChangeText={setTask}
      />

      <TouchableOpacity style={styles.button} onPress={addTask}>
        <Text style={styles.text}>Додати</Text>
      </TouchableOpacity>

      {tasks.map((item, index) => (
        <Text key={index}>• {item}</Text>
      ))}

      <Text style={styles.subtitle}>
        Нотатки
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Нова нотатка"
        value={note}
        onChangeText={setNote}
      />

      <TouchableOpacity style={styles.button} onPress={addNote}>
        <Text style={styles.text}>Додати</Text>
      </TouchableOpacity>

      {notes.map((item, index) => (
        <Text key={index}>• {item}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  subtitle: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
  },

  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
  },

  button: {
    backgroundColor: "#4b7bec",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },

  text: {
    color: "white",
    fontWeight: "bold",
  },
});