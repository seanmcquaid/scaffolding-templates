export interface UseFunPackageArgs {
  num: number;
}

export const useFunPackage = (args: UseFunPackageArgs): number => args.num;
