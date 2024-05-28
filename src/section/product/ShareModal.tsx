import { useState } from "react"
import IconsTooltips from "../../components/IconsTooltips"
import { IProduct } from "../../types/product"
import { FaShareNodes } from "react-icons/fa6"
import { IconType } from "react-icons"
import {
  EmailShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  TelegramShareButton,
  FacebookShareButton,
  PinterestShareButton,
  LinkedinShareButton,
  EmailIcon,
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
  PinterestIcon,
  LinkedinIcon,
} from "react-share"

type Props = {
  product: IProduct
  url: string
}

const ShareModal = ({ product, url: shareUrl }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }
  const handleShare2 = () => {}

  const handleShare = () => {}

  const shareButtons = [
    {
      platform: "Facebook",
      button: (
        <FacebookShareButton
          //   quote="See what I found on Africa’s leading social marketplace for secondhand Pre-loved fashion & items"
          hashtag="#Repeddle"
          url={shareUrl}
          onShareWindowClose={handleShare}
        >
          <ShareButton
            shareText="Facebook"
            Icon={FacebookIcon}
            rounded
            handleShare={handleShare2}
          />
        </FacebookShareButton>
      ),
    },
    {
      platform: "Email",
      button: (
        <EmailShareButton
          subject="Repeddle"
          body="See what I found on Africa’s leading social marketplace for secondhand Pre-loved fashion & items"
          url={shareUrl}
          onShareWindowClose={handleShare}
        >
          <ShareButton
            shareText="Email"
            Icon={EmailIcon}
            rounded
            handleShare={handleShare2}
          />
        </EmailShareButton>
      ),
    },
    {
      platform: "WhatsApp",
      button: (
        <WhatsappShareButton
          url={shareUrl}
          title="See what I found on Africa’s leading social marketplace for secondhand Pre-loved fashion & items"
          onShareWindowClose={handleShare}
        >
          <ShareButton
            shareText="WhatsApp"
            Icon={WhatsappIcon}
            rounded
            handleShare={handleShare2}
          />
        </WhatsappShareButton>
      ),
    },
    {
      platform: "Twitter",
      button: (
        <TwitterShareButton
          title="See what I found on Africa’s leading social marketplace for secondhand Pre-loved fashion & items"
          hashtags={["Repeddle"]}
          url={shareUrl}
          onShareWindowClose={handleShare}
        >
          <ShareButton
            shareText="Twitter"
            Icon={TwitterIcon}
            rounded
            handleShare={handleShare2}
          />
        </TwitterShareButton>
      ),
    },
    {
      platform: "Telegram",
      button: (
        <TelegramShareButton
          url={shareUrl}
          title="See what I found on Africa’s leading social marketplace for secondhand Pre-loved fashion & items"
          onShareWindowClose={handleShare}
        >
          <ShareButton
            shareText="Telegram"
            Icon={TelegramIcon}
            rounded
            handleShare={handleShare2}
          />
        </TelegramShareButton>
      ),
    },
    {
      platform: "Pinterest",
      button: (
        <PinterestShareButton
          url={shareUrl}
          media={product.images[0]}
          onShareWindowClose={handleShare}
          description="See what I found on Africa’s leading social marketplace for secondhand Pre-loved fashion & items"
        >
          <ShareButton
            shareText="Pinterest"
            Icon={PinterestIcon}
            rounded
            handleShare={handleShare2}
          />
        </PinterestShareButton>
      ),
    },
    {
      platform: "LinkedIn",
      button: (
        <LinkedinShareButton
          title="Repeddle"
          url={shareUrl}
          source={shareUrl}
          summary={`See what I found on Africa’s leading social marketplace for secondhand Pre-loved fashion & items ${shareUrl}`}
          //   description={`See what I found on Africa’s leading social marketplace for secondhand Pre-loved fashion & items ${shareUrl}`}
          onShareWindowClose={handleShare}
        >
          <ShareButton
            handleShare={handleShare2}
            shareText="LinkedIn"
            Icon={LinkedinIcon}
          />
        </LinkedinShareButton>
      ),
    },
  ]

  return (
    <div className="relative">
      <div className="relative mr-[30px]">
        <div className="flex items-center peer">
          {product.shares.length}
          <FaShareNodes
            onClick={toggleDropdown}
            className="ml-[5px] hover:text-orange-color"
          />
        </div>
        <IconsTooltips classNames="peer-hover:opacity-100" tips="Share " />
      </div>
      {isDropdownOpen && (
        <div className="fixed inset-0" onClick={toggleDropdown} />
      )}
      {isDropdownOpen && (
        <div
          className={`absolute rounded shadow-[0_2px_4px_rgba(0,0,0,0.2)] overflow-hidden transition-[max-height]
        duration-[0.3s] ease-[ease] z-[100] p-[5px] right-0 top-[30px] md:top-[60px] bg-light-ev1 dark:bg-dark-ev1
        ${isDropdownOpen ? "max-h-[300px]" : "max-h-0"}`}
        >
          <div className="flex flex-col gap-1 mt-[5px]">
            {shareButtons.map(({ button }) => (
              <>{button}</>
            ))}
            <button
              className={`rounded flex items-center cursor-pointer transition-[background-color] duration-300
              ease-[ease] px-2 py-1 border-none bg-none dark:hover:bg-dark-ev2 hover:bg-light-ev2`}
              onClick={handleShare2}
            >
              <FaShareNodes size={25} />
              <div className="ml-2 text-black-color dark:text-white-color">
                More...
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShareModal

type ShareButtonProps = {
  shareText: string
  Icon: IconType | typeof FacebookIcon
  rounded?: boolean
  handleShare: () => void
}

const ShareButton = ({
  shareText,
  Icon,
  rounded,
  handleShare,
}: ShareButtonProps) => {
  return (
    <button
      className={`rounded flex items-center cursor-pointer transition-[background-color] duration-300
    ease-[ease] px-2 py-1 border-none bg-none dark:hover:bg-dark-ev2 hover:bg-light-ev2`}
      onClick={handleShare}
    >
      <Icon size={25} round={rounded} />
      <div className="ml-2 text-black-color dark:text-white-color">
        {shareText}
      </div>
    </button>
  )
}
