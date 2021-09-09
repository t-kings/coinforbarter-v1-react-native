import React, {createContext, useState, FC} from 'react';
import {ErrorBoundary} from '../../components';
import {useModal} from '../../hooks';
import {ErrorContextType, ErrorType, Props} from './types';

const errorContext: ErrorContextType = {
  error: {data: {}, message: ''},
  setError: () => {},
};

export const ErrorContext = createContext<ErrorContextType>(errorContext);

export const ErrorProvider: FC<Props> = ({children}) => {
  const {closeModal} = useModal();
  const [error, setError] = useState<ErrorType>({
    message: '',
    data: {},
  });
  return (
    <ErrorContext.Provider value={{error, setError}}>
      <ErrorBoundary closeModal={closeModal} errorProps={{error, setError}}>
        {children}
      </ErrorBoundary>
    </ErrorContext.Provider>
  );
};
