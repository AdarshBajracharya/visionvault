import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { name: 'Home', path: '/designerhome' },
  { name: 'Find jobs', path: '/findjobs' },
  { name: 'Profile', path: '/profiledes' },
];

const Navbar2: React.FC = () => {
  return (
    <nav className="bg-[#e9f9ff] px-8 py-4 flex items-center justify-between z-1000">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="src/assets/images/V.png"
          alt="VisionVault Logo"
          className="w-12 h-12 object-contain"
        />
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-8 text-gray-800 font-medium">
        {navItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              end={item.path === '/'} // 'end' makes '/' match exactly
              className={({ isActive }) =>
                `relative cursor-pointer ${isActive ? 'font-bold text-black' : 'hover:text-black'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}
                  {isActive && (
                    <span className="absolute h-0.5 w-4 bg-black -bottom-1 left-1/2 transform -translate-x-1/2" />
                  )}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar2;
