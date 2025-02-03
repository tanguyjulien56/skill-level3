import { Product } from "../../types/product";

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Erreur lors du chargement des produits :", error);
    return [];
  }
};