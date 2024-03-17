import Image from 'next/image';

export default function ErrorAlert({isAlertOpen, alertOpenFunction}: {isAlertOpen: boolean, alertOpenFunction: () => void}) {

    return (
    <div className={ isAlertOpen ? "fixed bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full mb-3" : "hidden"} role="alert">
        <strong className="font-bold mr-2">Holy smokes!</strong>
        <span className="block sm:inline">Something seriously bad happened.</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        <Image
            src="/close.svg"
            alt="Close icon"
            className="fill-current h-6 w-6"
            width={20}
            height={20}
            onClick={alertOpenFunction}
            priority
        />
        </span>
    </div>
    );
}