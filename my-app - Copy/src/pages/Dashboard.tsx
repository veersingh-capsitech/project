import { useEffect, useState } from "react"

function Dashboard() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    useEffect(() => {
        const saved = localStorage.getItem("currentUser");
        if (saved) {
            const user = JSON.parse(saved);
            setUserName(user.username);
            setEmail(user.email);
        }   
    }, []);

    
  return (
    <div className="p-6 text-center mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
        <p className="text-lg">Welcome, {userName}!</p>
        <p className="text-lg">Your email: {email}</p>
      
    </div>
  )
}

export default Dashboard
