import {
  FacebookShareButton,
  FacebookIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import styles from './ShareBox.module.scss'
import { useState } from 'react'

interface Props {
  title: string
}

export function ShareBox({ title }: Props) {
  const [buttonText, setButtonText] = useState('Copy')
  const url = window.location.href

  return (
    <div className={styles.box}>
      <div className={styles.box__title}>Share via...</div>
      <div className={styles.box__shareIcons}>
        <FacebookShareButton url={url} title={title}>
          <FacebookIcon />
          Facebook
        </FacebookShareButton>
        <TelegramShareButton url={url} title={title}>
          <TelegramIcon />
          Telegram
        </TelegramShareButton>
        <RedditShareButton url={url} title={title}>
          <RedditIcon />
          Reddit
        </RedditShareButton>
        <TwitterShareButton url={url} title={title}>
          <TwitterIcon />
          Twitter
        </TwitterShareButton>
      </div>
      <div className={styles.box__copy}>
        <div className={styles.box__copy__box}>{url}</div>
        <CopyToClipboard text={url} onCopy={() => setButtonText('Copied')}>
          <button className={styles.box__copy__button}>{buttonText}</button>
        </CopyToClipboard>
      </div>
    </div>
  )
}
