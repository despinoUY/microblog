import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
            <Link href={"/"} className="flex items-center flex-shrink-0 text-white mr-6">
                <Image
                src="/microblog.svg"
                alt="Microblog Logo"
                className="fill-current h-8 w-8 mr-2"
                width={54}
                height={54}
                priority
                />
                <span className="font-semibold text-xl tracking-tight">Microblog</span>
            </Link>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                    <Link href={"/posts"} className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                        Posts
                    </Link>
                </div>
            </div>
        </nav>
    );
}