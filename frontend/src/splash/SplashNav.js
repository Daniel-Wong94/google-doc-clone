import styles from "./SplashNav.module.css";
import Button from "../elements/Button";

const SplashNav = () => {
  return (
    <div className={styles.splashNavContainer}>
      <div>
        <Button>Google Doc</Button>
      </div>
      <div>
        <button>Overview</button>
        <button>Features</button>
        <button>Security</button>
        <button>Pricing</button>
      </div>
      <div>
        <button>Sign In</button>
        <button>Go to Docs</button>
      </div>
    </div>
  );
};

export default SplashNav;
