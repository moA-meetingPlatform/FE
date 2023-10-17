'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper/modules';
import Image from 'next/image';

export default function MainPageSwiper() {
  return (
    <div >
      <Swiper
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image src="/images/moa1.png" width={1920} height={1080} alt='moa' objectFit="cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/images/moa2.png" width={1920} height={1080} alt='moa' objectFit="cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/images/moa3.png" width={1920} height={1080} alt='moa' objectFit="cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/images/moa4.png" width={1920} height={1080} alt='moa' objectFit="cover" />
        </SwiperSlide>

      </Swiper>
    </div>
  )
}
