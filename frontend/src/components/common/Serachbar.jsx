import React, { useState, useEffect } from 'react'
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Serachbar = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)

    const handleSearchToggle = () => {
        setIsOpen(!isOpen)
        if (!isOpen) {
            setSearchResults([])
            setSearchTerm("")
        }
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:9001/api/products/search?q=${encodeURIComponent(searchTerm)}`);
            setSearchResults(response.data || []);
        } catch (error) {
            console.error('Search error:', error);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    }

    const getImageUrl = (imgArray) => {
        if (!imgArray || !Array.isArray(imgArray) || imgArray.length === 0) return null;
        
        const firstImage = imgArray[0];
        if (typeof firstImage === 'string') return firstImage;
        
        if (typeof firstImage === 'object') {
            return Object.values(firstImage).join('');
        }
        
        return null;
    };

    // Close search when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && !event.target.closest('.search-container')) {
                setIsOpen(false);
                setSearchResults([]);
                setSearchTerm("");
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className={`search-container relative ${isOpen ? "w-full" : "w-auto"}`}>
            {isOpen ? (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 relative">
                        <form onSubmit={handleSearch} className='p-4'>
                            <div className='relative'>
                                <input 
                                    type="text"
                                    placeholder='Search products...' 
                                    value={searchTerm} 
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className='w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base'
                                    autoFocus
                                />
                                {/* Search Icon */}
                                <button 
                                    type="submit" 
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 p-1"
                                >
                                    <HiMagnifyingGlass className="h-5 w-5" />
                                </button>
                            </div>
                            
                            {/* Search Results */}
                            {(searchResults.length > 0 || loading) && (
                                <div className="mt-4 max-h-96 overflow-y-auto">
                                    {loading ? (
                                        <div className="p-4 text-center text-gray-500">
                                            Searching...
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            {searchResults.map((product) => (
                                                <Link
                                                    key={product._id}
                                                    to={`/product/${product._id}`}
                                                    onClick={() => {
                                                        setIsOpen(false);
                                                        setSearchResults([]);
                                                        setSearchTerm("");
                                                    }}
                                                    className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                                                >
                                                    <div className="w-12 h-12 flex-shrink-0">
                                                        <img
                                                            src={getImageUrl(product.img) || '/placeholder.jpg'}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover rounded"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-sm font-medium text-gray-900 truncate">
                                                            {product.name}
                                                        </h4>
                                                        <p className="text-sm text-gray-500">
                                                            ₹{product.price?.toLocaleString()}
                                                        </p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </form>
                        
                        {/* Close button */}
                        <button 
                            type="button"  
                            onClick={handleSearchToggle}
                            className='absolute top-4 right-4 text-gray-600 p-1 hover:bg-gray-100 rounded-full'
                        >
                            <HiMiniXMark className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            ) : (
                <button onClick={handleSearchToggle} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <HiMagnifyingGlass className='h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6' />
                </button>
            )}
        </div>
    )
}

export default Serachbar