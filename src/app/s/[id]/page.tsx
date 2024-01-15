import './index.css'
import db from '@/db/index'
import * as schema from '@/db/schema'
import {eq} from "drizzle-orm";
import {redirect} from "next/navigation";
import {clerkClient} from "@clerk/nextjs";
import MonacoEditor from "@/components/MonacoEditor/MonacoEditor";
import {Metadata} from "next";

export default async function Page({ params }: { params: { id: string } }) {
  const query = await db.query.code.findFirst({
    where: eq(schema.code.id, params.id)
  }).execute()
  if (!query) {
    redirect('/s-notfound')
  }

  const user = await clerkClient.users.getUser(query.authorId)
  return (
    <div>
      <div className='snippetDescription'>
        <div style={{ display: 'flex' }}>
          <h1>File {query.fileName} by {user.username}</h1>
        </div>
        <p>Description: {query.description}</p>
      </div>
      <MonacoEditor readOnly={true} defaultValue={query.code} defaultLanguage={query.lang} />
    </div>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const query = await db.query.code.findFirst({
    where: eq(schema.code.id, params.id)
  }).execute()
  if (!query) return { title: 'Snippet not found' }
  return {
    title: query.fileName,
    description: query.description,
    authors: [{ name: query.authorId }],
    openGraph: {
      title: query.fileName,
      description: query.description,
      authors: [query.authorId],
    }
  }
}

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}