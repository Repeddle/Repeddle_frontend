const AddressBook = () => {
  // const loadingAddress = false
  // const error = ""
  // const addresses = []

  return (
    <div className="mb-2.5 m-0 p-2.5 flex-[4] lg:mt-5 lg:mx-5 lg:my-0 lg:p-5 rounded-[0.2rem] bg-light-ev1 dark:bg-dark-ev1">
      <div className="mb-5">
        <h1 className="text-[28px]"> AddressBook</h1>
      </div>
      {/* <div>
        {loadingAddress ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox>{error}</MessageBox>
        ) : addresses?.length ? (
          addresses.map((address) => (
            <div
              className="flex flex-col justify-between m-5 p-5 rounded-[0.2rem] bg-light-ev2 dark:bg-dark-ev2"
              key={address._id}
            >
              <div className="flex items-center">
                <FaHouse className="text-xl ml-[15px]" />
                <div className="font-bold text-orange-color capitalize mx-[15px] my-0">
                  {address.meta.deliveryOption}
                </div>
              </div>
              {Object.entries(address.meta).map(([key, value]) => (
                <div className="flex">
                  <div className="flex-1 capitalize font-medium">{key}:</div>
                  <div className="flex-[5]">{value}</div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <MessageBox>
            You have not added a shipping address, add one now.
          </MessageBox>
        )}
      </div> */}
    </div>
  )
}

export default AddressBook
