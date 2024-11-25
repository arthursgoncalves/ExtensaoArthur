import { useNavigation } from "expo-router";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { Text, View, FlatList, StyleSheet, Button, Alert } from "react-native";
import { MainStackRoutes, Product } from "../interface";
import { StackScreenProps } from "@react-navigation/stack";
import { useProductStore } from "./productscontroler";
import { GestureResponderEvent } from "react-native";

const AboutScreen = ({
  navigation,
  route,
}: StackScreenProps<MainStackRoutes, "about">) => {
  const { products } = useProductStore();
  const [totalSales, setTotalSales] = useState(0);
  const [totalProductsSold, setTotalProductsSold] = useState(0);

  const deletarproduto = useProductStore(
    (useProductStore) => useProductStore.deleteproduto
  );

  const editarproduto = useProductStore(
    (useProductStore) => useProductStore.upsertproduto
  );

  useEffect(() => {
    calculateTotals();
  }, [products]);

  const calculateTotals = () => {
    let total = 0;
    let totalQuantity = 0;

    products.forEach((sale) => {
      total += sale.quantity * sale.price;
      totalQuantity += sale.quantity;
    });

    setTotalSales(total);
    setTotalProductsSold(totalQuantity);
  };

  const renderProductItem = (product: Product) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemContainer}>
        <Text style={styles.productName}>{product.productName}</Text>
        <Text>Quantidade: {product.quantity}</Text>
        <Text>Preço Unitário: R$ {product.price}</Text>
        <Text>Subtotal: R$ {product.quantity * product.price}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          color={"#042940"}
          title="Editar"
          onPress={() => navigation.navigate("produtos", { product })}
        />
        <Button
          color={"#042940"}
          title="Excluir"
          onPress={() => deletarproduto(product.productName)}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard de Vendas</Text>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          Valor total em Produtos: R$ {totalSales},00
        </Text>
        <Text style={styles.summaryText}>
          Produtos em estoque: {totalProductsSold}
        </Text>
      </View>

      <FlatList
        data={products}
        renderItem={({ item }) => renderProductItem(item)}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <Text style={styles.listHeader}>Detalhes das Vendas</Text>
        }
      />
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
    color: "#D6D58E",
  },
  summaryContainer: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#DBF227",
    borderRadius: 8,
  },
  summaryText: {
    fontSize: 20,
    marginVertical: 4,
    fontWeight: "bold",
  },
  listHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
    color: "#D6D58E",
  },
  itemContainer: {
    padding: 10,
    backgroundColor: "#DBF227",
    marginBottom: 10,
    borderRadius: 8,
  },
  productName: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#042940",
    paddingBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
    paddingLeft: 8,
  },
});

export default AboutScreen;
function deletarproduto(event: GestureResponderEvent): void {
  throw new Error("Function not implemented.");
}
function handleSave(event: GestureResponderEvent): void {
  throw new Error("Function not implemented.");
}
