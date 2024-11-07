import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"
import { FiImage } from "react-icons/fi"
import useContact from "../../hooks/useContact"
import { ChangeEvent, FormEvent, useState } from "react"
import useToastNotification from "../../hooks/useToastNotification"
import { compressImageUpload } from "../../utils/common"

function ContactUs() {
  const { createContact, error } = useContact()
  const { addNotification } = useToastNotification()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [category, setCategory] = useState("")
  const [message, setMessage] = useState("")
  const [subject, setSubject] = useState("")
  const [file, setFile] = useState<string[]>([])

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault()

    const res = await createContact({
      name,
      category,
      email,
      message,
      subject,
      file: [],
    })

    if (res) {
      addNotification("Message has been sent and you will receive a reply soon")
      setName("")
      setCategory("")
      setEmail("")
      setMessage("")
      setSubject("")
      setFile([])
    } else {
      addNotification(error || "Failed to send message", undefined, true)
    }
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      try {
        const res = await Promise.all(
          Array.from({ length: e.target.files.length }).map((_, i) =>
            compressImageUpload(e.target.files![i], 1024)
          )
        )

        setFile([...file, ...res])
      } catch (error) {
        console.log(error)
        addNotification("Failed to upload image", undefined, true)
      }
    }
  }

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
              <p className="text-sm text-gray-500">Phone Number</p>
            </div>
          </div>
          <div className="flex items-start mt-4">
            <div className="bg-red-800 rounded-lg p-4 text-white mb-4 lg:space-y-20 lg:mb-8">
              <FaEnvelope size={32} />
            </div>
            <div className="ml-4">
              <h4 className="font- text-lg">Our Email</h4>
              <p className="text-sm text-gray-500">Email Address</p>
            </div>
          </div>
          <div className="flex items-start mt-4">
            <div className="bg-red-800 rounded-lg p-4 text-white mb-4 lg:space-y-20 lg:mb-8">
              <FaMapMarkerAlt size={32} />
            </div>
            <div className="ml-4">
              <h4 className="font- text-lg">Our Location</h4>
              <p className="text-sm text-gray-500">Physical Address</p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:w-1/2 w-full p-4 lg:p-12 bg-malon-color rounded-lg">
        <form onSubmit={sendMessage} className="space-y-6  w-full text-white">
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
          <div className="flex justify-center">
            <label
              htmlFor="file"
              className="mb-2 font-medium cursor-pointer flex items-center gap-2 "
            >
              <FiImage className="text-2xl" /> Add Image{" "}
              <span className="opacity-50">(optional)</span>
            </label>
            <input
              onChange={handleFileChange}
              multiple
              type="file"
              id="file"
              name="file"
              className="sr-only"
              accept="image/*"
            />
          </div>
          <div className="flex justify-center items-center w-full">
            <button
              type="submit"
              className="block justify-center align-middle items-center w-full px-4 py-3  font-medium text-white bg-orange-color 
            rounded-md  uppercase focus:outline-none focus:ring-2 focus:ring-orange-color  "
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactUs
