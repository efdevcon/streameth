import { Speaker } from 'types'
import css from './SpeakerIcon.module.scss'

interface Props {
    speaker: Speaker
    size?: 'sm' | 'md'
    onSpeakerClick?: (speaker: Speaker) => void
}

export default function EthBerlinSpeakerIcon({ speaker, onSpeakerClick, size = 'sm' }: Props) {
    return (
        <div
            onClick={() => onSpeakerClick?.(speaker)}
            className={`${css[size]} ${onSpeakerClick ? css.pointer : ''} shrink-0`}>
            <img src={`/ethberlin/${speaker.name.charAt(0)}.png`} className='rounded-full' />
        </div>
    )
}
