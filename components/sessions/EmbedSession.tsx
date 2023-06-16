export default function EmbedSessionModal({ stageId }: { stageId: string }) {
  const generateEmbedCode = () => {
    const url = window.location.href;
    return `<iframe src="${url}embed/${stageId}" width="100%" height="100%" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-5">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <span className=" text-md mb-4">
          Easily embed this stream into your website by adding the iframe code
          below
        </span>
        <div className="bg-gray-100 px-2 py-1 border border-gray-200 w-full max-w-full overflow-hidden whitespace-nowrap">
          {generateEmbedCode()}
        </div>
      </div>
    </div>
  );
}
