import React, { useEffect } from "react";
import useInput from "../hooks/useInput";
import { useStore } from "../store";
import Alert from "../Components/Alert";
import "./forms.css";
import useForms from "../hooks/useForms";
import { useHistory } from "react-router-dom";

const codePattern = "[0-9]{1}";

function VerifyCode() {
  const [cd1, cd1Reset, cd1Bind] = useInput("", codePattern);
  const [cd2, cd2Reset, cd2Bind] = useInput("", codePattern);
  const [cd3, cd3Reset, cd3Bind] = useInput("", codePattern);
  const [cd4, cd4Reset, cd4Bind] = useInput("", codePattern);
  const [cd5, cd5Reset, cd5Bind] = useInput("", codePattern);
  const [cd6, cd6Reset, cd6Bind] = useInput("", codePattern);

  const stateOfAuth = useStore((state) => state.stateOfAuth);
  const setStateOfAuth = useStore((state) => state.setStateOfAuth);
  const loginUsername = useStore((state) => state.loginUsername);
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);

  const { submitForm, state } = useForms("verify");

  const submitHandler = (e) => {
    e.preventDefault();

    let code = cd1 + cd2 + cd3 + cd4 + cd5 + cd6;

    submitForm({
      username: loginUsername,
      code: code,
    });

    cd1Reset();
    cd2Reset();
    cd3Reset();
    cd4Reset();
    cd5Reset();
    cd6Reset();
  };
  let history = useHistory();
  useEffect(() => {
    setTimeout(() => {
      if (state.isSuccess) {
        localStorage.setItem("valid", `${state.data.valid}`);
        setStateOfAuth(false);
        setIsLoggedIn(true);
        localStorage.removeItem("stateOfAuth");

        history.push("/");
      }
    }, 3000);
  }, [history, setIsLoggedIn, setStateOfAuth, state.data, state.isSuccess]);

  return stateOfAuth ? (
    <div className="form-div">
      <form className="form-main form-div" onSubmit={submitHandler}>
        <h2 className="pb-4 text-2xl">Verify</h2>

        {state.isLoading && <div>Loading...</div>}
        {state.isError && (
          <Alert Message={state.error.error} variant="red" visible={true} />
        )}
        {state.isSuccess && (
          <Alert Message={state.data.message} variant="green" visible={true} />
        )}

        <div className="form-verify">
          <input
            className="form-verify-input"
            type="number"
            name="cd1"
            {...cd1Bind}
          />

          <input
            className="form-verify-input"
            type="number"
            name="cd2"
            {...cd2Bind}
          />

          <input
            className="form-verify-input"
            type="number"
            name="cd3"
            {...cd3Bind}
          />

          <input
            className="form-verify-input"
            type="number"
            name="cd4"
            {...cd4Bind}
          />

          <input
            className="form-verify-input"
            type="number"
            name="cd5"
            {...cd5Bind}
          />

          <input
            className="form-verify-input"
            type="number"
            name="cd6"
            {...cd6Bind}
          />
        </div>

        <div>
          <button type="submit" className="form-btn">
            Verify
          </button>
        </div>

        <p className="form-text">Didn't receive the code?</p>
        <p>
          <a href="/">Send code again</a>
        </p>
      </form>
    </div>
  ) : (
    <Alert
      Message={"Opps! 404 , no Such route exist"}
      variant="red"
      visible={true}
    />
  );
}

export default VerifyCode;
