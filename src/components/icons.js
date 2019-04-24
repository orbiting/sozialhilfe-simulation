import React from 'react'
import theme from './theme'

export const Media = (props) =>
  <svg stroke={0} fill="#000" strokeWidth={0} viewBox="0 0 24 24"
       {...props}
       xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z"></path>
  </svg>

export const Leisure = (props) =>
  <svg stroke={0} fill="#000" strokeWidth={0} viewBox="0 0 24 24"
       {...props}
       xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path>
  </svg>

export const Mobility = (props) =>
  <svg stroke={0} fill="#000" strokeWidth={0} viewBox="0 0 24 24"
       {...props}
       xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2c-4.42 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-6H6V6h5v5zm5.5 6c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6h-5V6h5v5z"></path>
  </svg>

export const Clothing = (props) =>
  <svg stroke={0} fill="#000" strokeWidth={0} viewBox="0 0 24 24"
       {...props}
       xmlns="http://www.w3.org/2000/svg">
    <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"></path>
  </svg>

export const Avatar = (props) =>
  <svg stroke={0} fill="#000" strokeWidth={0} viewBox="0 0 24 24"
       {...props}
       xmlns="http://www.w3.org/2000/svg">
    <path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z"></path>  
  </svg>

export const Wallet = (props) =>
  <svg stroke={0} fill="#000" strokeWidth={0} viewBox="0 0 24 24"
       {...props}
       xmlns="http://www.w3.org/2000/svg">
    <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path>
  </svg>

export const Calendar = (props) =>
  <svg stroke={0} fill="#000" strokeWidth={0} viewBox="0 0 24 24"
       {...props}
       xmlns="http://www.w3.org/2000/svg">
    <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"></path>
  </svg>

export default {
  media: {
    color: theme.categories.media,
    Icon: Media
  },
  leisure: {
    color: theme.categories.leisure,
    Icon: Leisure
  },
  clothing: {
    color: theme.categories.clothing,
    Icon: Clothing
  },
  mobility: {
    color: theme.categories.mobility,
    Icon: Mobility
  },
}
