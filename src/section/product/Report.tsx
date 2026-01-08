import { ChangeEvent, FormEvent, useState } from "react";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import { compressImageUpload } from "../../utils/common";
import useToastNotification from "../../hooks/useToastNotification";
import LoadingBox from "../../components/LoadingBox";
import { imageUrl } from "../../services/api";
import { createReport } from "../../services/report";

type Props = {
  reportItem: { name: string; id: string; image?: string };
  refs: "user" | "product" | "comment" | "conversation";
  showModel: boolean;
  setShowModel: (val: boolean) => void;
};

export const reportReasons = [
  { label: "Fraud / Scam", value: "fraud" },
  { label: "Fake or Misleading Information", value: "misleading" },
  { label: "Inappropriate Content", value: "inappropriate" },
  { label: "Harassment or Abuse", value: "harassment" },
  { label: "Spam or Advertising", value: "spam" },
  { label: "Privacy Violation", value: "privacy" },
  { label: "Copyright or Intellectual Property Issue", value: "copyright" },
  { label: "Dangerous or Illegal Activity", value: "illegal" },
  { label: "Offensive Language", value: "offensive" },
  { label: "Hate Speech", value: "hate_speech" },
  { label: "Impersonation", value: "impersonation" },
  { label: "Fake Product", value: "fake_product" },
  { label: "Wrong Category / Misplaced Item", value: "wrong_category" },
  { label: "Poor Quality or Defective Item", value: "defective" },
  { label: "Other", value: "other" },
];

const Report = ({ reportItem, refs, setShowModel, showModel }: Props) => {
  const [isReporting, setIsReporting] = useState(false);
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [reason, setReason] = useState("");

  const { addNotification } = useToastNotification();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!reason) return addNotification("select reason", "", false);
    try {
      setIsReporting(true);

      await createReport({
        reason,
        targetId: reportItem.id,
        targetType: refs,
        description: content,
        image,
      });

      addNotification("Report submitted successfully");
      setShowModel(false);
    } catch (error: any) {
      addNotification(error, "", false);
    } finally {
      setIsReporting(false);
    }
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploading(true);

      const file = e.target.files?.[0];
      if (!file) throw Error("No image found");

      const imageUrl = await compressImageUpload(file, 1024);

      setImage(imageUrl);
    } catch (err) {
      addNotification("Failed uploading image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Modal isOpen={showModel} size="lg" onClose={() => setShowModel(false)}>
      <div className="rounded-lg p-6 w-full space-y-4">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold capitalize">Report {refs}</h1>
          <p className="text-gray-600">
            Please provide details about what you want to report.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center gap-4">
              {reportItem.image ? (
                <img
                  src={imageUrl + reportItem.image}
                  alt={`report ${reportItem.name}`}
                  className="rounded-full h-20 w-20 object-cover"
                />
              ) : null}
              <span className="text-lg font-semibold">{reportItem.name}</span>
            </div>
            {image ? (
              <img
                src={imageUrl + image}
                alt={`report image`}
                className="rounded-full h-20 w-20 object-cover"
              />
            ) : null}
            <div className="flex flex-col gap-2">
              <label htmlFor="image" className="font-medium">
                Image <span className="opacity-50">(Optional)</span>
              </label>
              <div className="flex gap-2">
                <input
                  id="image"
                  name="image"
                  type="file"
                  className="p-2 flex-1 border bg-transparent border-gray-300 rounded"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
                {isUploading && <LoadingBox />}
              </div>
            </div>

            <div className="relative flex flex-col mr-5 w-full">
              <label className="text-sm  mb-2.5">Reason</label>

              <div className="block relative after:content-['\25BC'] after:text-xs after:absolute after:right-2 after:top-3 after:pointer-events-none overflow-hidden rounded-[0.2rem] border border-light-ev4 dark:border-dark-ev4">
                <select
                  value={reason}
                  onChange={(e) => {
                    setReason(e.target.value);
                  }}
                  className="text-base m-0 pl-2.5 dark:bg-black border-light-ev4 dark:border-light-ev4 pr-6 text-ellipsis whitespace-nowrap py-[8.5px] leading-normal focus-within:outline-orange-color w-full appearance-none text-black-color dark:text-white-color"
                >
                  <option>---Select reason---</option>
                  {reportReasons.map((r) => (
                    <option value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="content" className="font-medium">
                Description <span className="opacity-50">(Optional)</span>
              </label>
              <textarea
                id="content"
                name="content"
                className="p-2 border bg-transparent border-gray-300 rounded resize-none"
                rows={5}
                placeholder="Describe the issue you're reporting..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-2">
            <Button
              text="Submit"
              type="submit"
              disabled={isUploading || isReporting || !reason}
              isLoading={isReporting}
            />
          </div>
        </form>
        <div className="text-center mx-auto text-sm !mt-8 max-w-2xl">
          Please leave all information that will help us resolve your query.
          Please include an order number if your report is related to an order
          you purchased from this seller, or you can go to your purchase history
          and report the related item directly from the report tab on the item
          page.
        </div>
      </div>
    </Modal>
  );
};

export default Report;

// return (
//   <Modal isOpen={showModel} onClose={() => setShowModel(false)}>
//     <div className="h-full w-full p-5 dark:bg-dark-ev1 bg-light-ev1">
//       <div className="h-[calc(100%_-_40px)] w-full mt-5 rounded-[0.2rem] relative dark:bg-dark-ev2 bg-light-ev2">
//         <div className="h-[calc(100%_-_66px)] overflow-y-auto pt-10 pb-0 px-10 scrollbar-hide">
//           {loadingReports ? (
//             <LoadingBox />
//           ) : (
//             reports.length &&
//             reports.map((m, i) => (
//               <div ref={scrollRef} key={i}>
//                 <MessageItem own={!m.admin} message={m} />
//               </div>
//             ))
//           )}
//         </div>
//         {user && (
//           <div className="absolute flex flex-col items-center -translate-x-2/4 px-5 py-2.5 rounded-[0.2rem] left-2/4 top-[30px] dark:bg-dark-ev3 bg-light-ev3">
//             <div className="text-[15px] font-light mb-[5px]">Reporting:</div>
//             {productName ? (
//               <div>{productName}</div>
//             ) : (
//               <div className="flex items-center">
//                 <img
//                   className="w-[60px] h-[60px] object-cover rounded-[50%]"
//                   src={user.image}
//                   alt="reported User"
//                 />
//                 <div className="font-bold capitalize ml-2.5">
//                   {user.firstName + " " + user.lastName}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         <div className="flex items-center h-[60px] mx-5 my-[3px]">
//           <input
//             className={`h-full w-full p-5 rounded-[0.2rem] dark:bg-black-color bg-white-color border dark:border-dark-ev3 border-light-ev3
//             text-white-color dark:text-black-color focus-visible:outline focus-visible:outline-orange-color placeholder:p-5 placeholder:text-white-color
//             placeholder:dark:text-black-color`}
//             placeholder="Write a Report/Complain"
//             value={reply}
//             onChange={(e) => setReply(e.target.value)}
//           />
//           <FaPlane
//             className="text-3xl cursor-pointer ml-5"
//             onClick={handleSubmit}
//           />
//         </div>
//         <div className="text-center text-sm">
//           Please leave all information that will help us resolve your query.
//           Please include an order number if your report is related to an order
//           you purchased from this seller, or you can go to your purchase
//           history and report the related item directly from the report tab on
//           the item page.
//         </div>
//       </div>
//     </div>
//   </Modal>
// )
