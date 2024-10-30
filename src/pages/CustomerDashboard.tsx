import React, { useState } from 'react';
import { User, ShoppingCart, Bell } from 'lucide-react';

interface Order {
  id: number;
  date: string;
  total: number;
  status: string;
}

const CustomerDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    { id: 1, date: '2024-03-01', total: 29.99, status: 'Delivered' },
    { id: 2, date: '2024-03-15', total: 45.98, status: 'Processing' },
  ]);

  const [smsPreferences, setSmsPreferences] = useState({
    newReleases: true,
    orderUpdates: true,
    promotions: false,
  });

  const handleSmsPreferenceChange = (preference: keyof typeof smsPreferences) => {
    setSmsPreferences(prev => ({ ...prev, [preference]: !prev[preference] }));
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-6">Customer Dashboard</h1>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <User className="mr-2" /> Personal Information
        </h2>
        <div className="space-y-2">
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> john.doe@example.com</p>
          <p><strong>Phone:</strong> (123) 456-7890</p>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <ShoppingCart className="mr-2" /> Order History
        </h2>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Order ID</th>
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Total</th>
              <th className="text-left py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-b">
                <td className="py-2">{order.id}</td>
                <td className="py-2">{order.date}</td>
                <td className="py-2">${order.total.toFixed(2)}</td>
                <td className="py-2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Bell className="mr-2" /> SMS Notification Preferences
        </h2>
        <div className="space-y-4">
          {Object.entries(smsPreferences).map(([key, value]) => (
            <div key={key} className="flex items-center">
              <input
                type="checkbox"
                id={key}
                checked={value}
                onChange={() => handleSmsPreferenceChange(key as keyof typeof smsPreferences)}
                className="mr-2"
              />
              <label htmlFor={key} className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CustomerDashboard;