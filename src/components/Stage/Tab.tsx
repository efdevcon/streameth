const Tab = ({
  index,
  currentIndex,
  setIndex,
  children,
}: {
  index: number
  currentIndex: number
  setIndex: (index: number) => void
  children: React.ReactNode
}) => {
  return (
    <div
      className={`${currentIndex === index ? 'bg-black text-white' : 'bg-white text-black'} p-1 w-full border-2 border-black opacity-80`}
      onClick={() => {
        setIndex(index)
      }}>
      {children}
    </div>
  )
}

export default Tab
