"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

// Define the Zod schema
const topicSchema = z.object({
  newTitle: z.string().min(1, "Title is required"),
  newDescription: z.string().min(1, "Description is required"),
});

export default function EditTopicForm({ id, title, description }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form data
    try {
      const validatedData = topicSchema.parse({ newTitle, newDescription });
      
      const res = await fetch(`http://localhost:5000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(validatedData), // Use validated data
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = {};
        error.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message;
        });
        setErrors(formattedErrors);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => {
          setNewTitle(e.target.value);
          setErrors((prev) => ({ ...prev, newTitle: undefined })); // Clear error on change
        }}
        value={newTitle}
        className={`border ${errors.newTitle ? 'border-red-500' : 'border-slate-500'} px-8 py-2`}
        type="text"
        placeholder="Topic Title"
      />
      {errors.newTitle && <span className="text-red-500">{errors.newTitle}</span>}

      <input
        onChange={(e) => {
          setNewDescription(e.target.value);
          setErrors((prev) => ({ ...prev, newDescription: undefined })); // Clear error on change
        }}
        value={newDescription}
        className={`border ${errors.newDescription ? 'border-red-500' : 'border-slate-500'} px-8 py-2`}
        type="text"
        placeholder="Topic Description"
      />
      {errors.newDescription && <span className="text-red-500">{errors.newDescription}</span>}

      <button className="bg-lime-900 font-bold text-white py-3 px-6 w-fit">
        Update Topic
      </button>
    </form>
  );
}
