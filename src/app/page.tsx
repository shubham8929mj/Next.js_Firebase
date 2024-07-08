"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { logOut } from "@/firebase/authentication";
import addData from "@/firebase/firestoreService";

const App = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    }
  }, [user]);

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      {/* <button onClick={handleAddData}>Add Data</button> */}
      <div className="bg-gray-200 text-center p-8">
        <div className="text-2xl font-bold mb-2">Welcome to net solutions</div>
        <div className="text-lg mb-2">{currentDateTime.toLocaleString()}</div>
        <p className="text-sm text-gray-600">Welcome {user?.email}...</p>
      </div>
    </>
  );
};

export default App;
