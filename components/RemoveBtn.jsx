'use client'

import { HiOutlineTrash } from "react-icons/hi"

export default function RemoveBtn({ id }) {
    
    const removeTopic = async () => {
        const confirmed = confirm('Are you sure you want to remove')
        if (confirmed) { 
            await fetch(`http://localhost:5000/api/topics?id=${id}`, {
                method: 'DELETE',
            })
            window.location.href = '/'  // Redirect to home page after deleting
        }
     }

    return (
        <button onClick={removeTopic} className='text-red-500'>
            <HiOutlineTrash size={24} /> 
        </button>
    )
}