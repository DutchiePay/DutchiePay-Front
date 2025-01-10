export default function Company({
  company,
  representative,
  storeAddress,
  contactNumber,
}) {
  return (
    <>
      <strong>판매자 정보</strong>
      <table className="w-full mt-[16px] text-sm">
        <tbody className="block">
          <tr className="border-t border-b border-gray-300 mb-[4px] flex">
            <th className="bg-gray-100 w-44 px-[12px] py-1 border-gray-300 font-bold text-left">
              상호명
            </th>
            <td className="w-72 px-[12px] py-1 text-gray--300 text-semibold">
              {company}
            </td>
            <th className="bg-gray-100 w-44 px-[12px] py-1 border-gray-300 font-bold text-left">
              대표자
            </th>
            <td className="w-72 px-[12px] py-1 text-gray--300 text-semibold">
              {representative}
            </td>
          </tr>
          <tr className="border-t border-b border-gray-300 mb-4 flex">
            <th className="bg-gray-100 w-44 px-[12px] py-1 border-gray-300 font-bold text-left">
              업체주소
            </th>
            <td className="w-72 px-[12px] py-1 text-gray--300 text-semibold">
              {storeAddress}
            </td>
            <th className="bg-gray-100 w-44 px-[12px] py-1 border-gray-300 font-bold text-left">
              전화번호
            </th>
            <td className="w-72 px-[12px] py-1 text-gray--300 text-semibold">
              {contactNumber}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
