import { create } from "zustand";
import { Product } from "../interface";

type ProductState = {
  products: Product[];
};

type ProductAction = {
  upsertproduto: (product: Product) => void;
  deleteproduto: (id: string) => void;
  updateproduto: (productName: string, quantity: number, price: number) => void;
};

export const useProductStore = create<ProductState & ProductAction>((set) => ({
  products: [],
  upsertproduto: (product) =>
    set((state) => {
      const products = [...state.products];
      const index = products.findIndex((p) => p.id == product.id);
      if (index == -1) {
        products.push(product);
      } else {
        products[index] = product;
      }
      return {
        products,
      };
    }),

  updateproduto: (productName, quantity, price) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.productName === product.productName
          ? {
              ...product,
              productName: productName,
              quantity: quantity,
              price: price,
            }
          : product
      ),
    })),

  deleteproduto: (productName) =>
    set((state) => {
      const products = [...state.products];
      const index = products.findIndex((p) => p.productName == productName);
      products.splice(index, 1);
      return {
        products,
      };
    }),
}));
