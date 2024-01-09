'use client'
import React from "react";
import signUp from "../src/firebase/signup"
import { useRouter } from 'next/navigation'
import { Button } from "react-daisyui";

function Page() {
    const router = useRouter()

    return (
      <div className="wrapper">
          <Button color="primary" size="lg" className="m-10" onClick={() => router.push('signin')}>Sign In</Button>
          <Button color="secondary" size="lg" className="m-10" onClick={() => router.push('signup')}>Sign Up</Button>
      </div>
    );
}

export default Page;