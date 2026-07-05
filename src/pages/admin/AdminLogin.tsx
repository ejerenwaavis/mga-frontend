import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { toast } from "sonner";
import useUserStore from "../../hooks/store/userStore";
import { Eye, EyeOff } from "lucide-react";
import { loginAdmin } from "../../services/mutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Define types for form data and errors
interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const AdminLogin = () => {
  const navigate = useNavigate();
  const { setAuth } = useUserStore();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: handleLogin, isLoading } = useMutation({
    mutationFn: loginAdmin,
    onSuccess: (data) => {
      // Store user and token in the persisted store

      setAuth(data.user, data.token);
      toast.success("Login Successful");
      navigate("/admin/dashboard");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error("Login Failed");
    },
  });

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.email) {
      errors.email = "Email is required";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    handleLogin(formData);
  };

  return (
    <div className="min-h-screen bg-bg-light flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl font-bold">MGA</span>
            </div>
            {/* <h1 className="text-2xl font-bold text-primary">Big Ben Express</h1> */}
            <p className="text-gray-600 mt-2">Admin Portal</p>
          </div>

          {errors.email && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6 text-sm">
              {errors.email}
            </div>
          )}
          {errors.password && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6 text-sm">
              {errors.password}
            </div>
          )}

         


          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">

              <div className="space-y-2">
                <Label htmlFor="svc-email">Email</Label>
                <Input id="svc-email" type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="you@example.com" required className="focus-visible:ring-primary" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="svc-phone">Password</Label>
                <div className="relative">
                  <Input id="svc-phone" type={showPassword ? "text" : "password"} placeholder=""
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    required className="focus-visible:ring-primary pr-10" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
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



            <Button type="submit" variant="premium" size="lg"
              disabled={isLoading}
              className="w-full">
              {isLoading ? "Logging in..." : "Login"}

            </Button>
          </form>


        </div>

        <div className="mt-6 text-center">
          <a href="/" className="text-primary hover:underline">
            ← Return to Main Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
