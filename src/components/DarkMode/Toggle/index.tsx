import { useState, useEffect } from 'react'
import { Switch } from '@headlessui/react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import styles from './DarkModeToggle.module.scss'

export default function DarkModeToggle() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light'

    localStorage.setItem('theme', theme)
    setEnabled(theme === 'dark')
  }, [])

  const setWindowTheme = (isEnabled: boolean) => {
    const html = document.querySelector('html')

    if (html) {
      if (isEnabled) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    }
  }

  const toggleDarkMode = (isEnabled: boolean) => {
    setEnabled(isEnabled)
    localStorage.setItem('theme', isEnabled ? 'dark' : 'light')

    setWindowTheme(isEnabled)
  }

  return (
    <Switch checked={enabled} onChange={toggleDarkMode} className={`${styles.toggle} ${enabled ? styles.active : ''}`}>
      <span className="sr-only">Dark Mode toggle</span>
      <span className={`${styles.toggle__switch} ${enabled ? styles.active : ''}`}>
        <span className={`${styles.toggle__light} ${enabled ? styles.active : ''}`} aria-hidden="true">
          <SunIcon className={styles.icon} />
        </span>
        <span className={`${styles.toggle__dark} ${enabled ? styles.active : ''}`} aria-hidden="true">
          <MoonIcon className={styles.icon} />
        </span>
      </span>
    </Switch>
  )
}
