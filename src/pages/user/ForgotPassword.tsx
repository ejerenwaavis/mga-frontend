import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { forgotPassword } from "../../services/mutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);

  const { mutate: handleForgot, isLoading } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      setIsSent(true);
      toast.success("Password reset link sent to your email!");
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage = error.message === "Network Error" 
        ? "Unable to connect to the server. Please try again later." 
        : (error.message || "Failed to send reset link");
      toast.error(errorMessage);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    handleForgot({ email });
  };

  return (
    <div className="min-h-screen bg-bg-light flex flex-col justify-center items-center p-4 pt-24">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-primary">Reset Password</h1>
            <p className="text-gray-600 mt-2">Enter your email to receive a reset link</p>
          </div>

          {!isSent ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com" 
                    required 
                  />
                </div>
              </div>

              <Button type="submit" variant="premium" size="lg" disabled={isLoading} className="w-full">
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="p-4 bg-green-50 text-green-700 rounded-md border border-green-100">
                A password reset link has been sent to <strong>{email}</strong>. Please check your inbox and spam folder.
              </div>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm font-medium text-primary hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
