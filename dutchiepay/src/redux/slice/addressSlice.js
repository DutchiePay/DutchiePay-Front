import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addresses: [],
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddresses(state, action) {
      if (Array.isArray(action.payload) && action.payload.length <= 5) {
        state.addresses = action.payload;
      }
    },
    addAddress(state, action) {
      if (state.addresses.length < 5) {
        state.addresses.push(action.payload);
      }
    },
    updateAddress(state, action) {
      const { index, address } = action.payload;
      if (index >= 0 && index < state.addresses.length) {
        state.addresses[index] = address;
      }
    },
    removeAddress(state, action) {
      const index = action.payload;
      if (index >= 0 && index < state.addresses.length) {
        state.addresses.splice(index, 1);
      }
    },
  },
});

export const { setAddresses, addAddress, updateAddress, removeAddress } =
  addressSlice.actions;
export default addressSlice.reducer;
