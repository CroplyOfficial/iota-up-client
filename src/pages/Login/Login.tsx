import { API } from "../../config";

const Login = () => {
  return (
    <div>
      <a href={`${API}/users/authgoogle`}>
        <button>Login with Google</button>
      </a>
      <a href={`${API}/users/authlinkedin`}>
        <button>Login with Linkedin</button>
      </a>
      <a href={`${API}/users/authfacebook`}>
        <button>Login with Facebook</button>
      </a>
    </div>
  );
};

export { Login };
