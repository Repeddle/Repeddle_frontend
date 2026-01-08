import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaTrash } from "react-icons/fa";
import { FiImage } from "react-icons/fi";
import useContact from "../../hooks/useContact";
import { ChangeEvent, FormEvent, useState } from "react";
import { compressImageUpload } from "../../utils/common";
import useAuth from "../../hooks/useAuth";
import useToastNotification from "../../hooks/useToastNotification";
import { imageUrl } from "../../services/api";
import LoadingBox from "../../components/LoadingBox";
import Modal from "../../components/ui/Modal";
import { deleteImageService } from "../../services/image";

function ContactUs() {
  const { createContact } = useContact();
  const { user } = useAuth();
  const { addNotification } = useToastNotification();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await createContact({
        name,
        email,
        subject,
        message,
        file: [image],
        category,
      });
      if (response) {
        setSuccess(true);
        addNotification(
          "Message has been sent and you will receive a reply soon"
        );
        setName("");
        setCategory("");
        setEmail("");
        setMessage("");
        setSubject("");
        setImage("");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      addNotification(error || "Failed to send message", undefined, true);
    } finally {
      setLoading(false);
    }
  };

  const uploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    setUploading(true);
    try {
      const compressImage = await compressImageUpload(file, 1024, image);

      setImage(compressImage);

      addNotification("Image Uploaded");
    } catch (err) {
      addNotification("Failed uploading image");
    }

    setUploading(false);
  };

  const deleteImage = async (url: string) => {
    if (!url) return;

    setLoading(true);

    try {
      const names = url.split("/");

      const name = names[names.length - 1];

      const res = await deleteImageService(name);
      console.log(res);
      setImage("");
    } catch (error) {
      addNotification("Failed to delete image", undefined, true);
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto max-w-7xl w-full flex-col md:gap-24 lg:flex-row  lg:mt-14 flex p-8 lg:rounded-xl mb-10">
      <div className="lg:w-1/2 w-full p-5 rounded-lg mb-4 lg:mb-0">
        <div className="w-full">
          <h3 className="text-lg lg:text-2xl lg:mt-4 font-medium mb-4">
            Contact Us
          </h3>
          <h2 className="text-2xl lg:text-4xl  font-semibold">
            Get In Touch With Us
          </h2>
          <p className="text-base text-justify  mt-7 lg:mt-12">
            Welcome to Repeddle, your go-to platform for connecting with
            sellers. We're here to make your shopping experience seamless and
            enjoyable 😊. Whether you're looking for unique items, seeking
            advice on products, or have questions about our services, we're
            ready to assist.
          </p>
          <div className="flex items-start mt-10 lg:mt-14">
            <div className="bg-red-800 rounded-lg p-4 text-white mb-4 lg:space-y-20 lg:mb-8">
              <FaPhone size={32} />
            </div>
            <div className="ml-4">
              <h4 className="font- text-lg">Our Phone</h4>
              <p className="text-sm text-gray-500">0816491244</p>
            </div>
          </div>
          <div className="flex items-start mt-4">
            <div className="bg-red-800 rounded-lg p-4 text-white mb-4 lg:space-y-20 lg:mb-8">
              <FaEnvelope size={32} />
            </div>
            <div className="ml-4">
              <h4 className="font- text-lg">Our Email</h4>
              <p className="text-sm text-gray-500"> support@repeddle.com</p>
            </div>
          </div>
          <div className="flex items-start mt-4">
            <div className="bg-red-800 rounded-lg p-4 text-white mb-4 lg:space-y-20 lg:mb-8">
              <FaMapMarkerAlt size={32} />
            </div>
            <div className="ml-4">
              <h4 className="font- text-lg">Our Location</h4>
              <p className="text-sm text-gray-500">
                137 9th Road Carlsward Midrand, South Africa
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:w-1/2 w-full p-4 lg:p-12 bg-malon-color rounded-lg">
        <form className="space-y-6  w-full text-white" onSubmit={handleSend}>
          <div>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="block w-full px-4 py-4 border border-gray-300 rounded-md focus:border-orange-300 focus:ring-orange-300 focus:outline-none text-black"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Your Email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-4 border border-gray-300 rounded-md focus:border-orange-300 focus:ring-orange-300 focus:outline-none text-black"
            />
          </div>
          <div>
            <select
              id="category"
              name="category"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="block w-full px-4 py-4 border rounded-md focus:border-orange-300 focus:ring-orange-300 text-black focus:outline-none border-gray-300"
            >
              <option value="" className="text-black ">
                Select a category
              </option>
              <option value="General Inquiry" className="text-black ">
                General Inquiry
              </option>
              <option value="Support" className="text-black ">
                Support
              </option>
              <option value="Suggestions" className="text-black ">
                Suggestions
              </option>
              <option value="Feedback" className="text-black ">
                Feedback
              </option>
            </select>
          </div>
          <div>
            <input
              type="text"
              placeholder="Subject"
              id="subject"
              name="subject"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="block w-full px-4 py-4 border border-gray-300 rounded-md focus:border-orange-300 focus:ring-orange-300 focus:outline-none text-black"
            />
          </div>
          <div>
            <textarea
              id="message"
              placeholder="Message"
              name="message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="block w-full px-4 py-4 border border-gray-300 rounded-md focus:border-orange-300 focus:ring-orange-300 focus:outline-none text-black"
              rows={4}
            />
          </div>
          {user &&
            (uploading ? (
              <LoadingBox size="sm" />
            ) : image ? (
              <div className="relative inline-block">
                <img
                  src={imageUrl + image}
                  className="w-24 h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setShowImageModal(true)}
                  alt="Uploaded image"
                />
                <button
                  onClick={() => deleteImage(image)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  disabled={loading}
                >
                  <FaTrash size={12} />
                </button>
              </div>
            ) : (
              <div className="flex justify-center">
                <label
                  htmlFor="file"
                  className="mb-2 font-medium cursor-pointer flex items-center gap-2 "
                >
                  <FiImage className="text-2xl" /> Add Image{" "}
                  <span className="opacity-50">(optional)</span>
                </label>
                <input
                  accept="image/*"
                  type="file"
                  id="file"
                  name="file"
                  className="sr-only"
                  onChange={uploadHandler}
                />
              </div>
            ))}
          <div className="flex justify-center items-center w-full">
            <button
              type="submit"
              disabled={loading}
              className="block justify-center align-middle items-center w-full px-4 py-3  font-medium text-white bg-orange-color 
            rounded-md  uppercase focus:outline-none focus:ring-2 focus:ring-orange-color  "
            >
              Send Message
            </button>
            {loading && <LoadingBox />}
          </div>
        </form>
      </div>
      <Modal isOpen={success} onClose={() => setSuccess(false)}>
        <div className="text-center p-5">Message submitted successfully</div>
      </Modal>

      <Modal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        size="lg"
      >
        <div className="flex justify-center">
          <img
            src={imageUrl + image}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
            alt="Full size image"
          />
        </div>
      </Modal>
    </div>
  );
}

export default ContactUs;
