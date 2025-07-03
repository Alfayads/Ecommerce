'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { removeItemFromCart, clearCart } from '@/redux/slices/cartSlice';
import { addAddress } from '@/redux/slices/ProfileSlice';
import { addOrder, updateOrder } from '@/redux/slices/orderSlice';
import productsData from '@/data/product';
import { Trash2 } from 'lucide-react';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import useRazorpay from '@/hooks/useRazorpay';

const CheckoutPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items: cartItems, subtotal, discountAmount, totalAmount, appliedCoupon } = useSelector((state) => state.cart);
  const { addresses, primaryAddressId } = useSelector((state) => state.profile);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  });
  const [errors, setErrors] = useState({});
  const [itemToRemove, setItemToRemove] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [saveAddress, setSaveAddress] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'cod', or 'razorpay'
  const isRazorpayLoaded = useRazorpay();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // A form is "dirty" if the user has typed in any of the fields.
  const formIsDirty = useMemo(() => {
    return Object.values(formData).some(value => value.trim() !== '');
  }, [formData]);

  useEffect(() => {
    // Pre-fill form with primary address if it exists and form is not dirty
    if (isClient && addresses && primaryAddressId && !formIsDirty) {
      const primaryAddress = addresses.find(addr => addr.id === primaryAddressId);
      if (primaryAddress) {
        setFormData(prev => ({
          ...prev,
          ...primaryAddress,
        }));
      }
    }
  }, [isClient, addresses, primaryAddressId, formIsDirty]);

  useEffect(() => {
    // This handles the user trying to refresh, close the tab, or navigate away using the browser's back/forward buttons.
    const handleBeforeUnload = (event) => {
      // Show the prompt only if the form has been changed.
      if (formIsDirty) {
        event.preventDefault();
        // Most modern browsers show a generic message and ignore this custom text.
        event.returnValue = 'Are you sure you want to leave? Your changes will be lost.';
        return event.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [formIsDirty]);

  // Create a map of products for easy lookup
  const productsMap = useMemo(() => new Map(productsData.map(p => [p.id, p])), []);

  const productForDialog = itemToRemove ? productsMap.get(itemToRemove.id) : null;

  const handleRemoveItem = (item) => setItemToRemove(item);

  const confirmRemove = () => {
    if (itemToRemove) {
      dispatch(removeItemFromCart(itemToRemove));
      setItemToRemove(null);
    }
  };

  const cancelRemove = () => setItemToRemove(null);

  const handleFormChange = (newFormData) => {
    setFormData(newFormData);
    if (Object.keys(errors).length > 0) {
      setErrors({}); // Clear errors on change
    }
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required.';
    if (!formData.address.trim()) newErrors.address = 'Address is required.';
    if (!formData.city.trim()) newErrors.city = 'City is required.';
    if (!/^\d{5}(-\d{4})?$/.test(formData.zip)) newErrors.zip = 'Invalid ZIP code.';

    if (paymentMethod === 'card') {
      if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Card number must be 16 digits.';
      if (!/^(0[1-9]|1[0-2])\s*\/\s*([2-9][0-9])$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Invalid format. Use MM / YY.';
      } else {
        const [month, year] = formData.expiryDate.split(/\s*\/\s*/);
        const expiry = new Date(`20${year}`, month, 1); // month is 0-indexed in Date
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        if (expiry < now) {
          newErrors.expiryDate = 'Card has expired.';
        }
      }
      if (!/^\d{3,4}$/.test(formData.cvc)) newErrors.cvc = 'Invalid CVC.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isNewAddress = useMemo(() => {
    if (!formData.firstName || !formData.address) return false;
    if (!addresses || addresses.length === 0) return true;
    return !addresses.some(addr => 
        addr.firstName === formData.firstName && addr.lastName === formData.lastName && addr.address === formData.address && addr.city === formData.city && addr.zip === formData.zip
    );
  }, [formData, addresses]);

  const createOrderAndRedirect = (paymentDetails = {}) => {
    if (isNewAddress && saveAddress) {
      dispatch(addAddress({
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        zip: formData.zip,
      }));
    }

    const newOrder = {
      id: `ORD-${Date.now()}`,
       date: new Date().toISOString(),
      status: 'Processing',
      subtotal: subtotal,
      discountAmount: discountAmount,
      appliedCoupon: appliedCoupon,
      total: totalAmount,
      paymentMethod: paymentMethod,
      paymentDetails,
      shippingAddress: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        zip: formData.zip,
      },
      items: cartItems.map(item => {
        const product = productsMap.get(item.id);
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          image: product.images[0],
          size: item.size,
        };
      }),
    };

    dispatch(addOrder(newOrder));
    dispatch(clearCart());
    router.push('/order-success');
  };

  const handleRazorpayOrder = () => {
    if (!isRazorpayLoaded) {
      alert('Razorpay is still loading. Please wait a moment and try again.');
      return;
    }

     // 1. Create the order with 'Pending Payment' status
    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'Pending Payment',
      subtotal: subtotal,
      discountAmount: discountAmount,
      appliedCoupon: appliedCoupon,
      total: totalAmount,
      paymentMethod: paymentMethod,
      paymentDetails: {},
      shippingAddress: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        zip: formData.zip,
      },
      items: cartItems.map(item => {
        const product = productsMap.get(item.id);
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          image: product.images[0],
          size: item.size,
        };
      }),
    };
    dispatch(addOrder(newOrder));
    dispatch(clearCart());

    const options = {
       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: totalAmount * 100, // Amount in the smallest currency unit (paise)
      currency: "INR",
      name: "Yadro Commerce",
      description: `Payment for Order #${newOrder.id}`,
      handler: (response) => {
        // On success, update the order status and redirect
        dispatch(updateOrder({ orderId: newOrder.id, updates: { status: 'Processing', paymentDetails: response } }));
        router.push('/order-success');
      },
      modal: {
        ondismiss: function() {
          // On cancellation (closing the modal), redirect to order history.
          // The order is already in 'Pending Payment' state.
          alert('Payment was not completed. Your order has been saved, and you can complete the payment from your order history.');
          router.push('/account/profile');
        }
      },
      prefill: { name: `${formData.firstName} ${formData.lastName}` },
      theme: { color: "#000000" }
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', (response) => {
      const errorPayload = response.error || {};
      dispatch(updateOrder({ orderId: newOrder.id, updates: { paymentDetails: errorPayload } }));
      
      const errorMessage = errorPayload.description || 'An unknown error occurred. Please try again.';
      alert(`Payment failed: ${errorMessage}. Your order has been saved, and you can retry payment from your order history.`);
      console.error('Razorpay Error:', errorPayload);
      router.push('/account/profile');
    });
    rzp.open();
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validateForm() || cartItems.length === 0) return;

    if (isNewAddress && saveAddress) {
      dispatch(addAddress({
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        zip: formData.zip,
      }));
    }


    if (paymentMethod === 'razorpay') {
       handleRazorpayOrder();
    } else {
      // For 'card' and 'cod'
      createOrderAndRedirect();
    }
  };

  if (!isClient) {
    // Render a placeholder on the server and during the initial client render to prevent hydration mismatch.
    // This can be a loading spinner or a skeleton screen.
    return <div className="bg-gray-50 min-h-screen" />;
  }

  if (cartItems.length === 0 && isClient) {
    // This is a fallback for if a user navigates here directly with an empty cart.
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-2xl font-semibold text-gray-700">Your cart is empty.</h1>
        <p className="text-gray-500 mt-2">Add items to your cart to proceed to checkout.</p>
        <button onClick={() => router.push('/products')} className="mt-6 bg-black text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <CheckoutForm 
            onFormSubmit={handlePlaceOrder}
            onFormChange={handleFormChange}
            formData={formData}
            errors={errors}
            isNewAddress={isNewAddress}
            saveAddress={saveAddress}
            onSaveAddressChange={setSaveAddress}
            paymentMethod={paymentMethod}
            onPaymentMethodChange={handlePaymentMethodChange}
          />
          <OrderSummary 
            onRemoveItem={handleRemoveItem}
            productsMap={productsMap}
          />
        </div>

        {itemToRemove && productForDialog && (
          <ConfirmDialog
            title="Remove from Cart?"
            message={`Are you sure you want to remove "${productForDialog.name}" (Size: ${itemToRemove.size}) from your cart?`}
            onConfirm={confirmRemove}
            onCancel={cancelRemove}
            icon={<Trash2 className="text-red-500" size={24} />}
          />
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;