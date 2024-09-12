import { FaPlus, FaSignOutAlt } from 'react-icons/fa';
import styles from './topnav.module.css';
import { FaBucket } from 'react-icons/fa6';
import supabase from '../../lib/supabase';

export default function TopNav() {
    const userName = "John Doe"; // Replace with actual user name or state

    async function handleLogout() {
        const { error } = await supabase.auth.signOut();
        console.log("Logout clicked", {error}); // Moved inside the function
    } 

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