import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ButtonLink } from "../components/Button";
import { useAuth } from "../context/AuthContext";

function Auth() {
  const { signup, signin } = useAuth();
  const navigate = useNavigate();

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm();

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    watch,
    formState: { errors: registerErrors },
  } = useForm();

  const onLogin = async (data) => {
    try {
      const { email, password } = data;
      const resultSignin = await signin({ email, password });

      if (resultSignin.message === "OK") {
        navigate("/home");
      } else {
        alert(resultSignin.error);
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
    }
  };

  const onRegister = async (data) => {
    const { email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const resultSignup = await signup({ email, password });

      if (resultSignup.message === "OK") {
        navigate("/home");
      } else {
        alert(resultSignup.error);
      }
    } catch (err) {
      console.error("Error al registrar:", err);
    }
  };

  return (
    <div className="flex w-full flex-col justify-center items-center">
      {/* LOGIN */}
      <div className="bg-black/50 py-6 px-6 rounded-lg shadow-sm w-96 my-6">
        <h2 className="text-white font-bold text-2xl text-center mb-4">
          Iniciar Sesión
        </h2>
        <div className="flex flex-col gap-5 justify-center items-center">
          <div className="w-full">
            <input
              type="email"
              className="py-2 px-6 border rounded-lg border-gray-600 outline-none bg-gray-700 w-full"
              placeholder="Correo electrónico..."
              {...loginRegister("email", { required: "Correo requerido" })}
            />
            {loginErrors.email && (
              <p className="text-red-400 text-sm mt-1">
                {loginErrors.email.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <input
              type="password"
              className="py-2 px-6 border rounded-lg border-gray-600 outline-none bg-gray-700 w-full"
              placeholder="Contraseña..."
              {...loginRegister("password", {
                required: "Contraseña requerida",
              })}
            />
            {loginErrors.password && (
              <p className="text-red-400 text-sm mt-1">
                {loginErrors.password.message}
              </p>
            )}
          </div>

          <ButtonLink
            text="Iniciar Sesión"
            onClick={handleLoginSubmit(onLogin)}
            className="text-[1.2rem] font-semibold"
          />
        </div>
      </div>

      {/* REGISTER */}
      <div className="bg-black/50 py-6 px-6 rounded-lg shadow-sm w-96 my-6">
        <h2 className="text-white font-bold text-2xl text-center mb-4">
          Registrarse
        </h2>
        <div className="flex flex-col gap-5 justify-center items-center">
          <div className="w-full">
            <input
              type="email"
              className="py-2 px-6 border rounded-lg border-gray-600 outline-none bg-gray-700 w-full"
              placeholder="Correo electrónico..."
              {...registerRegister("email", { required: "Correo requerido" })}
            />
            {registerErrors.email && (
              <p className="text-red-400 text-sm mt-1">
                {registerErrors.email.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <input
              type="password"
              className="py-2 px-6 border rounded-lg border-gray-600 outline-none bg-gray-700 w-full"
              placeholder="Contraseña..."
              {...registerRegister("password", {
                required: "Contraseña requerida",
              })}
            />
            {registerErrors.password && (
              <p className="text-red-400 text-sm mt-1">
                {registerErrors.password.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <input
              type="password"
              className="py-2 px-6 border rounded-lg border-gray-600 outline-none bg-gray-700 w-full"
              placeholder="Confirmar contraseña..."
              {...registerRegister("confirmPassword", {
                required: "Confirmación requerida",
                validate: (value) =>
                  value === watch("password") || "Las contraseñas no coinciden",
              })}
            />
            {registerErrors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">
                {registerErrors.confirmPassword.message}
              </p>
            )}
          </div>

          <ButtonLink
            text="Registrarse"
            onClick={handleRegisterSubmit(onRegister)}
            className="text-[1.2rem] font-semibold"
            color="blue"
          />
        </div>
      </div>
    </div>
  );
}

export default Auth;
