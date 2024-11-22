import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type Product = {
  id: string;
  productName: string;
  price: number;
  quantity: number;
};

export type MainStackRoutes = {
  about: undefined;
  produtos: {product?: Product}
};
