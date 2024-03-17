import getPosts from "_lib/posts";
import PostListing from "_components/postListing";

export default async function Page() {
    let posts = await getPosts();

    return(  
        <main className={`flex min-h-screen flex-col items-start px-12 m-4`}>
            <PostListing posts={posts}></PostListing>
        </main>
    );
} 