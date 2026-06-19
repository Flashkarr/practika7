import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

export default function Tasks() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [text, setText] = useState("");

  const addTask = () => {
    if (!text) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: text,
        status: "Заплановано",
      },
    ]);

    setText("");
  };

  const nextStatus = (id: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          if (task.status === "Заплановано")
            return { ...task, status: "У процесі" };

          if (task.status === "У процесі")
            return { ...task, status: "Виконано" };
        }

        return task;
      })
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Manager</Text>

      <TextInput
        style={styles.input}
        placeholder="Нове завдання"
        value={text}
        onChangeText={setText}
      />

      <TouchableOpacity style={styles.button} onPress={addTask}>
        <Text style={{ color: "white" }}>Додати</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.task}>{item.title}</Text>

            <Text>{item.status}</Text>

            <TouchableOpacity
              style={styles.green}
              onPress={() => nextStatus(item.id)}
            >
              <Text>Змінити статус</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.red}
              onPress={() => deleteTask(item.id)}
            >
              <Text>Видалити</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
  },

  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
  },

  button: {
    backgroundColor: "#4b7bec",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },

  card: {
    backgroundColor: "#eee",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },

  task: {
    fontSize: 18,
    fontWeight: "bold",
  },

  green: {
    backgroundColor: "lightgreen",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },

  red: {
    backgroundColor: "tomato",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
});