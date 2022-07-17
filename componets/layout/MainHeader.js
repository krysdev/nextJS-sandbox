import Link from 'next/link'
import style from './MainHeader.module.css'

function MainHeader() {
  
  return (
    <header className={style.header}>
      <div className={style.logo}>
        <Link href='/'>NextEvents</Link>
      </div>
      <nav className={style.navigation}>
        <ul>
          <li>
            <Link href='/events'>Browse all events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader