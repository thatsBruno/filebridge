import { FaPlus, FaSignOutAlt } from 'react-icons/fa';
import styles from './topnav.module.css';
import { FaBucket } from 'react-icons/fa6';
import supabase from '../../lib/supabase';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

export default function TopNav() {
    const [user, setUser] = useState<User | null>(null)

    const fetchUserData = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        if(user != null){
            return user.user_metadata;
        }
    }

    async function handleLogout() {
        const { error } = await supabase.auth.signOut();
        console.log("Logout clicked", {error}); // Moved inside the function
    } 

    useEffect(() => {
      fetchUserData();
    }, ) // Added dependency array to run only on mount
    
    return (
        <nav className={styles.topNav}>
            <span className={styles.userName}>{user?.email}</span>
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