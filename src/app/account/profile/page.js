'use client';

import { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PlusCircle, MapPin, Trash2 } from 'lucide-react';
import AddressCard from '@/components/user/AddressCard';
import AddressForm from '@/components/user/AddressForm';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import { addAddress, editAddress, deleteAddress, setPrimaryAddress } from '@/redux/slices/ProfileSlice';
import OrderHistory from '@/components/user/OrderHistory';

function AddressManagement() {
  const dispatch = useDispatch();
  const { addresses, primaryAddressId } = useSelector((state) => state.profile);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [deletingAddressId, setDeletingAddressId] = useState(null);

  const handleOpenForm = (address = null) => {
    setEditingAddress(address);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setEditingAddress(null);
    setIsFormOpen(false);
  };

  const handleFormSubmit = (formData) => {
    if (editingAddress) {
      dispatch(editAddress({ id: editingAddress.id, ...formData }));
    } else {
      dispatch(addAddress(formData));
    }
    handleCloseForm();
  };

  const handleDelete = (id) => {
    setDeletingAddressId(id);
  };

  const confirmDelete = () => {
    if (deletingAddressId) {
      dispatch(deleteAddress(deletingAddressId));
      setDeletingAddressId(null);
    }
  };

  const handleSetPrimary = (id) => {
    dispatch(setPrimaryAddress(id));
  };

  return (
    <Fragment>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <MapPin size={20} />
          Saved Addresses
        </h2>
        <button
          onClick={() => handleOpenForm()}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
        >
          <PlusCircle size={18} />
          Add Address
        </button>
      </div>

      {addresses && addresses.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {addresses.map((addr) => (
            <AddressCard
              key={addr.id}
              address={addr}
              isPrimary={addr.id === primaryAddressId}
              onEdit={() => handleOpenForm(addr)}
              onDelete={() => handleDelete(addr.id)}
              onSetPrimary={() => handleSetPrimary(addr.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg bg-gray-50">
          <MapPin className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No addresses saved yet.</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding a new address.</p>
        </div>
      )}

      {isFormOpen && (
        <AddressForm initialData={editingAddress} onSubmit={handleFormSubmit} onCancel={handleCloseForm} />
      )}

      {deletingAddressId && (
        <ConfirmDialog
          title="Delete Address?"
          message="Are you sure you want to delete this address? This action cannot be undone."
          onConfirm={confirmDelete}
          onCancel={() => setDeletingAddressId(null)}
          icon={<Trash2 className="text-red-500" size={24} />}
        />
      )}
    </Fragment>
  );
}

export default function ProfilePage() {
  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
      <AddressManagement />
      <hr />
      <OrderHistory />
    </div>
  );
}
