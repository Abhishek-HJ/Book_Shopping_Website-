// In SearchResults.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SearchResults.css';


const SearchResults = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const query = new URLSearchParams(window.location.search).get('query');

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/search`, {
                    params: { q: query }
                });
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, [query]);

    return (
        <div className="search-results">
            <h1>Search Results for "{query}"</h1>
            {loading ? <p>Loading...</p> : (
                <div className="results-list">
                    {products.length > 0 ? (
                        products.map(product => (
                            <div key={product.id} className="product-item">
                                <img src={product.image} alt={product.name} />
                                <h2>{product.name}</h2>
                                <p>{product.description}</p>
                                <p>Price: {product.new_price}</p>
                            </div>
                        ))
                    ) : (
                        <p>No results found</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
