import {auth} from "@clerk/nextjs";
import CreateSnippet from "@/components/CreateSnippet/CreateSnippet";
import SignInPrompt from "@/components/SignInPrompt/SignInPrompt";

export default function Home() {
  const { userId } = auth()
  return userId ? <CreateSnippet /> : <SignInPrompt />
}
