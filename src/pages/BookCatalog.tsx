import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  price: number;
  inStock: boolean;
}

const BookCatalog: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    // TODO: Fetch books from API
    const mockBooks: Book[] = [
      { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction", price: 12.99, inStock: true },
      { id: 2, title: "A Brief History of Time", author: "Stephen Hawking", category: "Science", price: 15.99, inStock: false },
      { id: 3, title: "Clean Code", author: "Robert C. Martin", category: "Technology", price: 29.99, inStock: true },
      { id: 4, title: "Pride and Prejudice", author: "Jane Austen", category: "Romance", price: 9.99, inStock: true },
    ];
    setBooks(mockBooks);
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '' || book.category.toLowerCase() === selectedCategory.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Book Catalog</h1>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-grow">
          <div className="relative">
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All Categories</option>
          <option value="Fiction">Fiction</option>
          <option value="Science">Science</option>
          <option value="Technology">Technology</option>
          <option value="Romance">Romance</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map(book => (
          <div key={book.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
            <p className="text-gray-600 mb-2">by {book.author}</p>
            <p className="text-sm text-gray-500 mb-2">{book.category}</p>
            <p className="text-lg font-bold mb-2">${book.price.toFixed(2)}</p>
            <p className={`text-sm ${book.inStock ? 'text-green-600' : 'text-red-600'}`}>
              {book.inStock ? 'In Stock' : 'Out of Stock'}
            </p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookCatalog;