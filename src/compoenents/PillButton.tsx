type Props = {
  name: string
  onClick?: () => void
}

export const PillButton = ({ name, onClick }: Props) => {
  return (
    <div
      className='cursor-pointer bg-blue-100 text-white h-min w-max py-2 px-5 flex justify-center rounded-full'
      onClick={onClick}
    >
      {name}
    </div>
  )
}
