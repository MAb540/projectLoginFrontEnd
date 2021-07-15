import useInput from "../hooks/useInput";
import useForms from "../hooks/useForms";
import Alert from "../Components/Alert";
import "./forms.css";
import { useEffect } from "react";
import { useStore } from "../store";
import { useHistory } from "react-router-dom";

function Login() {
  const namePattern = "^[A-Za-z0-9]{3,30}";

  const passwordPattern = "^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-@]{6,30}";

  const [usernameValue, usernameReset, usernameBind] = useInput(
    "",
    namePattern
  );

  const [passwordValue, passwordReset, passwordBind] = useInput(
    "",
    passwordPattern
  );

  const { submitForm, state } = useForms("login");

  const submitHandler = (e) => {
    e.preventDefault();

    submitForm({
      username: usernameValue,
      password: passwordValue,
    });

    usernameReset();
    passwordReset();
  };

  const setStateOfAuth = useStore((state) => state.setStateOfAuth);
  const setloginUsername = useStore((state) => state.setloginUsername);

  useEffect(() => {
    if (state.isSuccess) {
      setloginUsername(state.data.username);
      console.log(state.data.username);
      setStateOfAuth(true);
    }
  }, [setStateOfAuth, setloginUsername, state.data, state.isSuccess]);

  let history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      if (state.isSuccess) {
        history.push("/verify");
      }
    }, 3000);
  }, [history, state.isSuccess]);

  return (
    <div className="form-div">
      <form className="form-main form-div" onSubmit={submitHandler}>
        <h2 className="pb-4 text-2xl">Login</h2>

        {state.isLoading && <div>Loading...</div>}
        {state.isError && (
          <Alert Message={state.error.error} variant="red" visible={true} />
        )}
        {state.isSuccess && (
          <Alert Message={state.data.message} variant="green" visible={true} />
        )}

        <div className="  ">
          <label htmlFor="username">Username</label>
          <br />
          <input
            className="input-field"
            type="text"
            name="username"
            {...usernameBind}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            className="input-field"
            {...passwordBind}
          />
        </div>

        <div>
          <button type="submit" className="form-btn">
            Login
          </button>
        </div>

        <p className="form-text">
          Want to Register? <a href="/signup">Signup</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
