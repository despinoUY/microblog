"use client";

import { Post } from "@prisma/client";
import Card from "./card";
import ErrorAlert from "./errorAlert";
import { useEffect, useState } from "react";
import SuccessAlert from "./successAlert";
import DeleteButton from "./deleteButton";

export default function PostListing({posts}: {posts: Post[]}) {
    const [isErrorAlertOpen, setErrorAlertOpen] = useState(false);
    const [isSuccessAlertOpen, setSuccessAlertOpen] = useState(false);
    const [renderedPosts, setRenderedPosts] = useState(posts);
    const [filteredPosts, setFilteredPosts] = useState(posts);
    const [renderedUserID, setRenderedUserID] = useState(0)

    const handleAlertError = () => {
        setErrorAlertOpen(false);
    }

    const handleAlertSuccess = () => {
        setSuccessAlertOpen(false);
    }

    const handleFilteredPosts = () => {
        if (renderedUserID != 0) {
            setFilteredPosts(renderedPosts.filter(post => post.userId == renderedUserID));
        } else {
            setFilteredPosts(renderedPosts);
        }
    }

    useEffect(() => {
        handleFilteredPosts();
    }, [isSuccessAlertOpen]);

    useEffect(() => {
        handleFilteredPosts();
    }, [renderedUserID]);

    return (
        <>
            <ErrorAlert isAlertOpen={isErrorAlertOpen} alertOpenFunction={handleAlertError}></ErrorAlert>
            <SuccessAlert isAlertOpen={isSuccessAlertOpen} alertOpenFunction={handleAlertSuccess}></SuccessAlert>
            <h2 className ="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-4">Posts</h2>
            <input onInput={(e: React.ChangeEvent<HTMLInputElement>) => setRenderedUserID(e.target.value as unknown as number)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" id="userId" type="number" placeholder="Filter posts by user ID"/>
            {
            filteredPosts.length > 0 ? 
                <div id="posts" className={`grid gap-x-8 gap-y-4 text-center lg:w-full lg:grid-cols-3 lg:text-left`}>
                        {
                            filteredPosts.map(post => {
                                return (
                                    <div className="w-full lg:flex">
                                        <div className="border border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded p-4 flex flex-col justify-between leading-normal shadow-lg">
                                            <Card
                                                key={`post-card-`+post.id}
                                                id={post.id}
                                                title={post.title}
                                                body={post.body}
                                            />
                                            <DeleteButton
                                                key={`deleteButton-`+post.id}
                                                id={post.id} 
                                                alertErrorOpen={isErrorAlertOpen} 
                                                alertSuccessOpen={isSuccessAlertOpen}
                                                alertErrorFunction={setErrorAlertOpen} 
                                                alertSuccessFunction={setSuccessAlertOpen} 
                                                renderedPosts={renderedPosts}
                                                setRenderedPosts={setRenderedPosts}
                                            >
                                            </DeleteButton>
                                        </div>
                                    </div>
                                )
                            })
                        }
                </div>
            : 
                <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 w-full" role="alert">
                    <p className="text-sm">No posts available.</p>
                </div>
            }
        </>
    );
}