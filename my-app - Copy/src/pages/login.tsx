import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface LoginProps {
    onClose: () => void;
}

function Login({ onClose }: LoginProps) {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!name || !password) {
            setError("Enter all fields");
            return;
        }
        const tName = name.trim();
        const tPassword = password.trim();

        try {
            const res = await fetch("http://localhost:3002/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: tName, password: tPassword }),
            });

            const data = await res.json();
            // console.log("STATUS:", res.status, "DATA:", data);

            if (!res.ok) {
                setError(data.error || "Invalid login credentials");
                return;
            }
            localStorage.setItem("currentUser", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);


            onClose();

            navigate("/Dashboard");


        } catch (err) {
            console.error(err);
            setError("Server error, try again");
        }
    };

    return (
        <div className=" md:w-96  mx-auto fixed inset-0 flex items-start justify-center mt-16  z-10">

            <form className="relative bg-white p-6 rounded shadow w-full max-w-md" onSubmit={handleSubmit} >


                <h2 className="text-2xl font-semibold text-center">Admin Login</h2>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <label className="block mt-3">Username</label>
                <input type="text" className="border p-2 w-full rounded" onChange={(e) => setName(e.target.value)} />

                <label className="block mt-3">Password</label>
                <input type="password" className="border p-2 w-full rounded" onChange={(e) => setPassword(e.target.value)} />

                <div className="w-full flex mt-4 justify-around items-center">
                    <button className="w-3/5 bg-blue-600 text-white p-2 rounded" type="submit">
                        Login
                    </button>
                    <p><Link to="/register">Register</Link></p>
                </div>
            </form>
        </div>
    );
}

export default Login;
