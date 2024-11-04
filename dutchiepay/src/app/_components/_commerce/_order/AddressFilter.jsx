import '@/styles/commerce.css';
import '@/styles/globals.css';

export default function AddressFilter({
  deliveryAddress,
  selectedAddress,
  setSelectedAddress,
}) {
  return (
    deliveryAddress &&
    deliveryAddress.length !== 0 && (
      <ul className="flex gap-[8px] text-xs font-medium">
        {deliveryAddress.map((item, key) => (
          <li
            className={`hover:text-blue--500 ${selectedAddress === item.addressName ? 'text-blue--500' : ''}`}
            key={key}
            onClick={() => setSelectedAddress(item.addressName)}
          >
            {item.addressName}
          </li>
        ))}
        <li
          className={`text-gray--500 hover:text-blue--500 ${selectedAddress === '직접입력' ? '!text-blue--500' : ''}`}
          onClick={() => setSelectedAddress('직접입력')}
        >
          직접입력
        </li>
      </ul>
    )
  );
}
