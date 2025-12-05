import React from 'react'
import { FaFacebook, FaInstagram } from 'react-icons/fa'

export const Footer = () => {
  return (
    <footer className='bg-gray-800 px-6 pt-6 md:px-16 lg:px-28'>
      <div className="grid grid-cols-1 md:grid-cols-3 pb-6">
        <div>
          <h2 className="text-lg font-bold-mb-4">
            TrebolPlaster
          </h2>
          <p className="text-gray-300">
            Contact us today to discuss your project
          </p>
        </div>
        {/* Links column */}
        <div>
          <h2 className="text-lg font-bold-mb-4">
            Quick Links
          </h2>
          <ul>
            <li>
              <a href="#home" className='hover:underline! text-gray-300!'>Home</a>
            </li>
            <li>
              <a href="#services" className='hover:underline! text-gray-300!' >Services</a>
            </li>
            <li>
              <a href="#projects" className='hover:underline! text-gray-300!' >How it Works</a>
            </li>
            <li>
              <a href="#about" className='hover:underline! text-gray-300!'>About Us</a>
            </li>
            <li>
              <a href="#faq" className='hover:underline! text-gray-300!'>FAQ</a>
            </li>
          </ul>
        </div>

        {/* SocialLinks Column */}
        <div>
          <h2 className="text-lg font-bold-mb-4">
            Follow Us
          </h2>

          <ul className='flex space-x-4'>
            <li>
              <FaFacebook className='text-blue-500' />{" "} <a href="https://www.facebook.com/trebolplaster" className='hover:underline! text-gray-300!'>Facebook</a>
            </li>
            <li>
              <FaInstagram className='text-orange-500' />{" "}<a href="https://www.instagram.com/trebolplaster?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className='hover:underline! text-gray-300!' >Instagram</a>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <p className='border-t border-gray-600 p-4 text-gray-300 text-center'>© 2025 TrebolPlaster. All rights reserved.</p>
      </div>
    </footer>
  )
}
