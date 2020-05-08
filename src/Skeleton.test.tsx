import React from 'react';
import styled from 'styled-components';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@invisionag/jest-styled-components';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('is styleable', () => {
    const OverstyledSkeleton: React.FC = styled(Skeleton)`
      background: red;
    `;

    const { getByTestId } = render(
      <OverstyledSkeleton data-testid="skeleton" />,
    );

    expect(getByTestId('skeleton')).toHaveStyleRule('background', 'red');
  });

  it('takes width and height directly as props', () => {
    const { getByTestId } = render(
      <Skeleton data-testid="skeleton" width="200px" height="24px" />,
    );

    expect(getByTestId('skeleton')).toHaveStyleRule('width', '200px');
    expect(getByTestId('skeleton')).toHaveStyleRule('height', '24px');
  });
});
