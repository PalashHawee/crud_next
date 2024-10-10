'use client';

import { useState } from 'react';
// import { useRouter } from 'next/router';
import { z } from 'zod';

// Define your schema
const skillSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
});

export default function AddSkills() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});
    // const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate input using Zod
        const result = skillSchema.safeParse({ title, description });

        if (!result.success) {
            const formErrors = result.error.format();
            setErrors({
                title: formErrors.title?._errors[0] || '',
                description: formErrors.description?._errors[0] || '',
            });
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/topics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description }),
            });

            if (res.ok) {
                alert('Topic added successfully');
                // await router.push('/');
                 window.location.href = '/' 
            } else {
                throw new Error('Failed to add topic');
            }
        } catch (e) {
            console.error(e);
            alert('Failed to add topic. Please try again later');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
            <input
                onChange={(e) => {
                    setTitle(e.target.value);
                    setErrors((prev) => ({ ...prev, title: '' })); // Clear error on change
                }}
                value={title}
                className={`border border-slate-500 px-8 py-2 ${errors.title ? 'border-red-500' : ''}`}
                type='text'
                placeholder='Topic Title'
            />
            {errors.title && <span className='text-red-500'>{errors.title}</span>}
            
            <input
                onChange={(e) => {
                    setDescription(e.target.value);
                    setErrors((prev) => ({ ...prev, description: '' })); // Clear error on change
                }}
                value={description}
                className={`border border-slate-500 px-8 py-2 ${errors.description ? 'border-red-500' : ''}`}
                type='text'
                placeholder='Topic Description'
            />
            {errors.description && <span className='text-red-500'>{errors.description}</span>}
            
            <button
                type='submit'
                className='bg-lime-900 font-bold text-white py-3 px-6 w-fit'
            >
                Add Topic
            </button>
        </form>
    );
}
