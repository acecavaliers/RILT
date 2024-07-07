import { Link } from "@inertiajs/react";

export default function Pagination({links}){
    return(
        <nav className="text-center mt-4">
            {links.map(link =>(
                <Link 
                preserveScroll
                href={link.url || ""}
                key={link.label}
                className={
                    "inline-block py-2 px-3 rounded-lg  text-xs" +
                    (link.active ? "bg-gray-900 text-xs text-gray-200" : " text-gray-400 ") +
                    (!link.url ? "!text-gray-200 cursor-not allowed" : "hover:bg-gray-900")
                } dangerouslySetInnerHTML={{__html: link.label}}>
                    
                </Link>
            ))}
        </nav>
    )
}