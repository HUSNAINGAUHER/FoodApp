type Props = {
  name: string
  onClick?: () => void
}

export const Button = ({ name, onClick }: Props) => {
  return (
    <div
      className='cursor-pointer bg-blue-100 text-white font-bold w-full py-3 px-5 flex justify-center rounded-lg'
      onClick={onClick}
    >
      {name}
    </div>
  )
}
