import * as React from 'react';
import { boolean } from '@storybook/addon-knobs';
import { useSkeleton } from './useSkeleton';
import { Skeleton } from './Skeleton';

export default {
  title: 'Example',
  parameters: {
    info: { inline: true },
  },
};

const Text: React.FC<{ isLoading?: boolean }> = ({
  isLoading,
  children,
  ...rest
}) => {
  const { withSkeleton } = useSkeleton({
    isLoading,
    Skeleton: () => <Skeleton width="180px" height="20px" />,
  });

  return withSkeleton(<span {...rest}>Loaded content</span>);
};

const Page: React.FC<{ isLoading?: boolean }> = ({
  isLoading,
  children,
  ...rest
}) => {
  const { withSkeleton } = useSkeleton({ isLoading });

  return withSkeleton(
    <div {...rest}>
      <p>Click the "isLoading" knob to change loading states</p>
      {children}
    </div>,
  );
};

export const Default = () => (
  <Page isLoading={boolean('isLoading', true)}>
    <Text />
  </Page>
);
