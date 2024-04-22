import React from 'react'

const ContactUs = () => {
  return (
    <div className="container mx-auto max-w-4xl px-8 mt-24 lg:mt-14">
      <h2 className="text-xl lg:text-4xl font-medium">Contact Us</h2>
      <form className="space-y-6 mt-5">
        <div>
          <label htmlFor="name" className="block mb-2 font-medium">Your Name</label>
          <input type="text" id="name" name="name" className="block w-full px-4 py-2 border rounded-md focus:border-orange-300 focus:ring-orange-300 focus:outline-none" />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 font-medium">Your Email</label>
          <input type="email" id="email" name="email" className="block w-full px-4 py-2 border rounded-md focus:border-orange-300 focus:ring-orange-300 focus:outline-none" />
        </div>
        <div>
          <label htmlFor="category" className="block mb-2 font-medium">Select Category</label>
          <select id="category" name="category" className="block w-full px-4 py-2 border rounded-md focus:border-orange-300 focus:ring-orange-300 focus:outline-none">
            <option value="">Select a category</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Support">Support</option>
            <option value="Suggestions">Suggestions</option>
            <option value="Feedback">Feedback</option>
          </select>
        </div>
        <div>
          <label htmlFor="subject" className="block mb-2 font-medium">Subject</label>
          <input type="text" id="subject" name="subject" className="block w-full px-4 py-2 border rounded-md focus:border-orange-300 focus:ring-orange-300 focus:outline-none" />
        </div>
        <div>
          <label htmlFor="message" className="block mb-2 font-medium">Message</label>
          <textarea id="message" name="message" className="block w-full px-4 py-2 border rounded-md focus:border-orange-300 focus:ring-orange-300 focus:outline-none" rows={4}></textarea>
        </div>
        <div>
          <label htmlFor="file" className="block mb-2 font-medium cursor-pointer">Attach Image</label>
          <input type="file" id="file" name="file" className="cursor-pointer" />
        </div>
        <div className="flex justify-center items-center w-full">
 <button type="submit" className="block justify-center align-middle items-center w-full lg:w-6/12 px-4 py-2 mt-4 font-medium text-white bg-orange-400 border border-transparent 
 rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 mb-10">Submit</button>
</div>
      </form>
    </div>
  )
}

export default ContactUs
