"use client";
import React from "react";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  
  const { data: session, status: sessionStatus } = useSession();


  useEffect(() => {
    if (sessionStatus !== "authenticated") {
      router.replace("/login");
    }
  }, [sessionStatus, router]);



  // console.log(session);
  // console.log(session?.user?.email);
  // console.log(session?.user?.email);

  
    return (
        <div className="flex">
           Dashboard...
        </div>
      )

};


export default Dashboard
  