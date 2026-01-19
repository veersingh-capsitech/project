import { useEffect, useState } from "react";

function Dashboard() {
    const [userId, setUserId] = useState<string | null>(null);
    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    useEffect(() => {
        const savedUser = localStorage.getItem("currentUser");
        if (savedUser) {
            const user = JSON.parse(savedUser);
            setUserId(user.userId);
        }
    }, []);

    useEffect(() => {
        if (!userId) return;

        const savedToken = localStorage.getItem("token");
        const fetchUserData = async () => {
            try {
                const res = await fetch(`http://localhost:3002/user/profile/${userId}`, {
                    headers: {
                        "Authorization": `Bearer ${savedToken}`
                    }
                });

                if (!res.ok) {
                    console.error("Error:", res.status);
                    return;
                }

                const data = await res.json();
                setUserName(data.user.username);
                setEmail(data.user.email);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUserData();
    }, [userId]);

    return (
        <div className="p-6 text-center mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
            <p className="text-lg">Welcome, {userName}!</p>
            <p className="text-lg">Your email: {email}</p>
        </div>
    );
}

export default Dashboard;
