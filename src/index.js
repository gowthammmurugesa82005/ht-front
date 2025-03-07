import React from 'react';
import ReactDOM from 'react-dom/client';  // Correct import for React 18
import './index.css';
import App from './App';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI if there's an error
      return <h1>Something went wrong.</h1>;
    }
    // Normal render
    return this.props.children;
  }
}

// Wrapping App with ErrorBoundary
const AppWrapper = () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

// Get the root element and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
 export default AppWrapper;