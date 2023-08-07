import React, { useState } from 'react';
import { Box, Image, NativeBaseProvider } from 'native-base';
import { useSelector } from 'react-redux';

const Photos = () => {
  const photos = useSelector((state) => state.photos.photos);
  return (
    <Box>
      {photos.map((item) => {
        return (
          <Image
            key={item.id}
            alt='image of Mars'
            source={{ uri: item.img_src }}
            size='md'
          />
        );
      })}
    </Box>
  );
};

export default Photos;
