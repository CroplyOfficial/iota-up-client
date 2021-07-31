import { Typography } from "@material-ui/core/styles/createTypography";
import { HTMLProps } from "react";

interface IProps {
  tags: string[];
  onChange?: () => void;
  variant: "static" | "editable";
}
export const HeaderTags = (props: IProps & HTMLProps<HTMLElement>) => {
  const { tags } = props;
  return (
    <div className={props.className}>
      {tags.map((t, i) => (
        <span key={"tag#" + i++}>{t}</span>
      ))}
    </div>
  );
};
