import './AuthLayout.css';

export const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout h-screen w-screen flex items-center justify-center box-border">
      { children }
    </div>
  )
}