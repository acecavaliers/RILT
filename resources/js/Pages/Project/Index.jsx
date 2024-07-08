import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { ChevronUpIcon, ChevronDownIcon, MagnifyingGlassIcon, PlusCircleIcon } from '@heroicons/react/16/solid'

export default function Index({auth, projects, queryParams = null}){
    queryParams = queryParams || {}
    const searchFieldChanged = (name, value) =>{
        if(value){
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }

        router.get(route('project.index'), queryParams)
    }

    const onKeyPress = (name, e) => {
        if(e.key !== 'Enter') return;

        searchFieldChanged(name, e.target.value);
    }

    const sortChanged = (name) => {
        if(name === queryParams.sort_field){
            if (queryParams.sort_direction === "asc"){
                queryParams.sort_direction = "desc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route('project.index'), queryParams)
    }

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
                        <div className="overflow-auto">
                            <div className="flex justify-between">
                                <div className="pl-2 mb-2 space-x-4 flex justify-start">
                                    <div className="bg-gray-200 rounded-md pl-2 space-x-2 flex justify-start">
                                        <MagnifyingGlassIcon className="w-5"></MagnifyingGlassIcon>
                                        <TextInput
                                        className="w-full rounded-l"
                                        defaultValue = {queryParams.name}
                                        placeholder="Project Name"
                                        onBlur={e => searchFieldChanged('name', e.target.value)}
                                        onKeyPress={e => onKeyPress('name', e)} />
                                    </div>
                                    <div className="bg-gray-200 rounded-md pl-2 space-x-2 flex justify-start">
                                    <h1 className="mt-2">Filter</h1>
                                    <SelectInput
                                    className="w-full rounded-l"
                                    defaultValue = {queryParams.status}
                                    onChange={e=> searchFieldChanged("status", e.target.value)}
                                    >
                                        <option value="">Select</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </SelectInput>
                                    </div>
                                </div>
                                <button className="bg-gray-900 text-gray-50 h-10 rounded px-2 mr-2 hover:bg-gray-800"> 
                                    <span className="flex justify-between space-x-1">
                                        <PlusCircleIcon className="w-4"/>
                                        <h1>New Project</h1>
                                        
                                    </span>
                                </button>
                            </div>
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr className="text-nowrap">
                                        <th onClick={e => sortChanged('id')}>
                                            <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                                                ID
                                                <div>
                                                    <ChevronUpIcon className="w-4 mt-0.5" />
                                                    <ChevronDownIcon className="w-4 -mt-2.5" />
                                                </div>
                                            </div>
                                        </th>
                                        <th className="px-3 py-3">Image</th>
                                        <th onClick={e => sortChanged('name')} >
                                            <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                                                Name
                                                <div>
                                                    <ChevronUpIcon className="w-4 mt-0.5" />
                                                    <ChevronDownIcon className="w-4 -mt-2.5" />
                                                </div>
                                            </div>
                                        </th>
                                        <th onClick={e => sortChanged('status')}>
                                            <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                                                Status
                                                <div>
                                                    <ChevronUpIcon className="w-4 mt-0.5" />
                                                    <ChevronDownIcon className="w-4 -mt-2.5" />
                                                </div>
                                            </div>
                                        </th>
                                        <th onClick={e => sortChanged('created_at')}>
                                            <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                                                Created date
                                                <div>
                                                    <ChevronUpIcon className="w-4 mt-0.5" />
                                                    <ChevronDownIcon className="w-4 -mt-2.5" />
                                                </div>
                                            </div>
                                        </th>
                                        <th onClick={e => sortChanged('due_date')}>
                                            <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                                                Due date
                                                <div>
                                                    <ChevronUpIcon className="w-4 mt-0.5" />
                                                    <ChevronDownIcon className="w-4 -mt-2.5" />
                                                </div>
                                            </div>
                                        </th>
                                        <th className="px-3 py-3">Created By</th>
                                        <th className="px-3 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.data.map(project => (

                                    <tr className="bg-white border-b hover:bg-blue-50" key={project.id}>
                                        <td className="px-3 py-2">
                                            {project.id}
                                        </td>
                                        <td className="px-3 py-2">
                                            <img src={project.img_path} style={{width:60}} />
                                        </td>
                                        <td className="px-3 py-2">
                                            <h1 className="font-medium text-gray-700">{project.name}</h1>
                                            <p className="inline-block">
                                            {project.descrption}
                                            </p>
                                        </td>
                                        <td className="px-1 py-2">
                                            <span className={"px-2 py-1 font-medium " +
                                                PROJECT_STATUS_CLASS_MAP[project.status]
                                            }>
                                                {PROJECT_STATUS_TEXT_MAP[project.status]}
                                            </span>
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
                        </div>
                        <div className="pb-4 px-4 flex justify-end">                            
                            <Pagination links={projects.meta.links}>
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}
