import { jsx as _jsx } from "react/jsx-runtime";
// Simple pass-through HOC - doesn't actually check subscription status
const withSubscriptionGuard = (Component) => {
    return (props) => {
        // Just return the component without any checks
        return _jsx(Component, { ...props });
    };
};
export default withSubscriptionGuard;
