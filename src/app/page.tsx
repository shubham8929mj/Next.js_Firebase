  "use client";
  import { useAuthContext } from "@/context/AuthContext";
  import Link from "next/link";
  import React, { useEffect } from "react";
  import { useRouter } from 'next/navigation'
  import { logOut } from "@/firebase/authentication";
  export default function App() {
    const  {user}  = useAuthContext()
      const router = useRouter()

      useEffect(() => {
          if (user == null) router.push("/sign-in")
      }, [user])
    return <h1 onClick={()=>logOut()}>Hilo</h1>
  }
