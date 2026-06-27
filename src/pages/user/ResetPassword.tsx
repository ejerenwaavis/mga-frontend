import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { recoverPassword } from "../../services/mutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or missing reset token");
      navigate("/login");
    }
  }, [token, navigate]);

  const { mutate: handleReset, isLoading } = useMutation({
    mutationFn: recoverPassword,
    onSuccess: () => {
      toast.success("Password has been successfully reset!");
      navigate("/login");
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage = error.message === "Network Error" 
        ? "Unable to connect to the server. Please try again later." 
        : (error.message || "Failed to reset password");
      toast.error(errorMessage);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    if (token) {
      handleReset({ token, password });
    }
  };

  if (!token) return null;

  return (
    <div className="min-h-screen bg-bg-light flex flex-col justify-center items-center p-4 pt-24">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-primary">Create New Password</h1>
            <p className="text-gray-600 mt-2">Please enter your new password below</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••" 
                  required 
                />
              </div>
            </div>

            <Button type="submit" variant="premium" size="lg" disabled={isLoading} className="w-full">
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
