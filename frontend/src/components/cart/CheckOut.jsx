import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PayPalBtn from './PayPalBtn';
import { createCheckout } from '../../redux/slices/checkOutSlice';
import { clearCart } from '../../redux/slices/cartSlice';

const CheckOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const { user } = useSelector((state) => state.auth);

  const { loading } = useSelector((state) => state.checkout);

  const [checkoutId, setCheckoutID] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phno: ''
  });

  const validateShippingAddress = () => {
    const requiredFields = ['firstName', 'lastName', 'address', 'city', 'postalCode', 'country', 'phno'];
    const emptyFields = requiredFields.filter(field => !shippingAddress[field]);

    if (emptyFields.length > 0) {
      throw new Error(`Please fill in all required fields: ${emptyFields.join(', ')}`);
    }

    if (!/^[A-Za-z0-9\s\-]{4,10}$/.test(shippingAddress.postalCode)) {
      throw new Error('Please enter a valid postal code');
    }

    if (!/^\+?[0-9\s\-]{7,15}$/.test(shippingAddress.phno)) {
      throw new Error('Please enter a valid phone number');
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    try {
      if (!cart.products?.length) {
        throw new Error('Your cart is empty. Please add items before checkout.');
      }

      validateShippingAddress();
      setCheckoutID('ready'); // Set to ready state for payment
    } catch (error) {
      console.error('Checkout error:', error);
      alert(error.message || 'Please fill in all required fields correctly.');
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      console.log('Payment successful:', details);
      
      // Create order directly after successful payment
      const orderData = {
        user: user._id,
        orderItem: cart.products.map(product => ({
          productID: product.productId || product._id,
          name: product.name,
          image: Array.isArray(product.img) && product.img.length > 0 ? product.img[0] : product.img || '',
          price: product.price,
          quantity: product.quantity
        })),
        shippingAddress,
        paymentMethod: 'PayPal',
        totalPrice: cart.totalPrice,
        isPaid: true,
        paidAt: new Date(),
        isDeliverd: false,
        paymentStatus: 'paid',
        paymentDetails: details
      };

      // Create order directly
      const orderResponse = await fetch('http://suvarnarup-ecommerce.imcc.com/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        },
        body: JSON.stringify(orderData)
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.message || 'Failed to create order');
      }

      const createdOrder = await orderResponse.json();
      console.log('Order created successfully:', createdOrder);
      
      // Clear cart after successful order
      dispatch(clearCart());
      
      navigate('/orderconfirmationpage');
    } catch (error) {
      console.error('Payment processing error:', error);
      alert(`Payment successful but order creation failed: ${error.message}`);
    }
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 tracking-tighter'>
      {/* Left Section */}
      <div className='bg-white rounded p-6'>
        <h2 className='text-2xl uppercase mb-6'>Checkout</h2>
        <form onSubmit={handleCheckout}>
          <h3 className='text-lg mb-4'>Contact Details</h3>
          <div className='mb-4'>
            <label className='block text-gray-700'>Email</label>
            <input
              type='email'
              value={user?.email || ''}
              className='w-full p-2 border rounded'
              disabled
            />
          </div>
          <h3 className='text-lg mb-4'>Delivery</h3>
          <div className='mb-4 grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-gray-700'>First Name</label>
              <input
                type='text'
                value={shippingAddress.firstName}
                onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                className='w-full p-2 border rounded'
                required
              />
            </div>
            <div>
              <label className='block text-gray-700'>Last Name</label>
              <input
                type='text'
                value={shippingAddress.lastName}
                onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                className='w-full p-2 border rounded'
                required
              />
            </div>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Address</label>
            <input
              type='text'
              value={shippingAddress.address}
              onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
              className='w-full p-2 border rounded'
              required
            />
          </div>
          <div className='mb-4 grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-gray-700'>City</label>
              <input
                type='text'
                value={shippingAddress.city}
                onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                className='w-full p-2 border rounded'
                required
              />
            </div>
            <div>
              <label className='block text-gray-700'>Postal Code</label>
              <input
                type='text'
                value={shippingAddress.postalCode}
                onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                className='w-full p-2 border rounded'
                required
              />
            </div>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Country</label>
            <input
              type='text'
              value={shippingAddress.country}
              onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
              className='w-full p-2 border rounded'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Phone Number</label>
            <input
              type='text'
              value={shippingAddress.phno}
              onChange={(e) => setShippingAddress({ ...shippingAddress, phno: e.target.value })}
              className='w-full p-2 border rounded'
              required
            />
          </div>
          <div className='mt-6'>
            {!checkoutId ? (
              <button
                type='submit'
                className='w-full bg-black text-white py-3 rounded disabled:opacity-50'
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Continue To Pay'}
              </button>
            ) : (
              <div>
                <h3 className='text-lg mb-4'>Pay with PayPal</h3>
                <PayPalBtn
                  amount={cart.totalPrice || 0}
                  onSuccess={handlePaymentSuccess}
                  onError={() => alert('Payment Failed. Try again.')}
                />
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Right Section - Order Summary */}
      <div className='bg-gray-50 p-6 rounded-lg'>
        <h3 className='text-lg mb-4'>Order Summary</h3>
        <div className='border-t py-4 mb-4'>
          {cart?.products?.map((product, index) => (
            <div key={index} className='flex items-start justify-between py-2 border-b'>
              <div className='flex items-start'>
                <img src={product.img} alt={product.name} className='w-20 h-24 object-cover mr-4' />
                <div>
                  <h3 className='text-md'>{product.name}</h3>
                  <p className='text-gray-500'>Quantity: {product.quantity}</p>
                </div>
              </div>
              <p className='text-xl'>${product.price?.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className='flex justify-between items-center text-lg mb-4'>
          <p>Subtotal</p>
          <p>${cart.totalPrice?.toLocaleString() || 0}</p>
        </div>
        <div className='flex justify-between items-center text-lg'>
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className='flex justify-between items-center text-lg mt-4 border-t pt-4'>
          <p>Total</p>
          <p>${cart.totalPrice?.toLocaleString() || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
