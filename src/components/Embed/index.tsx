import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useState } from 'react'
import { Stage } from 'types'
interface Props {
  stageId: Stage["id"]
}


export default function Embed({ ...props }: Props) {
  const [buttonText, setButtonText] = useState('Copy')

  const generateEmbedCode = () => {
    const url = window.location.href
    return `<iframe src="${url}embed/${props.stageId}" width="100%" height="100%" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`
  }
  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-5">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <span className="round text-lg mb-4">Easily embed this stream into your website by adding the iframe code below</span>
        <div className="flex justify-between">
        <div className="bg-gray-100 px-2 py-1 border border-gray-200 w-full max-w-[250px] overflow-hidden whitespace-nowrap">{generateEmbedCode()}</div>
        {/* <CopyToClipboard text={generateEmbedCode()} onCopy={() => setButtonText('Copied')}>
          <button className="px-3 py-1 ml-3 bg-gray-300">{buttonText}</button>
        </CopyToClipboard> */}
      </div>
      </div>
    </div>
  )
}