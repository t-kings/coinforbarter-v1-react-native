import React, {createContext, useState, FC} from 'react';
import {PreloaderContainer} from '../../components';
import {PreloaderType, Props} from './types';

const preloaderStatus: PreloaderType = {
  isLoading: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setIsLoading: (status: boolean): void => {},
};

export const PreloaderContext = createContext<PreloaderType>(preloaderStatus);

export const PreloaderProvider: FC<Props> = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <PreloaderContext.Provider value={{isLoading, setIsLoading}}>
      <>
        {isLoading && <PreloaderContainer />}
        {children}
      </>
    </PreloaderContext.Provider>
  );
};
