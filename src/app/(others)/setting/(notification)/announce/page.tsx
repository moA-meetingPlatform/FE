import React from "react";
import Link from "next/link";

export default async function announce() {
  const res = await fetch('http://localhost:9999/announces');
  const announces = await res.json();

return (
  <>
  <main className="mt-16 p-5">
  <h1 className="text-3xl font-semibold">공지사항</h1>
  <ol className="mt-10">
    {announces.map((announce:any)=>{
      return <li key={announce.id} className="flex justify-between border-t h-16 leading-[64px] tracking-tighter">
        <Link href={`/setting/announce/${announce.id}`}>{announce.title}</Link>
        <span>{announce.date}</span>
      </li>
    })}
  </ol>
  </main>
  </>
)
}