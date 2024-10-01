import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addresses: [],
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    addAddress(state, action) {
      if (state.addresses.length < 5) {
        state.addresses.push(action.payload);
      } else {
        console.log('최대 5개의 주소만 저장 가능합니다.');
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

export const { addAddress, updateAddress, removeAddress } =
  addressSlice.actions;
export default addressSlice.reducer;
