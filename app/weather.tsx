import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    if (!city) return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://wttr.in/${city}?format=j1`
      );

      const data = await response.json();

      setWeather({
        temp: data.current_condition[0].temp_C,
        humidity: data.current_condition[0].humidity,
        wind: data.current_condition[0].windspeedKmph,
        condition: data.current_condition[0].weatherDesc[0].value,
      });
    } catch {
      alert("Помилка");
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Погода</Text>

      <TextInput
        style={styles.input}
        placeholder="Місто"
        value={city}
        onChangeText={setCity}
      />

      <TouchableOpacity style={styles.button} onPress={getWeather}>
        <Text style={{ color: "white" }}>Пошук</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" />}

      {weather && (
        <View style={styles.card}>
          <Text>Температура: {weather.temp}°C</Text>
          <Text>Вологість: {weather.humidity}%</Text>
          <Text>Вітер: {weather.wind} км/год</Text>
          <Text>Стан: {weather.condition}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
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
    alignItems: "center",
    marginVertical: 10,
  },

  card: {
    backgroundColor: "#eee",
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
  },
});