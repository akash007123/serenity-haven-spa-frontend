import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Smartphone,
  Calendar,
  MapPin,
  Upload,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { toast } from "sonner";
import axios from "axios";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    mobile: z.string().min(10, "Please enter a valid mobile number"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    gender: z.enum(["male", "female", "other", "prefer_not_to_say"]),
    address: z.string().min(1, "Address is required"),
    country: z.string().min(1, "Please select a country"),
    state: z.string().min(1, "Please select a state"),
    city: z.string().min(1, "Please select a city"),
    role: z.enum(["admin", "sub_admin", "manager"]).default("sub_admin"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

interface Country {
  value: string;
  label: string;
}

interface State {
  value: string;
  label: string;
}

interface City {
  value: string;
  label: string;
}

interface ApiResponse<T> {
  data: T;
  error: boolean;
  msg: string;
}

export default function AdminRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(
    null,
  );
  const [initialLoading, setInitialLoading] = useState(true);

  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const {
    register: formRegister,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      gender: "prefer_not_to_say",
      role: "sub_admin",
    },
  });

  const watchedCountry = watch("country");
  const watchedState = watch("state");

  // Fetch all countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get<ApiResponse<{ country: string }[]>>(
          "https://countriesnow.space/api/v0.1/countries",
        );
        if (response.data && !response.data.error && response.data.data) {
          const countryList: Country[] = response.data.data.map((item) => ({
            value: item.country,
            label: item.country,
          }));
          countryList.sort((a, b) => a.label.localeCompare(b.label));
          setCountries(countryList);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
        toast.error("Failed to load countries. Please refresh the page.");
      } finally {
        setInitialLoading(false);
      }
    };
    fetchCountries();
  }, []);

  // Fetch states when country changes
  const fetchStates = useCallback(
    async (country: string) => {
      setLoadingStates(true);
      setStates([]);
      setCities([]);
      setValue("state", "");
      setValue("city", "");

      try {
        const response = await axios.post(
          "https://countriesnow.space/api/v0.1/countries/states",
          { country },
        );

        if (!response.data.error && response.data.data?.states) {
          const stateList: State[] = response.data.data.states.map(
            (item: any) => ({
              value: item.name,
              label: item.name,
            }),
          );

          stateList.sort((a, b) => a.label.localeCompare(b.label));
          setStates(stateList);
        }
      } catch (error) {
        console.error("Error fetching states:", error);
        toast.error("Failed to load states.");
      } finally {
        setLoadingStates(false);
      }
    },
    [setValue],
  );

  // Fetch cities when state changes
  const fetchCities = useCallback(
    async (country: string, state: string) => {
      setLoadingCities(true);
      setCities([]);
      setValue("city", "");

      try {
        const response = await axios.post(
          "https://countriesnow.space/api/v0.1/countries/state/cities",
          { country, state },
        );

        if (!response.data.error && response.data.data) {
          const cityList: City[] = response.data.data.map((city: string) => ({
            value: city,
            label: city,
          }));

          cityList.sort((a, b) => a.label.localeCompare(b.label));
          setCities(cityList);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
        toast.error("Failed to load cities.");
      } finally {
        setLoadingCities(false);
      }
    },
    [setValue],
  );

  // Effect to trigger state fetch when country changes
  useEffect(() => {
    if (watchedCountry) {
      fetchStates(watchedCountry);
    }
  }, [watchedCountry, fetchStates]);

  // Effect to trigger city fetch when state changes
  useEffect(() => {
    if (watchedCountry && watchedState) {
      fetchCities(watchedCountry, watchedState);
    }
  }, [watchedCountry, watchedState, fetchCities]);

  // Handle profile picture selection
  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      setProfilePic(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("username", data.username);
      formData.append("mobile", data.mobile);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);
      formData.append("dateOfBirth", data.dateOfBirth);
      formData.append("gender", data.gender);
      formData.append("address", data.address);
      formData.append("country", data.country);
      formData.append("state", data.state);
      formData.append("city", data.city);
      formData.append("role", data.role);

      if (profilePic) {
        formData.append("profilePic", profilePic);
      }

      await register(formData);
      toast.success("Registration successful!");
      navigate("/admin");
    } catch (error) {
      toast.error(
        (error as string) || "Registration failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading countries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 py-12 px-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Admin Registration
          </CardTitle>
          <CardDescription>Create a new admin account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-gray-300">
                  {profilePicPreview ? (
                    <img
                      src={profilePicPreview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <label
                  htmlFor="profilePic"
                  className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full cursor-pointer hover:bg-primary/90"
                >
                  <Upload className="w-4 h-4" />
                </label>
                <input
                  type="file"
                  id="profilePic"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePicChange}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Upload profile picture (max 5MB)
              </p>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Enter full name"
                    className="pl-10"
                    {...formRegister("name")}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    className="pl-10"
                    {...formRegister("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    placeholder="Enter username"
                    className="pl-10"
                    {...formRegister("username")}
                  />
                </div>
                {errors.username && (
                  <p className="text-sm text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number *</Label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="mobile"
                    placeholder="Enter mobile number"
                    className="pl-10"
                    {...formRegister("mobile")}
                  />
                </div>
                {errors.mobile && (
                  <p className="text-sm text-red-500">
                    {errors.mobile.message}
                  </p>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password"
                    className="pl-10 pr-10"
                    {...formRegister("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    className="pl-10 pr-10"
                    {...formRegister("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* Date of Birth and Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="dateOfBirth"
                    type="date"
                    className="pl-10"
                    {...formRegister("dateOfBirth")}
                  />
                </div>
                {errors.dateOfBirth && (
                  <p className="text-sm text-red-500">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select
                  onValueChange={(value) =>
                    setValue("gender", value as RegisterFormData["gender"])
                  }
                  defaultValue={watch("gender")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer_not_to_say">
                      Prefer not to say
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && (
                  <p className="text-sm text-red-500">
                    {errors.gender.message}
                  </p>
                )}
              </div>
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <Label htmlFor="role">Role *</Label>
              <Select
                onValueChange={(value) =>
                  setValue("role", value as RegisterFormData["role"])
                }
                defaultValue={watch("role")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="sub_admin">Sub-admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="address"
                  placeholder="Enter street address"
                  className="pl-10"
                  {...formRegister("address")}
                />
              </div>
              {errors.address && (
                <p className="text-sm text-red-500">{errors.address.message}</p>
              )}
            </div>

            {/* Country, State, City */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Country *</Label>
                <Select
                  onValueChange={(value) => setValue("country", value)}
                  value={watchedCountry || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.country && (
                  <p className="text-sm text-red-500">
                    {errors.country.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>State *</Label>
                <Select
                  onValueChange={(value) => setValue("state", value)}
                  value={watchedState || ""}
                  disabled={!watchedCountry || loadingStates}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        loadingStates ? "Loading..." : "Select state"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.state && (
                  <p className="text-sm text-red-500">{errors.state.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>City *</Label>
                <Select
                  onValueChange={(value) => setValue("city", value)}
                  value={watch("city") || ""}
                  disabled={!watchedState || loadingCities}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={loadingCities ? "Loading..." : "Select city"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.value} value={city.value}>
                        {city.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.city && (
                  <p className="text-sm text-red-500">{errors.city.message}</p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link to="/admin/login" className="text-primary hover:underline">
                Login here
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
