import {SignIn} from "@clerk/nextjs";

export default function SignInPrompt() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h1>Hewwo! Please sign in first!</h1>
      <SignIn />
    </div>
  )
}