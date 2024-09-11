import { FaPlus, FaSignOutAlt } from 'react-icons/fa';
import styles from './topnav.module.css';
import { FaBucket } from 'react-icons/fa6';

export default function TopNav() {
    const userName = "John Doe"; // Replace with actual user name or state

    const handleLogout = () => {
        // Implement logout logic here
        console.log("Logout clicked");
    };

    return (
        <nav className={styles.topNav}>
            <span className={styles.userName}>{userName}</span>
            <h1 className={styles.appName}>Filebridge</h1>
            <div className={styles.buttonGroup}>
                <button className={`${styles.button} ${styles.createButton}`} title="Create Bucket">
                    <FaPlus />
                    <FaBucket />
                </button>
                <button className={`${styles.button} ${styles.logoutButton}`} onClick={handleLogout} title="Logout">
                    <FaSignOutAlt />
                </button>
            </div>
        </nav>
    )
}