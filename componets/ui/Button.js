import Link from "next/link";
import style from "./Button.module.css";

function Button(props) {
  if (props.linkprop) {
    return (
      <Link href={props.linkprop}>
        <a className={style.btn}>{props.children} [LINK]</a>
      </Link>
    );
  }
  return (
    <button className={style.btn} onClick={props.handleClick}>
      {props.children}
    </button>
  );
}

export default Button;
