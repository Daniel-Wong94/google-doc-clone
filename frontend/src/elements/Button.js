import styles from "./Button.module.css";

const Button = ({ children, onClick, variant }) => {
  return <button onClick={onClick}>{children}</button>;
};

export default Button;
