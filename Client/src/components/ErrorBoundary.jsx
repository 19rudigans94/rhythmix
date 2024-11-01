import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    
    // You can log the error to an error reporting service here
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-spotify-black flex items-center justify-center p-4">
          <div className="bg-spotify-gray rounded-lg p-8 max-w-lg w-full text-center">
            <h1 className="text-2xl font-bold text-white mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-spotify-light-gray mb-6">
              We're sorry for the inconvenience. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Refresh Page
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-6 text-left">
                <p className="text-red-400 font-mono text-sm mb-2">
                  {this.state.error.toString()}
                </p>
                <pre className="text-spotify-light-gray text-xs overflow-auto p-4 bg-black bg-opacity-50 rounded">
                  {this.state.errorInfo.componentStack}
                </pre>
              </div>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary