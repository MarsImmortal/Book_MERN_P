import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

function Home() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:3003/books')
            .then((res) => {
                setBooks(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8 text-center font-semibold text-indigo-700'>
                    Books List
                </h1>
                <Link to='books/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <table className='w-full border-collapse rounded-lg overflow-hidden shadow-lg'>
                    <thead>
                        <tr>
                            <th className='border p-3 text-xl bg-indigo-200 text-indigo-800 rounded-tl-lg'>
                                No
                            </th>
                            <th className='border p-3 text-xl bg-indigo-200 text-indigo-800'>
                                Title
                            </th>
                            <th className='border p-3 text-xl bg-indigo-200 text-indigo-800 max-md:hidden'>
                                Author
                            </th>
                            <th className='border p-3 text-xl bg-indigo-200 text-indigo-800 max-md:hidden'>
                                Published Year
                            </th>
                            <th className='border p-3 text-xl bg-indigo-200 text-indigo-800 rounded-tr-lg'>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => (
                            <tr
                                key={book._id}
                                className={`h-12 ${
                                    index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                                }`}
                            >
                                <td className='border p-3 text-center'>{index + 1}</td>
                                <td className='border p-3'>{book.title}</td>
                                <td className='border p-3 max-md:hidden'>{book.author}</td>
                                <td className='border p-3 max-md:hidden'>{book.publishYear}</td>
                                <td className='border p-3 text-center'>
                                    <div className='flex justify-around gap-4'>
                                        <Link
                                            to={`/books/details/${book._id}`}
                                            className='text-indigo-600 hover:text-indigo-800 transition duration-300'
                                        >
                                            <BsInfoCircle className='text-2xl' />
                                        </Link>
                                        <Link
                                            to={`/books/edit/${book._id}`}
                                            className='text-yellow-600 hover:text-yellow-800 transition duration-300'
                                        >
                                            <AiOutlineEdit className='text-2xl' />
                                        </Link>
                                        <Link
                                            to={`/books/delete/${book._id}`}
                                            className='text-red-600 hover:text-red-800 transition duration-300'
                                        >
                                            <MdOutlineDelete className='text-2xl' />
                                        </Link>
                                        </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Home;
