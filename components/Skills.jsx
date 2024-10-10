import Link from "next/link";
import {HiPencilAlt} from 'react-icons/hi'
import RemoveBtn from "./RemoveBtn";

// connecting with the backend
const getSkills = async () => {
    try {
        const res = await fetch('http://localhost:5000/api/topics',
            { cache: "no-store" })
        if (!res.ok) {
            throw new Error('Failed to fetch data from server')
        }
        return res.json()
    } catch (err) { 
        console.log('Failed to fetch data from server',err)
    }
}

export default async function Skills() {

     const  topics  = await getSkills();

  return (
    <>
      {topics.map((t) => (
        <div
          key={t._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={t._id} />
            <Link href={`/editTopic/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}