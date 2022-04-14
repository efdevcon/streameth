import { TITLE } from 'utils/constants'

export default function WidgetHeader() {
  return (
    <div className="widget__header">
      <h1 className="bold"></h1>
      <div className="widget__header__attribution">
        <div className="widget__header__powered text-bold">Streaming on:</div>
        <a href="https://livepeer.org" rel="noopener" target="_blank">
          <img className="widget__header__logo" src="/livepeer_logo_dark.png" />
        </a>
      </div>
    </div>
  )
}
