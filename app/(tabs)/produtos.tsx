import React, { useEffect, useState } from "react";
import { Text, View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useNavigation } from "expo-router";
import { MainStackRoutes, Product } from "../interface";
import { StackScreenProps } from "@react-navigation/stack";
import { useProductStore } from "./productscontroler";

type ProductFormValue = {
  id?: string;
  productName?: string;
  price?: string;
  quantity?: string;
};

const ProdutosScreen = ({
  navigation,
  route,
}: StackScreenProps<MainStackRoutes, "produtos">) => {
  const valueProduct = route.params?.product;
  const [product, setProduct] = useState<ProductFormValue>({
    id: valueProduct?.id,
    productName: valueProduct?.productName,
    price: valueProduct?.price.toString(),
    quantity: valueProduct?.quantity.toString(),
  });
  const { upsertproduto } = useProductStore();

  useEffect(() => {
    if (valueProduct != null) {
      setProduct({
        id: valueProduct?.id,
        productName: valueProduct?.productName,
        price: valueProduct?.price.toString(),
        quantity: valueProduct?.quantity.toString(),
      });
    }
  }, [valueProduct]);

  const handleAddProduct = ({}) => {
    const newProduct: Product = {
      id: product?.id ?? Date.now().toString(),
      productName: product.productName!,
      price: parseFloat(product.price!),
      quantity: parseInt(product.quantity!, 10),
    };

    Alert.alert("Produto Cadastrado!");

    upsertproduto(newProduct);
    setProduct({});
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
        value={product.productName}
        onChangeText={(v) => setProduct({ ...product, productName: v })}
      />

      <TextInput
        style={styles.input}
        placeholder="Preço"
        keyboardType="numeric"
        value={product.price}
        onChangeText={(v) => setProduct({ ...product, price: v })}
      />

      <TextInput
        style={styles.input}
        placeholder="Quantidade de produtos"
        value={product.quantity}
        onChangeText={(v) => setProduct({ ...product, quantity: v })}
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
