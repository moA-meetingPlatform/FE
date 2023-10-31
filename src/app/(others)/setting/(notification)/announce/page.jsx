import React from "react";
import Link from "next/link";
import AnnounceList from "@/components/(page)/setting/AnnounceList";


export default async function announce() {
  const res = await fetch('http://localhost:9999/announces');
  const announces = await res.json();

return (
  <>
    <main className="mt-16">
      <h1 className="text-3xl font-semibold">공지사항</h1>
      <AnnounceList announces={announces}/>
      <ol className="mt-10">
      </ol>
    </main>
  </>
)
} 