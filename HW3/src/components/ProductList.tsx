import React, { useState, useEffect, useRef } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import SideMenu from './SideMenu';
import ProductModal from './ProductModal';
import { Product } from '../types/types';

const ITEMS_PER_BATCH = 7;

interface ProductListProps {
  isMenuVisible: boolean;
  toggleMenu: () => void;
}

const ProductList: React.FC<ProductListProps> = ({ isMenuVisible, toggleMenu }) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filters, setFilters] = useState({ name: '', inStock: false, category: 'Все товары' });
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch('/products.json')
      .then((response) => response.json())
      .then((data: Product[]) => {
        setAllProducts(data);
        setFilteredProducts(data);
        setDisplayedProducts(data.slice(0, ITEMS_PER_BATCH));
        setHasMore(data.length > ITEMS_PER_BATCH);
      })
      .catch((error) => console.error('Ошибка загрузки данных:', error));
  }, []);

  const applyFilters = () => {
    const { name, inStock, category } = filters;
    let regex: RegExp | null = null;

    if (name) {
      try {
        regex = new RegExp(name, 'i');
      } catch {
        regex = null;
      }
    }

    const filtered = allProducts.filter((product) => {
      const matchesName = regex ? regex.test(product.name) : true;
      const matchesStock = inStock ? product.quantity > 0 : true;
      const matchesCategory = category !== 'Все товары' ? product.category === category || product.category === "" && category === "Без категории" : true;
      return matchesName && matchesStock && matchesCategory;
    });

    setFilteredProducts(filtered);
    setDisplayedProducts(filtered.slice(0, ITEMS_PER_BATCH));
    setHasMore(filtered.length > ITEMS_PER_BATCH);
  };

  useEffect(() => { applyFilters() }, [filters]);

  const loadMoreProducts = () => {
    const start = displayedProducts.length;
    const nextProducts = filteredProducts.slice(start, start + ITEMS_PER_BATCH);

    if (nextProducts.length > 0) {
      setDisplayedProducts((prev) => [...prev, ...nextProducts]);
    }

    setHasMore(start + ITEMS_PER_BATCH < filteredProducts.length);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreProducts();
        }
      },
      { 
        threshold: 1.0 
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, displayedProducts]);

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <Box sx={{ display: 'flex', marginTop: '64px' }}>
      <SideMenu
        products={allProducts}
        isVisible={isMenuVisible}
        onClose={toggleMenu}
        setFilters={setFilters}
      />
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        {displayedProducts.length > 0 ? (
          <Grid container spacing={2}>
            {displayedProducts.map((product, index) => (
              <Grid item key={index}>
                <ProductCard
                  name={product.name}
                  description={product.description}
                  category={product.category}
                  quantity={product.quantity}
                  unit={product.unit}
                  imageUrl={product.imageUrl}
                  onCardClick={() => handleCardClick(product)}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body2" color="textSecondary" align="center" sx={{ marginTop: 4 }}>
            Нет товаров, соответствующих фильтрам
          </Typography>
        )}
        <div ref={loaderRef} style={{ height: '50px', marginTop: '20px' }} />
        {!hasMore && displayedProducts.length > 0 && (
          <Typography variant="body2" color="textSecondary" align="center" sx={{ marginTop: 2 }}>
            Все товары загружены
          </Typography>
        )}
      </Box>
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={closeModal}
      />
    </Box>
  );
};

export default ProductList;