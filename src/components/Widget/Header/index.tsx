import { TITLE } from 'utils/constants'

export default function WidgetHeader() {
  return (
    <div className="widget__header">
      <h1 className="bold">{TITLE}</h1>
      <div className="widget__header__attribution">
        <div className="widget__header__powered text-bold">Streaming on:</div>
        <img className="widget__header__logo" src="/livepeer_logo_dark.png" />
      </div>
    </div>
  )
}
