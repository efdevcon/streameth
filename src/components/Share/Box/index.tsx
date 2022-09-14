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
    <div className="space-y-4">
      <div className="text-lg">Share via...</div>
      <div className="flex space-x-4 justify-center">
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
      <div className="flex justify-between">
        <div className="bg-gray-100 px-2 py-1 grow border border-gray-200">{url}</div>
        <CopyToClipboard text={url} onCopy={() => setButtonText('Copied')}>
          <button className="px-3 py-1 ml-3 bg-gray-300">{buttonText}</button>
        </CopyToClipboard>
      </div>
    </div>
  )
}
