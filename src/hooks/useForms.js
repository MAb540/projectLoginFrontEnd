import axios from "axios";
import { useReducer } from "react";

export default function useForms(route) {
  const [state, setState] = useReducer((_, action) => action, {
    isLoading: false,
  });

  const submitForm = async (data) => {
    setState({ isLoading: true });

    console.log(data);

    try {
      const res = await axios.post(`http://localhost:5000/api/${route}`, data);
      // console.log(res.data);
      setState({ isSuccess: true, data: res.data });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);

        setState({ isError: true, error: error.response.data });
      }
    }
  };

  return {
    submitForm,
    state,
  };
}
