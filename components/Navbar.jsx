import Link from "next/link";

export default function Navbar() {
    return (
        <nav className=
            'flex justify-between items-center bg-lime-900 px-8 py-3'>
            <Link className=
                'text-white font-bold' href={'/'}>
                My Skills
            </Link>
            <Link className=
                'bg-red-800 text-white p-4 rounded-md' href={'/addSkill'}>
                Add Skill
            </Link>
        </nav>
    )
}