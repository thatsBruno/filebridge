import { useState, useEffect } from "react"
import supabase from "../../lib/supabase"
import { Session } from "@supabase/supabase-js"
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

export default function Login(){
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })

      return () => subscription.unsubscribe()
    }, [])

    if (!session) {
      return (
      <div className="login-box">
          <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      </div>
    )} else {
      return (
        <div>
          Logged in! {session.user.email}
        </div>
      )
    }
}