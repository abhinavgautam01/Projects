import clientPromise from "@/lib/mongodb";


export async function POST(request){
    const body = await request.json()
    const client = await clientPromise
    const db = client.db("linktree")
    const collection = db.collection("links")

    // If the handle is already claimed then you cannot claim it...!
    const doc = await collection.findOne({handle: body.handle})
    const result = await collection.insertOne(body)
    if (doc){
        return Response.json({success: false, error: true, message: "Handle already claimed..!", result: null})
    }
    else{
        return Response.json({success: true, error: false, message: "Your BitTree has been generated..!", result: result,})
    }


}


// export default async function Page({ params }) {
//   const slug = (await params).slug
//   return <div>My Post: {slug}</div>
// }