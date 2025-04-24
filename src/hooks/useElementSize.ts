import { useState, useEffect, RefObject } from 'react';
import useResizeObserver from '@react-hook/resize-observer';

interface Size {
  width: number;
  height: number;
}

export const useElementSize = (target: RefObject<HTMLElement>): Size => {
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (target.current) {
      setSize({
        width: target.current.clientWidth,
        height: target.current.clientHeight,
      });
    }
  }, [target]);

  useResizeObserver(target, (entry) => {
    const { width, height } = entry.contentRect;
    setSize({ width, height });
  });

  return size;
};