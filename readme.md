[![ivx](https://circleci.com/gh/ivx/react-skeletons.svg?style=shield)](https://app.circleci.com/pipelines/github/ivx/react-skeletons)
[![npm](https://img.shields.io/npm/v/@invisionag/react-skeletons)](https://www.npmjs.com/package/@invisionag/react-skeletons)
[![David](https://img.shields.io/david/ivx/react-skeletons)](https://www.npmjs.com/package/@invisionag/react-skeletons)

# react-skeletons

A storybook is deployed under https://ivx.github.io/react-skeletons/

### Summary

react-skeletons consists of two components:

- A hook to easily extend your components with loading animations
- A prestyled skeleton component to use in your application

#### `useSkeleton` hook

The hook can be used in components that _control_ loading state as well as in components that _display_ loading state. It automatically communicates loading state down the render tree via contexts.
You tell the hook during initialization whether you want to set a new loading condition or just register a loading layout and then wrap the components return value in the hooks response (see Example)

#### `Skeleton` component

The component is straightforward. It's a `div` element with a skeleton animation. It is built with styled components and extendable.

Props:

- `width`: Allows to set the css value for width directly as a prop
- `height`: Allows to set the css value for height directly as a prop

### Example

#### Encapsulated in a single component

```jsx
import React from 'react';
import { useSkeleton, Skeleton } from '@invisionag/react-skeletons';

const LoadableComponent = () => {
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);

  const { withSkeleton } = useSkeleton({
    isLoading,
    Skeleton: () => <Skeleton width="200px" height="24px" />,
  });

  React.useEffect(() => {
    fetch('example.com').then((data) => {
      setData(data);
      setIsLoading(false);
    });
  }, []);

  return withSkeleton(<p>{data}</p>);
};
```

#### Spread over several components

You can use the hook to control a loading state in a controlling component high up in the tree and then use the hook again in your "dumb" components just to register a skeleton layout. They will use the loading state in their closest parent.

```jsx
import React from 'react';
import { useSkeleton, Skeleton } from '@invisionag/react-skeletons';

const App = () => {
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);

  const { withSkeleton } = useSkeleton({
    isLoading,
  });

  React.useEffect(() => {
    fetch('example.com').then((data) => {
      setData(data);
      setIsLoading(false);
    });
  }, []);

  return withSkeleton(
    <div>
      <Text>{data}</Text>
      <Button>Save</Button>
    </div>,
  );
};

const Text = ({ children, ...rest }) => {
  const { withSkeleton } = useSkeleton({
    Skeleton: () => <Skeleton width="200px" height="24px" />,
  });

  return withSkeleton(<p {...rest}>{children}</p>);
};

const Button = ({ children, ...rest }) => {
  const { withSkeleton } = useSkeleton({
    Skeleton: () => <Skeleton width="120px" height="30px" />,
  });

  return withSkeleton(<button {...rest}>{children}</button>);
};
```
