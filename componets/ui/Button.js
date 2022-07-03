import Link from "next/link";
import style from "./Button.module.css";

function Button(props) {
  return (
    <Link href={props.linkprop}>
      <a className={style.btn}>{props.children}</a>
    </Link>
  );
}

export default Button;
