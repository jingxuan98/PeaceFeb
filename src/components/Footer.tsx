import styles from 'styles/Home.module.scss'
import { ThemeToggleButton, ThemeToggleList } from 'components/Theme'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* <div>
        <ThemeToggleList />
      </div> */}
      <div className="flex items-center justify-center">© 2023 - PeaceFeb</div>

      <div className="flex items-center">
        {/* <ThemeToggleButton />
        <ThemeToggleList /> */}
      </div>
    </footer>
  )
}
