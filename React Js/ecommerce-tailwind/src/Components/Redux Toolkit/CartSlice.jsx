import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

var cartData = localStorage.getItem('cartItems');
var cartData = JSON.parse(cartData);

const initialState = {
  cartItems: cartData ?? [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    addToCart: (state, action) => {
      console.log(state.cartItems);
      console.log(action.payload);


      var checkProduct = state.cartItems.filter((v, i) => {
        if (v.id == action.payload.id) {
          return v;
        }
      })

      if (checkProduct.length > 0) {
        const finalData = state.cartItems.map((v, i) => {
          if (v.id == action.payload.id) {
            v.quantity++;
            return v;
          } else {
            return v;
          }
        })

        state.cartItems = finalData;
        localStorage.setItem('cartItems', JSON.stringify(finalData));
        toast.success('Update cart succussfully !');
      } else {
        const data = {
          id: action.payload.id,
          name: action.payload.name,
          image: action.payload.image,
          price: action.payload.price,
          quantity: 1,
          description: action.payload.description,
        }

        const finalData = [data, ...state.cartItems];
        state.cartItems = finalData;
        localStorage.setItem('cartItems', JSON.stringify(finalData));
        toast.success('Add to cart succussfully !');
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToCart } = cartSlice.actions

export default cartSlice.reducer