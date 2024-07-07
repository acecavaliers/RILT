import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({auth, projects}){
    return(
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Projects</h2>}
        >   
            <Head title="Projects" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">Project List</div>
                        {/* <pre>{JSON.stringify(projects, undefined, 2)}</pre> */}
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr className="text-nowrap">
                                    <th className="px-3 py-3">ID</th>
                                    <th className="px-3 py-3">Image</th>
                                    <th className="px-3 py-3">Name</th>
                                    <th className="px-3 py-3">Status</th>
                                    <th className="px-3 py-3">Created Date</th>
                                    <th className="px-3 py-3">Due date</th>
                                    <th className="px-3 py-3">Created By</th>
                                    <th className="px-3 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.data.map(project => (
                                    
                                <tr className="bg-white border-b">
                                    <td className="px-3 py-2">
                                        {project.id}
                                    </td>
                                    <td className="px-3 py-2">
                                        <img src={project.img_path} style={{width:60}} />                                        
                                    </td>
                                    <td className="px-3 py-2">
                                        {project.name}
                                    </td>
                                    <td className="px-3 py-2">
                                        {project.status}
                                    </td>
                                    <td className="px-3 py-2">
                                        {project.created_at}
                                    </td>
                                    <td className="px-3 py-2">
                                        {project.due_date}
                                    </td>
                                    <td className="px-3 py-2">
                                        {project.createdBy.name}
                                    </td>
                                    <td className="space-x-2 px-3 py-2">
                                        <Link href={route('project.edit',project.id)} className="font-medium text-blue-600">Edit
                                        </Link>
                                        <Link href={route('project.destroy',project.id)} className="font-medium text-red-500">Delete
                                        </Link>
                                    </td>

                                </tr>

                                ))}
                                
                            </tbody>
                        </table>
                        <Pagination links={projects.meta.links}>

                        </Pagination>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}