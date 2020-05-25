import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SkeletonContext, useSkeleton } from '.';
import { useContext } from 'react';

const TextWithSkeleton: React.FC<{ isLoading?: boolean }> = ({
  isLoading,
  children,
  ...rest
}) => {
  const { withSkeleton } = useSkeleton({
    isLoading,
    Skeleton: () => (
      <div>
        <p>Loading...</p>
        {children}
      </div>
    ),
  });

  return withSkeleton(<p {...rest}>Loaded content</p>);
};

const TextWithoutSkeleton: React.FC<{ isLoading?: boolean }> = ({
  isLoading,
  children,
  ...rest
}) => {
  const { withSkeleton } = useSkeleton({ isLoading });

  return withSkeleton(
    <div>
      <p {...rest}>Loaded content</p>
      {children}
    </div>,
  );
};

const ExamplePage: React.FC<{
  isLoading?: boolean | ((prevIsLoading: boolean) => boolean);
}> = ({ isLoading, children, ...rest }) => {
  const { withSkeleton } = useSkeleton({ isLoading });

  return withSkeleton(<div {...rest}>{children}</div>);
};

describe('useSkeleton', () => {
  describe('when isLoading and Layout was passed', () => {
    it('renders regular layout when isLoading condition is false', () => {
      const { getByText, queryByText } = render(
        <TextWithSkeleton isLoading={false} />,
      );

      expect(getByText('Loaded content')).toBeInTheDocument();
      expect(queryByText('Loading...')).not.toBeInTheDocument();
    });

    it('renders skeleton layout when isLoading condition is true', () => {
      const { getByText, queryByText } = render(<TextWithSkeleton isLoading />);

      expect(queryByText('Loaded content')).not.toBeInTheDocument();
      expect(getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('when only isLoading was passed', () => {
    it('renders regular layout when isLoading condition is false', () => {
      const { getByText } = render(<TextWithoutSkeleton isLoading={false} />);

      expect(getByText('Loaded content')).toBeInTheDocument();
    });

    it('renders regular layout when isLoading condition is true', () => {
      const { getByText } = render(<TextWithoutSkeleton isLoading={false} />);

      expect(getByText('Loaded content')).toBeInTheDocument();
    });

    it('creates and updates skeleton context', () => {
      const ContextConsumer = () => {
        const value = useContext<boolean>(SkeletonContext);

        return <span>Skeleton context value: {value.toString()}</span>;
      };
      const { getByText, rerender } = render(
        <TextWithoutSkeleton isLoading={true}>
          <ContextConsumer />
        </TextWithoutSkeleton>,
      );

      expect(getByText('Skeleton context value: true')).toBeInTheDocument();

      rerender(
        <TextWithoutSkeleton isLoading={false}>
          <ContextConsumer />
        </TextWithoutSkeleton>,
      );

      expect(getByText('Skeleton context value: false')).toBeInTheDocument();
    });
  });

  describe('when only Layout was passed', () => {
    it('renders skeleton layout when a skeleton context above has a truthy value', () => {
      const { getByText, queryByText } = render(
        <ExamplePage isLoading={true}>
          <TextWithSkeleton />
        </ExamplePage>,
      );

      expect(queryByText('Loaded content')).not.toBeInTheDocument();
      expect(getByText('Loading...')).toBeInTheDocument();
    });

    it('renders skeleton layout when a skeleton context above has a truthy value and nested deeply', () => {
      const { getByText, queryByText } = render(
        <ExamplePage isLoading={true}>
          <div>
            <div>
              <div>
                <TextWithSkeleton />
              </div>
            </div>
          </div>
        </ExamplePage>,
      );

      expect(queryByText('Loaded content')).not.toBeInTheDocument();
      expect(getByText('Loading...')).toBeInTheDocument();
    });

    it('renders regular layout when a skeleton context above has a falsy value', () => {
      const { getByText, queryByText } = render(
        <ExamplePage isLoading={false}>
          <TextWithSkeleton />
        </ExamplePage>,
      );

      expect(getByText('Loaded content')).toBeInTheDocument();
      expect(queryByText('Loading...')).not.toBeInTheDocument();
    });

    it('renders regular layout when no skeleton context was found', () => {
      const { getByText, queryByText } = render(
        <ExamplePage>
          <TextWithSkeleton />
        </ExamplePage>,
      );

      expect(getByText('Loaded content')).toBeInTheDocument();
      expect(queryByText('Loading...')).not.toBeInTheDocument();
    });

    it('creates no context', () => {
      const ContextConsumer = () => {
        const value = useContext<boolean>(SkeletonContext);

        return <span>Skeleton context value: {value.toString()}</span>;
      };
      const { getByText } = render(
        <TextWithoutSkeleton>
          <ContextConsumer />
        </TextWithoutSkeleton>,
      );

      expect(getByText('Skeleton context value: false')).toBeInTheDocument();
    });
  });

  it('allows to extend "isLoading" by passing a fucntion', () => {
    const ContextConsumer = () => {
      const value = useContext<boolean>(SkeletonContext);

      return <span>Skeleton context value: {value.toString()}</span>;
    };

    const { getByText, rerender } = render(
      <ExamplePage isLoading={false}>
        <ExamplePage isLoading={(prevIsLoading) => !prevIsLoading}>
          <ContextConsumer />
        </ExamplePage>
      </ExamplePage>,
    );

    expect(getByText('Skeleton context value: true')).toBeInTheDocument();

    rerender(
      <ExamplePage isLoading={true}>
        <ExamplePage isLoading={(prevIsLoading) => !prevIsLoading}>
          <ContextConsumer />
        </ExamplePage>
      </ExamplePage>,
    );

    expect(getByText('Skeleton context value: false')).toBeInTheDocument();
  });
});
