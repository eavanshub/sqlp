import { Component, ErrorInfo, PropsWithChildren } from 'react';

export class ErrorBoundary extends Component<
  PropsWithChildren,
  {
    hasError: boolean;
  }
> {
  state = {
    hasError: false,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('Error from ErrorBoundary: ', error);
    console.log('Component Stack: ', errorInfo?.componentStack);
    this.setState({
      hasError: true,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Oops... something went wrong!</h1>
        </div>
      );
    }

    return this.props.children;
  }
}
