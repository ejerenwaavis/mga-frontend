import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "react-query";
import { toast } from "sonner";
import useUserStore from "../../hooks/store/userStore";
import { loginUser } from "../../services/mutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Eye, EyeOff } from "lucide-react";

const UserLogin = () => {
  const navigate = useNavigate();
  const { setAuth } = useUserStore();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: handleLogin, isLoading } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      toast.success("Login Successful");
      navigate("/dashboard");
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage = error.message === "Network Error" 
        ? "Unable to connect to the server. Please try again later." 
        : (error.message || "Login Failed");
      toast.error(errorMessage);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }
    handleLogin(formData);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col justify-center items-center p-4 pt-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#C69C45] opacity-[0.08] blur-[120px]"></div>
        <div className="absolute bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-[#143D2A] opacity-[0.05] blur-[100px]"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-serif font-bold text-[#143D2A]">Customer Login</h1>
            <p className="text-gray-500 mt-2">Manage your rentals and profile</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com" 
                  required 
                  className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus-visible:ring-[#C69C45]/50"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <Link to="/forgot-password" className="text-sm font-medium text-[#C69C45] hover:text-[#C69C45]/80 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required 
                    className="pr-10 bg-gray-50 border-gray-200 text-gray-900 focus-visible:ring-[#C69C45]/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <Button type="submit" variant="gold" size="lg" disabled={isLoading} className="w-full rounded-xl shadow-lg text-[#143D2A] font-semibold">
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
          
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-500">
              Your account is created automatically when you make a booking. Check your email for your temporary password.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
