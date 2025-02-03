import React, { useEffect, useState } from "react";
import Card from "../components/Card";

import { fetchProducts } from "../services/api/get_product";
import ThemeToggle from "../services/theme/ThemeToogle";
import { Product } from "../types/product";

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Chargement des produits à l'initialisation
  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-lg font-bold">
        Chargement des produits...
      </p>
    );
  }

  return (
    <>
      <ThemeToggle />
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Card
            key={product.id}
            title={product.title}
            description={product.description}
            imageUrl={product.thumbnail}
            price={product.price}
            onClick={() => alert(`Produit sélectionné : ${product.title}`)}
          />
        ))}
      </div>
    </>
  );
};

export default HomePage;
