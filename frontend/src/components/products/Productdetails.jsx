// import React, { useEffect, useState } from 'react';
// import { toast } from "sonner";
// import ProductGrid from './ProductGrid';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchProductDetails, fetchSimilarProducts } from '../../redux/slices/productSlice';
// import { addToCart } from '../../redux/slices/cartSlice';
// import { useParams } from 'react-router-dom';

// const Productdetails = ({ productId }) => {
//     const { id } = useParams();
//     const dispatch = useDispatch();

//     const { selectedProduct, loading, error, similarProducts } = useSelector((state) => state.products);
//     const { user, guestId } = useSelector((state) => state.auth);

//     const [mainimg, setMainImage] = useState("");
//     const [quantity, setQuantity] = useState(1);
//     const [isBtnDisabled, setBtnDisabled] = useState(true);

//     const productFetchId = productId || id;

//     useEffect(() => {
//         if (productFetchId) {
//             dispatch(fetchProductDetails(productFetchId));
//             dispatch(fetchSimilarProducts({ id: productFetchId }));
//         }
//     }, [dispatch, productFetchId]);

//     useEffect(() => {
//         setBtnDisabled(!(quantity > 0));
//     }, [quantity]);

//  useEffect(() => {
//   if (selectedProduct?.img?.length > 0) {
//     const url = getImageUrl(selectedProduct.img);
//     if (url) setMainImage(url);
//   }
// }, [selectedProduct]);


//     const handleAddtoCart = () => {
//         if (!(quantity > 0)) {
//             toast.error("Please select a size and color", { duration: 1000 });
//             return;
//         }
//         setBtnDisabled(true);
//         dispatch(addToCart({
//             productId: productFetchId,
//             quantity,
//             category: selectedProduct.category,
//             collections: selectedProduct.collections,
//             guestId,
//             userId: user?._id,
//         }))
//             .then(() => {
//                 toast.success("Product added to cart", { duration: 1000 });
//             })
//             .finally(() => {
//                 setBtnDisabled(false);
//             });
//     };

//     if (loading) {
//         return <p>Loading...</p>;
//     }
//     if (error) {
//         return <p>Error: {error}</p>;
//     }

//     const getImageUrl = (imgArray) => {
//         if (!Array.isArray(imgArray) || !imgArray.length) return null;
//         const firstImage = imgArray[0];
//         const url = Object.entries(firstImage)
//             .filter(([key]) => !isNaN(key))
//             .sort((a, b) => a[0] - b[0])
//             .map(([, val]) => val)
//             .join('');
//         return url;
//     };

//     if (!selectedProduct || !selectedProduct.img || !selectedProduct.img.length) {
//         return <p>Product details are unavailable</p>; // Handling case if no product data is available
//     }

//     return (
//         <div className='p-6'>
//             <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
//                 <div className='flex flex-col md:flex-row'>

//                     {/* Left Thumbnails */}
//                     <div className='hidden md:flex flex-col space-y-4 mr-6'>
//                     {selectedProduct.img.map((img, index) => (
//                             <img
//                                 key={index}
//                                 src={getImageUrl([img])} // wrap in array to reuse the same function
//                                 alt={`Thumbnail ${index}`}
//                                 className="w-20 h-20 object-cover rounded-lg cursor-pointer border"
//                                 onClick={() => setMainImage(getImageUrl([img]))}
//                             />
//                             ))}

//                     </div>

//                     {/* Main Image */}
//                     <div className='md:w-1/2'>
//                         <div className='mb-4'>
//                             <img
//                                 src={getImageUrl(selectedProduct.img) || mainimg}
//                                 alt={selectedProduct?.name}
//                                 className="w-full h-auto object-cover rounded"
//                             />
//                         </div>
//                     </div>

//                     {/* Right Side */}
//                     <div className='md:w-1/2 md:ml-10'>
//                         <h1 className='text-2xl md:text-3xl font-semibold mb-2'>{selectedProduct.name}</h1>
//                         <p className='text-lg text-gray-600 mb-1 line-through'>₹{selectedProduct.originalPrice}</p>
//                         <p className='text-xl text-gray-500 mb-2'>₹{selectedProduct.price}</p>
//                         <p className='text-gray-600 mb-4'>{selectedProduct.des}</p>

//                         {/* Quantity */}
//                         <div className='mb-6'>
//                             <p className='text-gray-700'>Quantity</p>
//                             <div className='flex items-center space-x-4 mt-2'>
//                                 <button
//                                     className='px-2 py-1 bg-gray-200 rounded text-lg'
//                                     onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
//                                 >
//                                     -
//                                 </button>
//                                 <span className='text-lg'>{quantity}</span>
//                                 <button
//                                     className='px-2 py-1 bg-gray-200 rounded text-lg'
//                                     onClick={() => setQuantity((prev) => prev + 1)}
//                                 >
//                                     +
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Add to Cart Button */}
//                         <button
//                             onClick={handleAddtoCart}
//                             className={`py-2 px-6 rounded w-full mb-4 ${isBtnDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white"}`}
//                             disabled={isBtnDisabled}
//                         >
//                             ADD TO CART
//                         </button>

//                         {/* Characteristics */}
//                         <div className='mt-10 text-gray-700'>
//                             <h3 className='text-xl font-bold mb-4'>Characteristics</h3>
//                             <table className='w-full text-left text-sm text-gray-600 border-collapse border'>
//                                 <tbody>
//                                     <tr><td className='py-1'>Material</td><td className='py-1'>{selectedProduct.material}</td></tr>
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Similar Products Section */}
//                 <div className='mt-20'>
//                     <h2 className='text-2xl text-center font-medium mb-4'>You May Also Like</h2>
//                     <ProductGrid products={similarProducts} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Productdetails;





import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { toast } from 'sonner';
import {useParams} from'react-router-dom';

const Productdetails = ({ productId: propId }) => {
    const { id: routeId } = useParams(); // 🆕
  const productId = propId || routeId; // 🆕
  const dispatch = useDispatch();
  const { user, guestId } = useSelector((state) => state.auth);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isBtnDisabled, setBtnDisabled] = useState(false);

  const getImageUrl = (imgArray) => {
    if (!Array.isArray(imgArray) || !imgArray.length) return null;
    const firstImage = imgArray[0];
    if (firstImage.url) return firstImage.url;
    // Combine all character values into a string for legacy format
    return Object.values(firstImage).join('');
  };

  const handleAddtoCart = () => {
    if (!(quantity > 0)) {
      toast.error("Please select a valid quantity", { duration: 1000 });
      return;
    }
    setBtnDisabled(true);
    dispatch(addToCart({
      productId: productId,
      quantity,
      category: selectedProduct.category,
      collections: selectedProduct.collections,
      guestId,
      userId: user?._id,
    }))
      .then(() => {
        toast.success("Product added to cart", { duration: 1000 });
      })
      .finally(() => {
        setBtnDisabled(false);
      });
  };

  useEffect(() => {
    if (!productId) return;
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://suvarnarup-ecommerce.imcc.com/api/products/${productId}`);
        setSelectedProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [productId]);

  if (!selectedProduct) return <p>Loading...</p>;

  const imageUrl = getImageUrl(selectedProduct.img) || "/placeholder.jpg";

  return (
    <div className='p-4 sm:p-6'>
      <div className='max-w-6xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-lg'>
        <div className='flex flex-col lg:flex-row gap-6 lg:gap-10'>
          {/* Product Image */}
          <div className='lg:w-1/2'>
            <img
              src={selectedProduct?.img ? getImageUrl(selectedProduct.img) : '/placeholder.jpg'}
              alt={selectedProduct?.name}
              className='w-full h-auto object-cover rounded-lg'
            />
          </div>
          
          {/* Product Details */}
          <div className='lg:w-1/2'>
            <h1 className='text-xl sm:text-2xl md:text-3xl font-semibold mb-2'>{selectedProduct?.name}</h1>
            <p className='text-base sm:text-lg text-gray-600 mb-1 line-through'>₹{selectedProduct?.price}</p>
            <p className='text-lg sm:text-xl text-gray-500 mb-2'>₹{selectedProduct?.discountPrice}</p>
            <p className='text-sm sm:text-base text-gray-600 mb-2'>{selectedProduct?.category}</p>
            <p className='text-sm sm:text-base text-gray-600 mb-4'>{selectedProduct?.collections}</p>

            {/* Quantity Controls */}
            <div className='mb-6'>
              <p className='text-gray-700 text-sm sm:text-base mb-2'>Quantity</p>
              <div className='flex items-center space-x-4'>
                <button
                  className='px-3 py-2 bg-gray-200 rounded text-lg hover:bg-gray-300 transition-colors'
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                >
                  -
                </button>
                <span className='text-lg font-medium min-w-[40px] text-center'>{quantity}</span>
                <button
                  className='px-3 py-2 bg-gray-200 rounded text-lg hover:bg-gray-300 transition-colors'
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddtoCart}
              className={`py-3 px-6 rounded-lg w-full mb-4 text-sm sm:text-base font-medium transition-colors ${
                isBtnDisabled 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-black text-white hover:bg-gray-800"
              }`}
              disabled={isBtnDisabled}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productdetails;

