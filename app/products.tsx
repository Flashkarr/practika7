import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Products() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const products = [
    {
      id: 1,
      name: "iPhone 16",
      price: 45000,
      rating: 4.9,
      image: "https://picsum.photos/200?1",
    },
    {
      id: 2,
      name: "Samsung S25",
      price: 39000,
      rating: 4.7,
      image: "https://picsum.photos/200?2",
    },
    {
      id: 3,
      name: "Xiaomi 15",
      price: 25000,
      rating: 4.5,
      image: "https://picsum.photos/200?3",
    },
  ];

  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const loadFavorites = async () => {
    const data = await AsyncStorage.getItem("favorites");
    if (data) setFavorites(JSON.parse(data));
  };

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((x) => x !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Каталог товарів</Text>

      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <Text style={styles.name}>{item.name}</Text>
            <Text>Ціна: {item.price} грн</Text>
            <Text>Рейтинг: ⭐ {item.rating}</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => toggleFavorite(item.id)}
            >
              <Text style={{ color: "white" }}>
                {favorites.includes(item.id)
                  ? "Прибрати з обраного"
                  : "В обране"}
              </Text>
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
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#eee",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },

  image: {
    width: "100%",
    height: 180,
    borderRadius: 15,
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },

  button: {
    backgroundColor: "#4b7bec",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
});