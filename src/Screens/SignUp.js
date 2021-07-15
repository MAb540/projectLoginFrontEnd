import React, { useState } from "react";
import useInput from "../hooks/useInput";
import useForms from "../hooks/useForms";
import Alert from '../Components/Alert';
import "./forms.css";

function SignUp() {
  const namePattern = "^[A-Za-z0-9]{3,30}";
  const numberPattern = "";
  const passwordPattern = "^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-@]{6,30}";

  const [usernameValue, usernameReset, usernameBind] = useInput(
    "",
    namePattern
  );
  const [phoneNumberValue, phoneNumberReset, phoneNumberBind] = useInput(
    "",
    numberPattern
  );
  const [passwordValue, passwordReset, passwordBind] = useInput(
    "",
    passwordPattern
  );
  const [matchPasswordValue, matchPasswordReset, matchPasswordBind] = useInput(
    "",
    passwordPattern
  );

  const [error, setIsError] = useState(false);

  const { submitForm, state } = useForms('signup');

  const submitHandler = (e) => {
    e.preventDefault();

    if (passwordValue !== matchPasswordValue) {
      setIsError(true);
      return;
    }
    submitForm({
      username: usernameValue,
      phoneNumber: phoneNumberValue,
      password: passwordValue,
    });

    usernameReset();
    phoneNumberReset();
    passwordReset();
    matchPasswordReset();
  };



  return (
    <div className="form-div">
      <form className="form-main form-div" onSubmit={submitHandler}>
        <h2 className="pb-4 text-2xl">Sign Up</h2>

        {error && (
          <Alert Message={"Passwords do not match"} variant="red" visible={true} />
        )}
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
        <div className="  ">
          <label htmlFor="phoneNumber">phoneNumber</label>
          <br />
          <input
            className="input-field"
            type="number"
            name="phoneNumber"
            {...phoneNumberBind}
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
          <label htmlFor="password-match">Password-match</label>
          <br />
          <input
            type="password"
            name="password-match"
            className="input-field"
            {...matchPasswordBind}
          />
        </div>

        <div>
          <button type="submit" className="form-btn">
            Register
          </button>
        </div>

        <p className="form-text">
          Already have an account? <a href="/login">LogIn</a>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
