import { FaPlus, FaSignOutAlt } from 'react-icons/fa';
import styles from './topnav.module.css';

export default function TopNav() {
    const userName = "John Doe"; // Replace with actual user name or state

    const handleLogout = () => {
        // Implement logout logic here
        console.log("Logout clicked");
    };

    return (
        <nav className={styles.topNav}>
            <span className={styles.userName}>{userName}</span>
            <div className={styles.buttonGroup}>
                <button className={`${styles.button} ${styles.createButton}`} title="Create Bucket">
                    <FaPlus />
                </button>
                <button className={`${styles.button} ${styles.logoutButton}`} onClick={handleLogout} title="Logout">
                    <FaSignOutAlt />
                </button>
            </div>
        </nav>
    )
}