import React, { useState } from 'react';
import { Package, DollarSign, Users, BookOpen } from 'lucide-react';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  stock: number;
}

const AdminDashboard: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 12.99, stock: 50 },
    { id: 2, title: "A Brief History of Time", author: "Stephen Hawking", price: 15.99, stock: 30 },
    { id: 3, title: "Clean Code", author: "Robert C. Martin", price: 29.99, stock: 20 },
  ]);

  const [newBook, setNewBook] = useState<Omit<Book, 'id'>>({
    title: '',
    author: '',
    price: 0,
    stock: 0,
  });

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBooks(prevBooks => [...prevBooks, { ...newBook, id: prevBooks.length + 1 }]);
    setNewBook({ title: '', author: '', price: 0, stock: 0 });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBook(prev => ({ ...prev, [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value }));
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
          <Package className="text-blue-600 mb-2" size={32} />
          <h3 className="text-xl font-semibold">Total Books</h3>
          <p className="text-3xl font-bold">{books.length}</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow-md">
          <DollarSign className="text-green-600 mb-2" size={32} />
          <h3 className="text-xl font-semibold">Total Sales</h3>
          <p className="text-3xl font-bold">$1,234.56</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
          <Users className="text-yellow-600 mb-2" size={32} />
          <h3 className="text-xl font-semibold">Customers</h3>
          <p className="text-3xl font-bold">256</p>
        </div>
        <div className="bg-purple-100 p-6 rounded-lg shadow-md">
          <BookOpen className="text-purple-600 mb-2" size={32} />
          <h3 className="text-xl font-semibold">Low Stock</h3>
          <p className="text-3xl font-bold">{books.filter(book => book.stock < 10).length}</p>
        </div>
      </div>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Inventory Management</h2>
        <table className="w-full mb-6">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Title</th>
              <th className="text-left py-2">Author</th>
              <th className="text-left py-2">Price</th>
              <th className="text-left py-2">Stock</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id} className="border-b">
                <td className="py-2">{book.title}</td>
                <td className="py-2">{book.author}</td>
                <td className="py-2">${book.price.toFixed(2)}</td>
                <td className="py-2">{book.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="text-xl font-semibold mb-4">Add New Book</h3>
        <form onSubmit={handleAddBook} className="space-y-4">
          <div>
            <label htmlFor="title" className="block mb-1">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newBook.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="author" className="block mb-1">Author:</label>
            <input
              type="text"
              id="author"
              name="author"
              value={newBook.author}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="price" className="block mb-1">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={newBook.price}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="stock" className="block mb-1">Stock:</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={newBook.stock}
              onChange={handleInputChange}
              required
              min="0"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300">
            Add Book
          </button>
        </form>
      </section>
    </div>
  );
};

export default AdminDashboard;