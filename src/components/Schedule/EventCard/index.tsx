import { Session } from 'types'
import Style from './EventCard.module.scss'
import { DateDetail, StageDetail, UserAvatar } from 'components/Session/SessionDetails'

interface Props {
  session: Session
}

export default function EventCard(props: Props) {
  const { name, start, end, stage, speakers, id, video } = props.session

  return (
    <div className="flex flex-col p-5 my-5 border-[#757575] border-2 box-border w-full lg:max-w-md rounded-lg">
      <div className={Style.box__title}>{name}</div>
      <div className={Style.box__details}>
        <DateDetail start={start} end={end} />
        <StageDetail stage={stage.name} />
      </div>
      <div className={Style.box__speakers}>
        {speakers.map((speaker) => (
          <UserAvatar key={speaker.id} avatarUrl={speaker.avatarUrl} />
        ))}
        <a className={Style.box__speaker__learn_more} href={`/session/${id}`}>
          Learn more
        </a>
      </div>
    </div>
  )
}
