import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import useToggleValues from "../../hooks/useToggleValues";
import { TAuthProps } from "../../types/auth";
import { ROUTE_HOME, ROUTE_REGISTER } from "../../constants/WebPath";
import FormGroup from "../../components/ui/formGroup/FormGroup";
import Label from "../../components/ui/label/Label";
import Input from "../../components/ui/input/Input";
import EyeToggleIcon from "../../components/icons/EyeToggleIcon";
import Button from "../../components/ui/button/Button";
import { useAuth } from "../../context/AuthProvider";
import { login } from "../../api/authApi";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { value: showPassword, handleToggleValue: handleTogglePassword } =
    useToggleValues();
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSignIn = async ({ username, password }: TAuthProps) => {
    try {
      const authUsername = await login({ username, password });
      if(authUsername) {
        toast.success(`Welcome back, ${authUsername}`);
        auth?.authLogin(authUsername);
        reset();
        navigate(ROUTE_HOME);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <>
      <div className="relative w-full min-h-screen p-10 bg-lite isolate">
        <div className="w-full max-w-[556px] bg-white rounded-xl px-5 py-8 lg:px-16 lg:py-12 mx-auto">
          <h1 className="mb-1 text-lg font-semibold text-center lg:text-xl lg:mb-3 text-text1">
            Login Form
          </h1>
          <p className="mb-6 text-xs font-medium text-center lg:font-normal lg:text-sm text-text3 lg:mb-8">
            Don't have an account yet?
            <Link
              to={ROUTE_REGISTER}
              className="font-medium underline text-primary"
            >
              Sign Up here!
            </Link>
          </p>
          <form onSubmit={handleSubmit(handleSignIn)}>
            <FormGroup>
              <Label htmlFor="username">Username*</Label>
              <Input
                control={control}
                name="username"
                placeholder="Input your username here"
                error={errors.username?.message}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password *</Label>
              <Input
                control={control}
                name="password"
                type={`${showPassword ? "text" : "password"}`}
                placeholder="Input your password"
                error={errors.password?.message}
              >
                <EyeToggleIcon
                  open={showPassword}
                  onClick={handleTogglePassword}
                ></EyeToggleIcon>
              </Input>
            </FormGroup>
            <Button type="submit" className="w-full bg-primary">
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-t-2 border-white rounded-full border-t-transparent animate-spin"></div>
              ) : (
                "Log In"
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
