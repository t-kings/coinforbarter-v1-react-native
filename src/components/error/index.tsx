import React, {ErrorInfo} from 'react';
import {Text, View} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {Body} from '../../containers';
import {ErrorContextType} from '../../store/errors/types';
import {Button} from '../button';
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  state: ErrorBoundaryState;
  static getDerivedStateFromError = (error: Error) => {
    console.log('getDerivedStateFromError => ', error);
    return {hasError: true, error};
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('componentDidCatch => ', error, errorInfo);
    this.setState({...this.state, error, errorInfo});
  }

  render() {
    const {hasError, error, errorInfo} = this.state;
    const {children, errorProps, closeModal} = this.props;

    if (hasError) {
      return (
        <Body>
          <>
            {errorInfo ? (
              <Text
                style={{
                  ...tw`text-center text-black capitalize`,
                }}>
                {errorInfo}
              </Text>
            ) : null}
            {error ? (
              <Text style={tw`text-center capitalize`}>{error}</Text>
            ) : null}
            <View style={tw`flex justify-center pt-8`}>
              <Button
                onClick={() => {
                  closeModal();
                }}>
                <Text> Close </Text>
              </Button>
            </View>
          </>
        </Body>
      );
    }

    if (errorProps.error.message.length > 0) {
      return (
        <Body>
          <>
            {errorProps.error.message ? (
              <Text style={tw`text-center capitalize`}>
                {errorProps.error.message}
              </Text>
            ) : null}
            {errorProps.error.statusCode === 400 &&
              Object.values(errorProps.error.data.errors || {}).map(errors =>
                errors.map((e: string) => (
                  <Text style={tw`text-center  capitalize `} key={e}>
                    {e}
                  </Text>
                )),
              )}
            <View style={tw`flex flex-row justify-center pt-8`}>
              <Button
                onClick={() => {
                  closeModal();
                }}>
                <Text> Close </Text>
              </Button>
            </View>
          </>
        </Body>
      );
    }
    return children;
  }
}
// Interfaces
interface ErrorBoundaryProps {
  errorProps: ErrorContextType;
  closeModal: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}
