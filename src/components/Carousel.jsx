import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import './carousel.modules.css';
// import { NftCardDirect } from 'components';

import { products } from '../constants';

const Carousel = () => {
  const [width, setWidth] = useState(0);
  const innerCarouselRef = useRef();

  function handleClick(direction) {
    // width of NftCard + container's gap = 177px + 2rem (32px) = 209px
    let distance = innerCarouselRef.current.getBoundingClientRect().x - 209;

    if (direction === 'left') {
      innerCarouselRef.current.style.transform = `translateX(${
        386 + distance
      }px)`;
    }

    if (direction === 'right') {
      innerCarouselRef.current.style.transform = `translateX(${
        -209 + distance
      }px)`;
    }
  }

  useEffect(() => {
    //width of what's shown on the screen = carouselRef.current.offsetWidth
    //width of the whole carousel = carouselRef.current.scrollWidth
    setWidth(
      innerCarouselRef.current.scrollWidth -
        innerCarouselRef.current.offsetWidth
    );
  }, []);

  // return (
  // 	<div className="carousel" >
  //         <BsChevronLeft
  // 				className="arrow left"
  // 				// onClick={() => handleClick("left")}
  //         />
  //         <motion.div className="track" whileTap={{cursor:"grabbing"}} ref={carouselRef}>
  //         <motion.div
  // 			drag="x"
  // 			dragConstraints={{right: 0, left: -width}}
  // 			className="inner-carousel"
  // 		>
  // 			{list?.map((item) => (
  // 				<motion.div className="item" key={item._id}>
  // 					<NftCardDirect product={item} />
  // 				</motion.div>
  // 			))}
  // 		</motion.div>
  //         </motion.div>

  //         <BsChevronRight
  // 				className="arrow right"
  // 				// onClick={() => handleClick("right")}
  // 			/>
  // 	</div>
  // );

  return (
    <div className="carousel">
      <BsChevronLeft
        className="arrow left"
        onClick={() => handleClick('left')}
      />
      <motion.div className="track">
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          whileTap={{ cursor: 'grabbing' }}
          className="inner-carousel"
          ref={innerCarouselRef}
        >
          {products &&
            products?.map((item, idx) => (
              <motion.div className="item" key={idx}>
                <img className="w-[1024px] h-[685px]" alt="" src={item?.link} />

                {/* <NftCardDirect product={item} /> */}
              </motion.div>
            ))}
        </motion.div>
      </motion.div>

      <BsChevronRight
        className="arrow right"
        onClick={() => handleClick('right')}
      />
    </div>
  );
};

export default Carousel;
