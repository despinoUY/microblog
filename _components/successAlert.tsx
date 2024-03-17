import Image from 'next/image';

export default function SuccessAlert({isAlertOpen, alertOpenFunction}: {isAlertOpen: boolean, alertOpenFunction: () => void}) {

    return (
    <div className={ isAlertOpen ? "fixed bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative w-full mb-3" : "hidden"} role="alert">
        <strong className="font-bold mr-2">Great!</strong>
        <span className="block sm:inline">You've deleted the post.</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        <Image
            src="/close.svg"
            alt="Close icon"
            className="fill-current h-6 w-6 text-green-500"
            width={20}
            height={20}
            onClick={alertOpenFunction}
            priority
        />
        </span>
    </div>
    );
}