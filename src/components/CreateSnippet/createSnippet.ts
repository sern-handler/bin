'use server'
import {ICreateApiRequest} from "@/utils/types";
import db from "@/db";
import * as schema from "@/db/schema";
import {randomString} from "util-utils";

export async function createSnippet(snippet: ICreateApiRequest) {
  if (Object.values(snippet).some(e => typeof e === 'string' && e.trim() === '')) throw new Error('fillFields');
  const query = await db
    .insert(schema.code)
    .values({
      id: randomString(8),
      ...snippet
    })
    .returning({
      snippetId: schema.code.id
    })
    .execute();
  return query[0].snippetId;
}