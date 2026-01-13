import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface SingUpProps {
    onClose: () => void;
}

export default function SingUp({ onClose }: SingUpProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const Navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!name || !email || !password || !confirmPassword) {
            setError("Enter all fields");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        const tName = name.trim();
        const tEmail = email.trim();
        const tPassword = password.trim();

        try {
            const res = await fetch("http://localhost:3002/user/signup", {

                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: tName, email: tEmail, password: tPassword }),
            });
            const data = await res.json();
            console.log("STATUS:", res.status, "DATA:", data);
            if (!res.ok) {
                setError(data.error || "Signup failed");
                return;
            }
            console.log(data.message);
           
            onClose();
            
            Navigate("/login");
        } catch (err) {
            console.error(err);
            setError("Server error, try again");
        }

    }
    return (
        <div className=" md:w-96  mx-auto fixed inset-0 flex items-start justify-center mt-16  z-10">

            <form
                className="relative bg-white p-6 rounded shadow w-full max-w-md"
                onSubmit={handleSubmit}
            >
                <button
                    type="button"
                    onClick={() => {
                        console.log("Closing login modal");
                        onClose();
                    }}
                    className="absolute top-3 right-3 text-2xl cursor-pointer"
                >
                    &times;
                </button>

                <h2 className="text-2xl font-semibold text-center">user SingUp</h2>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <label className="block mt-3">Username</label>
                <input type="text" className="border p-2 w-full rounded" onChange={(e) => setName(e.target.value)} />
                <label className="block mt-3">Email</label>
                <input type="email" className="border p-2 w-full rounded" onChange={(e) => setEmail(e.target.value)} />

                <label className="block mt-3">Password</label>
                <input type="password" className="border p-2 w-full rounded" onChange={(e) => setPassword(e.target.value)} />
                <label className="block mt-3">Confirm Password</label>
                <input type="password" className="border p-2 w-full rounded" onChange={(e) => setConfirmPassword(e.target.value)} />

                <div className="w-full flex mt-4 justify-around items-center">
                    <button className="w-1/2 bg-blue-600 text-white p-2  rounded" type="submit">
                        SingUp
                    </button>
                    <p><Link to="/login">Login</Link></p>
                </div>
            </form>
        </div>
    )
}


