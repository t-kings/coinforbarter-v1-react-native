export interface Props {
  children: JSX.Element;
}

export type PreloaderType = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};
