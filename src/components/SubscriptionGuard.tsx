import React from 'react';

// Simple pass-through HOC - doesn't actually check subscription status
const withSubscriptionGuard = (Component: React.ComponentType<any>) => {
  return (props: any) => {
    // Just return the component without any checks
    return <Component {...props} />;
  };
};

export default withSubscriptionGuard;