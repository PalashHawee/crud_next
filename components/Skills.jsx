import Link from "next/link";
import {HiPencilAlt} from 'react-icons/hi'
import RemoveBtn from "./RemoveBtn";

export default function Skills() {
    return (
        <>
            <div className=
                'p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start'>
                <div>
                    <h2 className='font-bold text-xl'>Add Topic</h2>
                    <div>Topic Description</div>
                </div>
                <div className='flex gap-2'>
                    <RemoveBtn />
                    <Link href={'/editTopic/123'}><HiPencilAlt size={24} /></Link>
                </div>
            </div>
        </>
    )
}