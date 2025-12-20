"use client"
import React from 'react'
import { Provider } from 'react-redux';
import { store } from './ReduxToolkit/store';
import Header from "./commanComponents/Header";
import Footer from "./commanComponents/Footer";

export default function MainLoyout({ children }) {
    return (
        <>
            <Provider store={store}>
                <Header />
                {children}
                <Footer />
            </Provider>
        </>
    )
}
