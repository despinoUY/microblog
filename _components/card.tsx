export default function Card({id, title, body}: {id: number, title: string, body: string}) {
    return (
        
            <div className="mb-8">
                <div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">{body}</p>
            </div>
    );
}