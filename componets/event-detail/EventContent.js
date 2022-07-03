import style from './EventContent.module.css';

function EventContent(props) {
  return (
    <section className={style.content}>
      {props.children}
    </section>
  );
}

export default EventContent;
