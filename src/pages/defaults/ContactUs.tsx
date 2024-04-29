import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function ContactUs() {
  return (
    <div className="container mx-auto max-w-7xl w-full flex-col lg:flex-row mt-5 lg:mt-14 flex bg-gray-100 p-8 lg:rounded-xl mb-10">
       <div className="lg:w-1/2 w-full lg:mt-4">
        <div className="w-full">
        <h3 className="text-xl lg:text-2xl lg:mt-4 font-medium mb-4" >Contact Us</h3>
       <h2 className="text-xl lg:text-4xl lg:mt-12 font-medium">Get In Touch With Us</h2>
       <p className="text-base text-justify lg:mr-48 mt-7 lg:mt-3">
       Welcome to Repeddle.com 🎉, your go-to platform for connecting with sellers. We're here to make your shopping experience seamless and enjoyable 😊. 
       Whether you're looking for unique items 🛍️, seeking advice on products 💡, or have questions about our services ❓, we're ready to assist 🤝.
       </p>
       <div className="flex items-start mt-10 lg:mt-14">
        <div className="bg-orange-400 hover:bg-red-700 rounded-lg p-4 text-white mb-4 lg:space-y-20 lg:mb-8">
          <FaPhone size={32} />
        </div>
        <div className="ml-4">
          <h4 className="font-bold text-lg">Our Phone</h4>
          <p className="text-sm text-gray-500">Phone Number</p>
        </div>
      </div>
      <div className="flex items-start mt-4">
        <div className="bg-orange-400 hover:bg-red-700 rounded-lg p-4 text-white mb-4 lg:space-y-20 lg:mb-8">
          <FaEnvelope size={32} />
        </div>
        <div className="ml-4">
          <h4 className="font-bold text-lg">Our Email</h4>
          <p className="text-sm text-gray-500">Email Address</p>
        </div>
      </div>
      <div className="flex items-start mt-4">
        <div className="bg-orange-400 hover:bg-red-700 rounded-lg p-4 text-white mb-4 lg:space-y-20 lg:mb-8">
          <FaMapMarkerAlt size={32} />
        </div>
        <div className="ml-4">
          <h4 className="font-bold text-lg">Our Location</h4>
          <p className="text-sm text-gray-500">Physical Address</p>
        </div>
      </div>
        </div>
       </div>
      
      <div className='lg:w-1/2 w-full '>
      <form className="space-y-6 mt-5 w-full">
        <div>
          <label htmlFor="name" className="block mb-2 font-medium">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="block w-full px-4 py-4 border border-gray-300 rounded-md focus:border-orange-300 focus:ring-orange-300 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 font-medium">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="block w-full px-4 py-4 border border-gray-300 rounded-md focus:border-orange-300 focus:ring-orange-300 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="category" className="block mb-2 font-medium">
            Select Category
          </label>
          <select
            id="category"
            name="category"
            className="block w-full px-4 py-4 border rounded-md focus:border-orange-300 focus:ring-orange-300 focus:outline-none border-gray-300"
          >
            <option value="">Select a category</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Support">Support</option>
            <option value="Suggestions">Suggestions</option>
            <option value="Feedback">Feedback</option>
          </select>
        </div>
        <div>
          <label htmlFor="subject" className="block mb-2 font-medium">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="block w-full px-4 py-4 border border-gray-300 rounded-md focus:border-orange-300 focus:ring-orange-300 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="message" className="block mb-2 font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="block w-full px-4 py-4 border border-gray-300 rounded-md focus:border-orange-300 focus:ring-orange-300 focus:outline-none"
            rows={4}
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="file"
            className="block mb-2 font-medium cursor-pointer"
          >
            Attach Image
          </label>
          <input type="file" id="file" name="file" className="cursor-pointer" />
        </div>
        <div className="flex justify-center items-center w-full">
          <button
            type="submit"
            className="block justify-center align-middle items-center w-full px-4 py-3 mt-4 font-medium text-white bg-orange-400 border border-transparent 
            rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 mb-10"
          >
            Submit
          </button>
        </div>
      </form>
      </div>

    </div>
  );
}

export default ContactUs;
