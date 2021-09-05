import { useHistory } from "react-router";

interface IProps {
  to: string;
  children: any;
  className?: string;
  style?: any;
  onClick?: Function;
}
export const LinkToTop = ({
  to,
  children,
  className,
  style,
  onClick,
}: IProps) => {
  const history = useHistory();

  const handleOnClick = () => {
    if (onClick) {
      onClick();
    }
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
