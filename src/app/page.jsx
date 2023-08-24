import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>
        <h1>This is Home</h1>
        <p>Explore All the rooms</p>
        <p>
          <b>Guest are the God and you are the one.</b>
        </p>
        <p>Just a click away from bookin the room</p>
        <Link href={"/home"} className="bg-blue-700 text-white rounded p-2 m-2">Get Started</Link>
      </div>
    </>
  );
}
