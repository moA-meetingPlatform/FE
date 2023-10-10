import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    // const res = await request.json()
    // console.log({ request })
    // const res1 = {
    //     "isSuccess": true,
    //     "code": 1000
    // }
    // return NextResponse.json({ request })
    const url = new URL(request.url || "");
    const queryParams = Object.fromEntries(url.searchParams.entries());
    
    // console.log("Query Parameters:", queryParams);

    return NextResponse.json({ queryParams });
}