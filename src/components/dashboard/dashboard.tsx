import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react"
import supabase from "../../lib/supabase";
import TopNav from "../topnav/topnav";
import Files from "../files/files";
import Login from "../login/login";

export default function Dashboard(){
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
      fetchUserData();
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
        setUser(session?.user || null);
      });
      return () => {
        subscription?.unsubscribe();
      };
    }, []) // Added dependency array to run only on mount

    // New function to fetch user data
    const fetchUserData = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        if(user != null){
            return user.user_metadata;
        }
    }
    
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