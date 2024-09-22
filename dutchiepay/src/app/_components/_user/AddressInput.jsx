'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

import { useEffect, useState } from 'react';

import getLocation from '@/app/_components/_user/GetLocation';

export default function AddressInput({ address, setAddress }) {
  useEffect(() => {
    const fetchLocation = async () => {
      const location = await getLocation();
      setAddress(location);
    };

    fetchLocation();
  }, []);

  return (
    <>
      <label className="user__label">우리동네</label>
      <div className="flex relative mb-[20px]">
        <input
          disabled
          className="user__input mt-[4px] bg-gray--100"
          value={address}
          type="text"
        />
      </div>
    </>
  );
}
