'use client'
import React from "react";
import { useAuthContext } from "../../src/context/AuthContext";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: any; // replace 'any' with the actual type of 'user'
}

function Page() {
    const { user } = useAuthContext() as AuthContextType
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    return (<h1>Only logged in users can view this page</h1>);
}

export default Page;
