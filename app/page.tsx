import Image from "next/image";
import { RedirectType, redirect } from "next/navigation";


export default async function Home() {
  redirect('/feeds/1', RedirectType.replace);
}
