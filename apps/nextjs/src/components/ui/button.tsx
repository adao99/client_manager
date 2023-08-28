import { type ComponentProps } from "react";

export const Button = (props: ComponentProps<"button">) => {
  return (
    <button
      {...props}
      className={["btn btn-outline", props.className].join(" ")}
    >
      {props.children}
    </button>
  );
};

export default Button;
