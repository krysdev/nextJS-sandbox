import Button from '../ui/Button';
import style from './ResultsTitle.module.css';

function ResultsTitle(props) {
  const { date } = props;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className={style.title}>
      <h1>Events in {humanReadableDate}</h1>
      <Button linkprop='/events'>Show all events</Button>
    </section>
  );
}

export default ResultsTitle;
