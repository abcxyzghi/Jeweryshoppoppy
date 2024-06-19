import "./index.scss";

/* eslint-disable react/prop-types */
function AuthTemplate({ children }) {
  return (
    <div className="auth">
      <div className="auth__background"></div>
      <div className="auth__form">{children}</div>
    </div>
  );
}

export default AuthTemplate;
