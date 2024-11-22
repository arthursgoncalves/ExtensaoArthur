import React, { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useNavigation } from "expo-router";
import { MainStackRoutes, Product } from "../interface";
import { StackScreenProps } from "@react-navigation/stack";
import { useProductStore } from "./productscontroler";

const ProdutosScreen = ({
  navigation,
  route,
}: StackScreenProps<MainStackRoutes, "produtos">) => {
  const product = route.params?.product;
  const [productName, setName] = useState(product?.productName);
  const [price, setPrice] = useState(product?.price?.toString());
  const [quantity, setQuantity] = useState(product?.quantity?.toString());
  const { upsertproduto } = useProductStore();

  const handleAddProduct = ({}) => {
    if (!productName || !price || !quantity) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    const newProduct: Product = {
      id: product?.id ?? Date.now().toString(),
      productName,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
    };

    Alert.alert(
      "Produto Cadastrado!",
      `Nome: ${productName}\nPreço: ${price}\nQuantidade: ${quantity}`
    );

    upsertproduto(newProduct);
    navigation.navigate("about");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {product?.id != null ? "Atualize " : "Cadastre "}
        seu produto!
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do produto"
        value={productName}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Preço"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <TextInput
        style={styles.input}
        placeholder="Quantidade de produtos"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />

      <Button title="Confirmar" onPress={handleAddProduct} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#005C53",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#DBF227",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor: "#DBF227",
  },
  confirmbutton: {},
});

export default ProdutosScreen;
