import * as React from 'react';

export const SkeletonContext = React.createContext<boolean>(false);

export type Params = {
  isLoading?: boolean;
  Skeleton?: React.ComponentType;
};

export const useSkeleton = ({
  isLoading: isCurrentSkeleton,
  Skeleton,
}: Params) => {
  const isParentSkeleton = React.useContext(SkeletonContext);

  const isSkeleton =
    isCurrentSkeleton === undefined ? isParentSkeleton : isCurrentSkeleton;

  const renderContent = React.useMemo(
    () => (tree: React.ReactNode) =>
      isSkeleton && Skeleton ? <Skeleton /> : tree,
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
