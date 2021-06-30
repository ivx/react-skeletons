import typescript from '@rollup/plugin-typescript';

export default {
  input: ['src/index.tsx', 'src/useSkeleton.tsx', 'src/Skeleton.tsx'],
  output: {
    dir: 'dist',
    format: 'cjs',
  },
  plugins: [typescript()],
  external: ['react', 'styled-components'],
};
