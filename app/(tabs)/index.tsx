import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Практична 7</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/notes" as any)}
      >
        <Text style={styles.buttonText}>Менеджер нотаток</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/products" as any)}
      >
        <Text style={styles.buttonText}>Каталог товарів</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/tasks" as any)}
      >
        <Text style={styles.buttonText}>Task Manager</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/weather" as any)}
      >
        <Text style={styles.buttonText}>Прогноз погоди</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/organizer" as any)}
      >
        <Text style={styles.buttonText}>Персональний органайзер</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f6fa",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },

  button: {
    backgroundColor: "#4b7bec",
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});