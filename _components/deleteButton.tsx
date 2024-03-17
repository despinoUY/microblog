import { Dispatch, SetStateAction, useState } from 'react';
import Image from "next/image";
import { Post } from '@prisma/client';

export default function DeleteButton({ id, alertErrorOpen, alertErrorFunction, alertSuccessOpen, alertSuccessFunction, renderedPosts, setRenderedPosts }: {id: number, alertErrorOpen: boolean, alertErrorFunction: Dispatch<SetStateAction<boolean>>, alertSuccessOpen: boolean, alertSuccessFunction: Dispatch<SetStateAction<boolean>>, renderedPosts: Post[], setRenderedPosts: Dispatch<SetStateAction<Post[]>>}) {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleModal = () => {
        setModalOpen(!isModalOpen);
    }

    const deletePost = async (postId: number) => {
        try {
            await fetch('/api/posts/' + postId, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"}
            })
            .then(function(response) {
                if (response.ok) {
                    return response;
                }
                throw new Error("Something went wrong.");
            });
            setModalOpen(false);
            setRenderedPosts(renderedPosts.filter(post => post.id != postId));
            alertSuccessFunction(!alertSuccessOpen);
        } catch (error) {
            console.log(error);
            setModalOpen(false);
            alertErrorFunction(!alertErrorOpen);
        }
    }

    return (
        <div>
            <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleModal()}>
                Delete post
            </button>

            <div aria-hidden={isModalOpen} className={isModalOpen ? "fixed flex justify-center items-center w-full inset-0 max-h-full bg-gray-600/75" : "hidden" }>
                <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                    <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <button type="button" onClick={() => handleModal()} className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <Image
                                src="/close.svg"
                                alt="Close icon"
                                className="w-5 h-5"
                                width={20}
                                height={20}
                                priority
                            />
                            <span className="sr-only">Close modal</span>
                        </button>
                        <Image
                            src="/trashcan.svg"
                            alt="Trashcan icon"
                            className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                            width={20}
                            height={20}
                            priority
                        />
                        <p className="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this item?</p>
                        <div className="flex justify-center items-center space-x-4">
                            <button onClick={() => handleModal()} type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                No, cancel
                            </button>
                            <button onClick={() => deletePost(id)} className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                                Yes, I'm sure
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}