import { Session } from 'types'
import Style from './EventCard.module.scss'
import { DateDetail, StageDetail, UserAvatar } from 'components/Session/SessionDetails'

interface Props {
  session: Session
}

export default function EventCard(props: Props) {
  const { name, start, end, stage, speakers, id, video } = props.session

  return (
    <div className={Style.box}>
      <div className={Style.box__title}>{name}</div>
      <div className={Style.box__details}>
        <DateDetail start={start} end={end} />
        <StageDetail stage={stage} />
      </div>
      <div className={Style.box__speakers}>
        {speakers.map((speaker) => (
          <UserAvatar key={speaker.id} avatarUrl={speaker.avatarUrl} />
        ))}
        <a className={Style.box__speaker__learn_more} href={video?.url}>
          Watch &raquo;
        </a>
      </div>
    </div>
  )
}
