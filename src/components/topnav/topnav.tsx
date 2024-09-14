import { FaPlus, FaSignOutAlt } from 'react-icons/fa';
import styles from './topnav.module.css';
import { FaBucket } from 'react-icons/fa6';
import supabase from '../../lib/supabase';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

export default function TopNav() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };

        fetchUserData(); // Fetch user data on component mount

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
            setUser(session?.user || null);
        });

        // Cleanup function to unsubscribe
        return () => {
            subscription?.unsubscribe();
        };
    }, []); // Empty dependency array to run only once on mount

    async function handleLogout() {
        const { error } = await supabase.auth.signOut();
        console.log("Logout clicked", {error}); // Moved inside the function
    } 

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