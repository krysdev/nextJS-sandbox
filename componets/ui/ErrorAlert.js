import style from './ErrorAlert.module.css';

function ErrorAlert(props) {
  return <div className={style.alert}>{props.children}</div>;
}

export default ErrorAlert;
