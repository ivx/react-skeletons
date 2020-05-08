import * as React from 'react';
import styled, { keyframes } from 'styled-components';

export interface Props {
  width: React.CSSProperties['width'];
  height: React.CSSProperties['height'];
}

const animation = keyframes`
  0% { transform: translate3d(-100%, 0, 0); }
  100% { transform: translate3d(100%, 0, 0); }
`;

export const Skeleton = styled.div<Props>`
  position: relative;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background: #f5f6f7;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, #e9eaeb, transparent);
    animation: ${animation} 2.5s linear 0.5s infinite;
  }
`;
