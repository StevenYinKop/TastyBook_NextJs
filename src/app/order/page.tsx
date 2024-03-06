"use client";
import React from 'react'
import { useAppSelector } from '../../../lib/store'

const Order = () => {
  const cuisineList = useAppSelector(state => state.value.cuisineList);
  return (
    <div>
      {cuisineList.map(item => 
        (<li>
          {item}
        </li>)
      )}
    </div>
  )
}

export default Order