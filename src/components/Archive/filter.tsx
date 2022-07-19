import css from './filter.module.scss'
import IconFilter from 'assets/icons/icon_filter.svg'
import IconExpandMore from 'assets/icons/icon_expand_more.svg'
import IconExpandLess from 'assets/icons/icon_expand_less.svg'
import { useState } from 'react'

interface Props {
  filters: {
    [key: string]: string[]
  }
  onFilter: (filter: any) => void
  className?: string
}

export function Filter(props: Props) {
  let className = `${css.container}`
  if (props.className) className += ` ${props.className}`
  const [open, setOpen] = useState(false)
  const [activeFilter, setActiveFilters] = useState<any>({})
  const [filters, setFilters] = useState([] as string[])

  async function filter(key: string, value: string) {
    let newFilter = { ...activeFilter }
    if (activeFilter[key] && activeFilter[key].includes(value)) {
      newFilter = {
        ...activeFilter,
        [key]: activeFilter[key].filter((i: any) => i !== value),
      }
    } else {
      newFilter = {
        ...activeFilter,
        [key]: activeFilter[key] ? [...activeFilter[key], value] : [value],
      }
    }

    props.onFilter(newFilter)
    setActiveFilters(newFilter)
  }

  async function togglePanels(filter: string) {
    setFilters(filters.includes(filter) ? filters.filter((i: any) => i !== filter) : [...filters, filter])
  }

  return (
    <section className={className}>
      <div className={css.toggle} onClick={() => setOpen(!open)}>
        <strong>Filter</strong>
        <IconFilter />
      </div>
      {open && (
        <div className={css.panel}>
          {Object.keys(props.filters).map((key) => {
            return (
              <div key={key} className={css.filter}>
                <div className={css.header} onClick={() => togglePanels(key)}>
                  <p>{key}</p>
                  <span className={css.icon}>{filters.includes(key) ? <IconExpandMore /> : <IconExpandLess />}</span>
                </div>
                {filters.includes(key) && (
                  <div className={css.tags}>
                    {props.filters[key].map((i) => {
                      const active = activeFilter[key] && activeFilter[key].includes(i)
                      return (
                        <span key={i} className={active ? css.active : css.tag} onClick={() => filter(key, i)}>
                          {i}
                        </span>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
