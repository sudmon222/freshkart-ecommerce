import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

const AllProducts = () => {
    const { products, searchQuery } = useAppContext();
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        // Filter by search
        if (searchQuery.length > 0) {
            setFilteredProducts(
                products.filter(product =>
                    product.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        } else {
            setFilteredProducts(products);
        }
    }, [products, searchQuery]);

    return (
        <div className="mt-16 flex flex-col">
            <div className="flex flex-col items-end w-max">
                <p className="text-2xl font-medium uppercase">All Products</p>
                <div className="w-16 h-0.5 bg-primary rounded-full"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
                {filteredProducts
                    .filter(product => product.inStock)
                    .map(product => {
                        // 🟢 Allow BOTH "image" and "images"
                        const safeImages =
                            product.images ||
                            product.image ||        // fallback for old data
                            [];

                        // 🟢 Create a normalized product object
                        const productWithSafeImages = {
                            ...product,
                            images: safeImages     // ensure ProductCard ALWAYS gets images[]
                        };

                        return (
                            <div key={product._id} className="p-2 sm:p-3">
                                <ProductCard product={productWithSafeImages} />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default AllProducts;
