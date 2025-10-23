import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

var cartData = localStorage.getItem('cartItems');
var cartData = JSON.parse(cartData);

var cartData = [];

const initialState = {
  cartItems: cartData ?? [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state, action) => {
      const finalData = state.cartItems.map((v, i) => {
        if (v.id == action.payload) {
          v.quantity++;
          return v;
        } else {
          return v;
        }
      })

      state.cartItems = finalData;
      localStorage.setItem('cartItems', JSON.stringify(finalData));
    },
    decrement: (state, action) => {
      const finalData = state.cartItems.map((v, i) => {
        if (v.id == action.payload && v.quantity > 1) {
          v.quantity--;
          return v;
        } else {
          return v;
        }
      })

      state.cartItems = finalData;
      localStorage.setItem('cartItems', JSON.stringify(finalData));
    },
    removeCart: (state, action) => {
      if (confirm('Are you sure you want to delete ?')) {
        const finalData = state.cartItems.filter((v, i) => {
          if (v.id == action.payload) {

          } else {
            return v;
          }
        })

        state.cartItems = finalData;
        localStorage.setItem('cartItems', JSON.stringify(finalData));
      }
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
export const { addToCart, increment, decrement, removeCart } = cartSlice.actions

export default cartSlice.reducer