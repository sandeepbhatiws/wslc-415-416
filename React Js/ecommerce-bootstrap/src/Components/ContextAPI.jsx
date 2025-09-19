import React, { createContext, useState } from 'react'
import { toast } from 'react-toastify';

const Context = createContext();

export default function ContextAPI({ children }) {

    const totalCartItems =  JSON.parse(localStorage.getItem('cartItems'));
    const [cartItems, setCartItems] = useState(totalCartItems ?? []);
    const [isLogin, setIsLogin] = useState(false);

    const addToCart = (productDetails) => {

        var checkProduct = cartItems.filter((v,i) => {
            if(v.id == productDetails.id){
                return v;
            }
        })

        if(checkProduct.length > 0){
            const finalData = cartItems.map((v,i) => {
                if(v.id == productDetails.id){
                    v.quantity++;
                    return v;
                } else {
                    return v;
                }
            })

            console.log(finalData);
            setCartItems(finalData);
            localStorage.setItem('cartItems', JSON.stringify(finalData));
            toast.success('Update cart succussfully !');
        } else {
            const data = {
                id : productDetails.id,
                name : productDetails.name,
                image : productDetails.image,
                price : productDetails.price,
                quantity : 1,
                description : productDetails.description,
            }

            const finalData = [data, ...cartItems];
            setCartItems(finalData);
            localStorage.setItem('cartItems', JSON.stringify(finalData));
            toast.success('Add to cart succussfully !');
        }        

        // console.log(finalData);
    }


    const data = {cartItems, setCartItems, isLogin, addToCart}

  return (
    <>
    <Context.Provider value={ data }>
        {children}
    </Context.Provider>
    </>
  )
}

export {Context}