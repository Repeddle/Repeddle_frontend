import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import SellHero from "../../section/sell/SellHero"
import SellSteps from "../../section/sell/SellSteps"
import WhatToSell from "../../section/sell/WhatToSell"
import SellRebatch from "../../section/sell/SellRebatch"
import SellBulkAndSlot from "../../section/sell/SellBulkAndSlot"
import WhySell from "../../section/sell/WhySell"
import WhatYouGetSell from "../../section/sell/WhatYouGetSell"
import WhatToBuy from "../../section/sell/WhatToBuy"

const Sell = () => {
  const { user } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (user && user.role === "Seller") {
      navigate("/newProduct")
    }
  }, [navigate, user])

  return (
    <div className="mx-[5vw] my-0 lg:mx-[10vw]">
      <SellHero />

      <SellSteps />

      <WhatToSell />

      <SellRebatch />

      <SellBulkAndSlot />

      <div className="block lg:hidden opacity-20 w-full h-px" />

      <WhySell />

      <WhatYouGetSell />

      <WhatToBuy />
    </div>
  )
}

export default Sell
