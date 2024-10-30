import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';

const HomePage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement SMS registration logic
    console.log('Registered for SMS notifications:', { email, phone });
    // Reset form
    setEmail('');
    setPhone('');
  };

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to BookStore</h1>
        <p className="text-xl mb-8">Discover your next favorite book</p>
        <Link to="/catalog" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
          Browse Catalog
        </Link>
      </section>

      <section className="bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">Featured Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Fiction', 'Science', 'Technology', 'Romance'].map((category) => (
            <div key={category} className="bg-gray-100 p-4 rounded-md text-center hover:bg-gray-200 transition duration-300">
              <Link to={`/catalog?category=${category.toLowerCase()}`}>{category}</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-100 rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Bell className="mr-2" /> Register for SMS Notifications
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-1">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300">
            Register Now
          </button>
        </form>
      </section>
    </div>
  );
};

export default HomePage;