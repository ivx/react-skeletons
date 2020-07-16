import * as React from 'react';

export const SkeletonContext = React.createContext<boolean>(false);

export type Params = {
  isLoading?: boolean | ((prevIsLoading: boolean) => boolean);
  Skeleton?: React.ComponentType;
};

const getSkeletonState = (
  isCurrentSkeleton:
    | boolean
    | ((prevIsLoading: boolean) => boolean)
    | undefined,
  isParentSkeleton: boolean,
) => {
  if (isCurrentSkeleton === undefined) return isParentSkeleton;
  if (typeof isCurrentSkeleton === 'function')
    return isCurrentSkeleton(isParentSkeleton);
  return isCurrentSkeleton;
};

export const useSkeleton = ({
  isLoading: isCurrentSkeleton,
  Skeleton,
}: Params) => {
  const isParentSkeleton = React.useContext(SkeletonContext);

  const isSkeleton = getSkeletonState(isCurrentSkeleton, isParentSkeleton);

  const renderContent = React.useMemo(
    () => (tree: React.ReactNode) =>
      isSkeleton && Skeleton ? (
        <SkeletonContext.Provider value={false}>
          <Skeleton />
        </SkeletonContext.Provider>
      ) : (
        tree
      ),
    [isSkeleton, Skeleton],
  );

  const withSkeleton = React.useMemo(
    () => (tree: React.ReactNode) => (
      <>
        {isCurrentSkeleton === undefined ? (
          renderContent(tree)
        ) : (
          <SkeletonContext.Provider value={isSkeleton}>
            {renderContent(tree)}
          </SkeletonContext.Provider>
        )}
      </>
    ),
    [isCurrentSkeleton, isSkeleton, renderContent],
  );

  return { withSkeleton };
};
