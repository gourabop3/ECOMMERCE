import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Contact Us</h2>
        <p className="mt-4 text-lg leading-6 text-gray-600">
          Have questions or need help? Feel free to reach out!
        </p>
      </div>

      <div className="mt-12 max-w-xl mx-auto">
        <form className="grid grid-cols-1 gap-y-6" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm text-sm"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm text-sm"
          />
          <textarea
            name="message"
            rows="4"
            placeholder="Your Message"
            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm text-sm"
          ></textarea>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
