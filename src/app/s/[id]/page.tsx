import './index.css'
import db from '@/db/index'
import * as schema from '@/db/schema'
import {eq} from "drizzle-orm";
import {redirect} from "next/navigation";
import {clerkClient} from "@clerk/nextjs";
import MonacoEditor from "@/components/MonacoEditor/MonacoEditor";
import {Metadata} from "next";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'


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
      {
        query.lang !== 'markdown' ?
          <MonacoEditor readOnly={true} defaultValue={query.code} defaultLanguage={query.lang}/> :
          <div className='markdownViewer'>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
              code({node, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '')
                return match ? (
                  <SyntaxHighlighter
                    style={atomDark}
                    customStyle={{ backgroundColor: '#171717', outline: 'solid' }}
                    codeTagProps={{ className: 'codeHighlighter' }}
                    language={match[1]}
                    // eslint-disable-next-line react/no-children-prop
                    children={String(children).replace(/\n$/, '')}
                  />
                ) : (
                  <code className={className} {...props} style={{
                    fontSize: '1rem',
                    backgroundColor: '#171717',
                    outline: '3px solid #171717'
                  }}>
                    {children}
                  </code>
                )
              },
              img(props) {
                // eslint-disable-next-line jsx-a11y/alt-text
                return <img {...props} style={{ maxWidth: '100%' }} />
              }
            }}>
              {query.code}
            </ReactMarkdown>
          </div>
      }
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