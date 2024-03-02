import {ZCreateApiRequest} from "@/utils/types";
import db from "@/db";
import {code} from "@/db/schema";
import {randomString} from "util-utils";
import * as schema from "@/db/schema";

export async function POST(request: Request) {
  if (request.headers.get('Authorization') !== process.env.AUTOMATA_UPLOAD_KEY)
      return new Response('Unauthorized', {status: 401})
  try {
    const data = await ZCreateApiRequest.parseAsync(await request.json())
    const written = await db.insert(code)
      .values({
        id: randomString(8),
        ...data
      })
      .returning({
        snippetId: schema.code.id
      })
    return new Response(JSON.stringify(written[0].snippetId), {status: 200})
  } catch (e) {
    return new Response(`Invalid request ${e}`, {status: 400})
  }
}