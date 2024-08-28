"use client";
import Draggable from "react-draggable";

export default function Home() {
  return (
    <Draggable handle="h1" bounds="main">
      <div className=" border-black border-1 w-64">
        <div className="rounded-t-md p-[1px] bg-slate-900 text-slate-200 flex justify-evenly">
          <h1 className="cursor-move">Last.fm</h1>
        </div>
        <div className="rounded-b-md p-2 bg-[#5e0327]">
          <p className="text-xl text-slate-200">Welcome to my website</p>
        </div>
      </div>
    </Draggable>
  );
}
