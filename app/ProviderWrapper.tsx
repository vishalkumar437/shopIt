"use client";
import React from 'react'
import { Provider } from 'react-redux'
import store from './store/store'

export default function ProviderWrapper({children}:any) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}
