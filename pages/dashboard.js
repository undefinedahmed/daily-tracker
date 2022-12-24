import ProtectedRoute from "../config/ProtectedRoute";
import styles from "../styles/Dashboard.module.css";

const DashboardPage = () => {
  return (
    // TODO: if todo array length === 0, show get started & add your new goal button
    // TODO: else show names of goals
    <ProtectedRoute>
      <div className={styles.main}>
        <div className={styles.inner}>
          <h2 className={styles.heading}>You are logged in!</h2>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
