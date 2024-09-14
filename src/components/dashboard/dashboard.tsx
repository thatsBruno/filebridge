import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react"
import supabase from "../../lib/supabase";
import TopNav from "../topnav/topnav";
import Files from "../files/files";
import Login from "../login/login";

export default function Dashboard(){
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // New function to fetch user data
        const fetchUserData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            if(user != null){
                return user.user_metadata;
            }
        }

        const fetchUserDataAndSubscribe = async () => {
            await fetchUserData(); // Fetch user data
            const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
                setUser(session?.user || null);
            });
            return () => {
                subscription?.unsubscribe(); // Unsubscribe when component unmounts
            };
        };

        fetchUserDataAndSubscribe();

        // Cleanup function to unsubscribe
        return () => {
            subscription?.unsubscribe();
        };
    }, []); // Empty dependency array to run only once on mount

    return (
        <>
        <div className="topnav">
        </div>
            {user ?
            <><TopNav /> <Files /></> : 
            <div className="login">
                <Login />
            </div>
}
        </>
    )
}