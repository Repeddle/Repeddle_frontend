import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import useMessage from "../../hooks/useMessage";
import { BiSupport } from "react-icons/bi";
import { MdReport } from "react-icons/md";

function Tabs() {
  const { currentTab, setCurrentTab } = useMessage();
  return (
    <div className="w-[15%] bg-light-ev4 dark:bg-dark-ev4">
      <div
        onClick={() => setCurrentTab("Chat")}
        className={`${
          currentTab === "Chat"
            ? "bg-light-ev2 dark:bg-dark-ev2"
            : "hover:bg-light-ev3 dark:hover:bg-dark-ev3"
        } py-4 flex justify-center cursor-pointer`}
      >
        <IoChatbubbleEllipsesOutline size={30} />
      </div>
      <div
        onClick={() => setCurrentTab("Support")}
        className={`${
          currentTab === "Support"
            ? "bg-light-ev2 dark:bg-dark-ev2"
            : "hover:bg-light-ev3 dark:hover:bg-dark-ev3"
        } py-4 flex justify-center cursor-pointer`}
      >
        <BiSupport size={30} />
      </div>
      <div
        onClick={() => setCurrentTab("Report")}
        className={`${
          currentTab === "Report"
            ? "bg-light-ev2 dark:bg-dark-ev2"
            : "hover:bg-light-ev3 dark:hover:bg-dark-ev3"
        } py-4 flex justify-center cursor-pointer`}
      >
        <MdReport size={30} />
      </div>
    </div>
  );
}
export default Tabs;
