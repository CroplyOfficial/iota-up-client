import { logout } from "../../../actions/userActions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
export const DashboardLogout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
  }, []);
  return <></>;
};
