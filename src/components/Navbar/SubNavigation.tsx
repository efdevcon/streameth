import Container from 'components/Container'

const SubNavigation = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-black opacity-80 border border-transparent py-2 space-y-2 min-h-[5rem]">
      <Container>{children}</Container>
    </div>
  )
}

export default SubNavigation
