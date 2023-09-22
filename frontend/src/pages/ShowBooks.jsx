import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBooks = () => {
    const [book, setBooks] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:3003/books/${id}`)
            .then((res) => {
                setBooks(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Book Details</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className='flex flex-col border border-sky-400 rounded-lg p-4'>
                    <div className='m-4'>
                        <span className='text-xl mr-4 text-gray-500'> Id </span>
                        <span>{book._id}</span>
                    </div>
                    <div className='m-4'>
                        <span className='text-xl mr-4 text-gray-500'> Title </span>
                        <span>{book.title}</span>
                    </div>
                    <div className='m-4'>
                        <span className='text-xl mr-4 text-gray-500'> Author </span>
                        <span>{book.author}</span>
                    </div>
                    <div className='m-4'>
                        <span className='text-xl mr-4 text-gray-500'> Publish Year </span>
                        <span>{book.publishYear}</span>
                    </div>
                    <div className='m-4'>
                        <span className='text-xl mr-4 text-gray-500'> Time Created </span>
                        <span>{new Date(book.createdAt).toString()}</span>
                    </div>
                    <div className='m-4'>
                        <span className='text-xl mr-4 text-gray-500'> Last Update Time </span>
                        <span>{new Date(book.updatedAt).toString()}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowBooks;
