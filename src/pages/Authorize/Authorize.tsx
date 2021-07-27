import { useDispatch } from "react-redux";
import { login } from "../../actions/userActions";
import { useEffect } from "react";

const Authorize = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const type = window.location.href.split("type=")[1].split("&")[0];
    const code = window.location.href.split("&code=")[1].split("&")[0];

    dispatch(login(type, code));
  }, []);

  return <div>Loading</div>;
};

export { Authorize };
