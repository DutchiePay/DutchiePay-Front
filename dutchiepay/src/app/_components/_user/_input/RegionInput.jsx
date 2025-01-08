'use client';

import getLocation from '@/app/_util/getLocation';
import { useEffect } from 'react';

export default function RegionInput({ address, setAddress }) {
  useEffect(() => {
    const fetchLocation = async () => {
      const location = await getLocation();
      setAddress(location);
    };

    fetchLocation();
  }, [setAddress]);

  return (
    <>
      <label className="text-lg font-bold">우리동네</label>
      <div className="flex relative mb-[20px]">
        <input
          disabled
          className="w-full border border-gray--200 py-[12px] px-[16px] rounded outline-none mt-[4px] placeholder:text-sm bg-gray--100"
          value={address}
          type="text"
        />
      </div>
    </>
  );
}
