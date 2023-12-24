import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <Image src='/images/uberbanner.jpg' width={1200} height={1000} className="object-contain" />
      <div className="absolute top-20 right-0">
      <SignIn />
      </div>
    </>
  )
}