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
    <div className="min-h-screen bg-[#143D2A] flex flex-col justify-center items-center p-4 pt-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#C69C45] opacity-5 blur-[120px]"></div>
        <div className="absolute bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-[#143D2A] opacity-50 blur-[100px]"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-serif font-bold text-white">Reset Password</h1>
            <p className="text-white/60 mt-2">Enter your email to receive a reset link</p>
          </div>

          {!isSent ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/80">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com" 
                    required 
                    className="bg-black/20 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-[#C69C45]/50"
                  />
                </div>
              </div>

              <Button type="submit" variant="gold" size="lg" disabled={isLoading} className="w-full rounded-xl shadow-lg">
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-md border border-emerald-500/20">
                A password reset link has been sent to <strong className="text-white">{email}</strong>. Please check your inbox and spam folder.
              </div>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm font-medium text-[#C69C45] hover:text-[#C69C45]/80 transition-colors">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
