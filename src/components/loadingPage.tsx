import React from 'react'
import Lottie from 'react-lottie-player';
import animationData from '../../public/animation/Animation - 1730129529264.json';

function LoadingPage() {
  return (
    <Lottie
      loop
      animationData={animationData}
      play
      style={{ width: 500, height: 750 }}
    />
  );
}

export default LoadingPage