import React from 'react';
import styled from 'styled-components';
import { Skeleton } from './Skeleton';

const AvatarSkeleton = styled(Skeleton)`
  display: inline-block;
`;
const InlineSkeleton = styled(Skeleton)`
  display: inline-block;
`;

const HSpacer = styled.div`
  display: inline-block;
  width: 0.5em;
  height: 0.5em;
`;

const VSpacer = styled.div`
  height: 0.5em;
`;

const Card = styled.div`
  border: 3px solid paleturquoise;
  border-radius: 15px;
  padding: 15px;
  width: 200px;
`;

export default {
  title: 'Skeleton',
  parameters: {
    info: { inline: true },
  },
};

export const Composition = () => (
  <Card>
    <AvatarSkeleton width="40px" height="40px" />
    <HSpacer />
    <InlineSkeleton width="150px" height="24px" />
    <VSpacer />
    <Skeleton width="200px" height="1em" />
    <Skeleton width="200px" height="1em" />
    <Skeleton width="115px" height="1em" />
  </Card>
);

export const Simple = () => <Skeleton width="200px" height="50px" />;
