import { useHistory } from "react-router";

interface IProps {
  to: string;
  children: any;
  className: string;
  style?: any;
}
export const LinkToTop = ({ to, children, className, style }: IProps) => {
  const history = useHistory();

  const handleOnClick = () => {
    console.log("asdf");
    window.scrollTo(0, 0);
    history.push(to);
  };

  return (
    <span
      onClick={handleOnClick}
      className={className}
      style={{ cursor: "pointer", ...style }}
    >
      {children}
    </span>
  );
};
