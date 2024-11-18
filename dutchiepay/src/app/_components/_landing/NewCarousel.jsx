import '@/styles/commerce.css';
import '@/styles/globals.css';

import Product_Main from './MainProduct';
import Slider from 'react-slick';

export default function NewCarousel({ newProduct }) {
  const settings = {
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
  };

  return (
    <section className="w-full mx-auto my-0">
      <h2 className="main__title">최근 공구가 시작됐어요!</h2>
      <div className="mt-[8px] flex justify-between">
        <Slider className="w-[1022px] mx-auto " {...settings}>
          {newProduct.map((item, key) => {
            return <Product_Main key={key} product={item} />;
          })}
        </Slider>
      </div>
    </section>
  );
}
