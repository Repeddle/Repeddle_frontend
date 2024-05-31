type Props = {
  onWishlist: () => void
  onConfirm: () => void
  message: string
}

const AlertComponent = ({ message, onConfirm, onWishlist }: Props) => {
  return (
    <div className="p-2 items-center">
      <p className="text-lg mb-[15px] text-center mt-[25px]">{message}</p>
      <div className="flex w-full gap-2.5 justify-end">
        <div
          className="rounded-[5px] p-[10] items-center cursor-pointer"
          onClick={onWishlist}
        >
          <span className="text-malon-color text-lg">Add to wishlist</span>
        </div>
        <div
          className="rounded-[5px] p-[10] items-center cursor-pointer"
          onClick={onConfirm}
        >
          <span className="text-orange-color text-lg">Confirm</span>
        </div>
      </div>
    </div>
  )
}

export default AlertComponent
