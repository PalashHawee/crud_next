import EditTopicForm from "@/components/EditTopicForm";

const getTopicById = async (id) => {
    try {
        const res = await fetch(`http://localhost:5000/api/topics/${id}`, {
            cache: 'no-store'
        })
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
        
    } catch (e) {
        console.error('Error:', e.message)
       
     }
}

export default async function EditTopic({ params }) {
    const {id} = params
    const topic   = await getTopicById(id)
    const {title,description}=topic
    return (
        <>
            <EditTopicForm id={id } title={title} description={description} />
        </>
    )
}