export interface Props {
  children: JSX.Element;
}

export type ErrorContextType = {
  error: ErrorType;
  setError: (error: ErrorType) => void;
};

export type ErrorType = {
  message: string;
  data: {errors?: Record<string, string[]>};
  statusCode?: number;
};
