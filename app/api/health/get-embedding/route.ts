import { NextResponse } from "next/server"
import { getEmbedding } from "../../helper/helper"
import query from "../../db/query"

export async function POST(request: Request){

    const req =  await request.json()
    const {searchTitle} = req
    try {
        const embedding = await getEmbedding(searchTitle)
        const res = await query(`SELECT ARTICLE.id, ARTICLE.title, ARTICLE.json
        FROM ARTICLE JOIN ARTICLE_EMBEDDING ON ARTICLE.id = ARTICLE_EMBEDDING.artikel_id 
        ORDER BY ARTICLE_EMBEDDING.title_embedding <-> '[${embedding}]' LIMIT 1;
        `)

        const rows = res.rows

        //SELECT * FROM items WHERE id != 1 ORDER BY embedding <-> (SELECT embedding FROM items WHERE id = 1) LIMIT 5;

        console.log(res)
        return NextResponse.json({rows: rows})
    } catch (error) {
        console.log(error)
        return NextResponse.json({},{status:500})
    }

}