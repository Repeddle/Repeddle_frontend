import LoadingBox from "./LoadingBox";
import { FaRightLeft } from "react-icons/fa6";
import { IConversation } from "../types/conversation";
import { productDetails, user as userData } from "../utils/data";
import { imageUrl } from "../services/api";

type Props = {
  conversation: IConversation;
  currentChat?: string;
};

const Conversation = ({ conversation, currentChat }: Props) => {
  const loading = false;

  const user1 = userData;
  const user2 = userData;
  const product = productDetails;

  return loading ? (
    <LoadingBox />
  ) : (
    <>
      <div
        className={`relative cursor-pointer flex items-center p-2.5 lg:px-[25px] py-2.5 ${
          currentChat === conversation._id
            ? "bg-light-ev3 dark:bg-dark-ev3"
            : ""
        }`}
      >
        <div className="flex flex-col items-center">
          <img
            className="w-[60px] h-[60px] object-cover object-top mx-2.5 my-0 rounded-[50%]"
            src={imageUrl + user1.image}
          />
          <div className="font-bold text-orange-color capitalize">
            {user1.username}
          </div>
        </div>
        <FaRightLeft />
        <div className="flex flex-col items-center">
          <img
            className="w-[60px] h-[60px] object-cover object-top mx-2.5 my-0 rounded-[50%]"
            src={imageUrl + user2.image}
          />
          <div className="font-bold text-orange-color capitalize">
            {user2.username}
          </div>
        </div>

        {/* TODO: previous codes  */}
        {/* {(conversation.productId || conversation.userId) && ( */}
        {conversation.productId && (
          <>
            On{" "}
            <img
              className="w-[60px] h-[60px] object-cover ml-2.5"
              src={imageUrl + product.images[0]}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Conversation;
