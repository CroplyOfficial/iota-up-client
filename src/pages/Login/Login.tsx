import { AUTH_ROOT } from "../../config";

interface IProps {
  toggleLoginModal: () => void;
}
const Login = (props: IProps) => {
  return (
    <div>
      <a href={`${AUTH_ROOT}/users/authgoogle`}>
        <button>Login with Google</button>
      </a>
      <a href={`${AUTH_ROOT}/users/authlinkedin`}>
        <button>Login with Linkedin</button>
      </a>
      <a href={`${AUTH_ROOT}/users/authfacebook`}>
        <button>Login with Facebook</button>
      </a>
    </div>
  );
};

export { Login };
