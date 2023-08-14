"use client";

//--Components
import PageHeader from "@/components/page_header";
import BuzzList from "@/components/BuzzList/BuzzList";

export default function Home() {
  return (
    <>
      <PageHeader />
      <main id="flexError" className="flex-col items-center pt-4">
        <BuzzList />
      </main>
    </>
  );
}
