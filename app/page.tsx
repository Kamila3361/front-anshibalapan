import Image from "next/image";
import FBXViewer from "./components/FBXViewer";
import Songs from "./components/songlist";
import {TextareaWithButton} from "./components/text";
// import { useState } from "react";

export default function Home() {
  // const animations = [
  //   "https://3dmodelskam.s3.eu-north-1.amazonaws.com/Standing+Greeting.fbx",
  //   "https://3dmodelskam.s3.eu-north-1.amazonaws.com/Pointing+Gesture.fbx",
  //   "https://3dmodelskam.s3.eu-north-1.amazonaws.com/Happy.fbx",
  //   "https://3dmodelskam.s3.eu-north-1.amazonaws.com/Singing.fbx"
  // ];

  const animations = [
    "/model/Standing Greeting.fbx",
    "/model/Pointing Gesture.fbx",
    "/model/Happy.fbx",
    "/model/Singing.fbx"
  ]

  return (
    <div className='flex bg-cover bg-center bg-[url("/model/sky.jpg")] bg-fixed'> {/*bg-cover bg-center bg-[url("/model/tau.jpg")]*/}
      <Songs />
      {/* <div className='flex-1 h-full w-[1100px] fixed ml-[350px]'>
        <FBXViewer urls={animations} />
      </div> */}
      <div>
        <TextareaWithButton />
      </div>
    </div>
  );
}
