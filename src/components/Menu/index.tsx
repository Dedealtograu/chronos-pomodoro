import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react'
import styles from './styles.module.css'
import { useState, useEffect } from 'react'

type AvaliableThemes = 'light' | 'dark'

export function Menu() {
  const [theme, setTheme] = useState<AvaliableThemes>(() => {
    const storageTheme = (localStorage.getItem('theme') as AvaliableThemes) || 'dark'
    return storageTheme
  })

  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  }

  function toggleTheme(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault()

    setTheme(prevTheme => {
      const nextTheme = prevTheme === 'light' ? 'dark' : 'light'
      return nextTheme
    })
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <nav className={styles.menu}>
      <a className={styles.menuLink} href='#' aria-label='Ir para a Home' title='Ir para a Home'>
        <HouseIcon />
      </a>

      <a className={styles.menuLink} href='#' aria-label='Ver histórico' title='Ver histórico'>
        <HistoryIcon />
      </a>

      <a className={styles.menuLink} href='#' aria-label='Configurações' title='Configurações'>
        <SettingsIcon />
      </a>

      <a className={styles.menuLink} href='#' aria-label='Mudar tema' title='Mudar tema' onClick={toggleTheme}>
        {nextThemeIcon[theme]}
      </a>
    </nav>
  )
}
