import { NextResponse } from "next/server";

export async function POST(request: Request){
    const { message } = await request.json();
    
    try{
        const res = await fetch("http://127.0.0.1:8000/api/translation" , {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({ message: message })
        });
        const result = await res.json();
        return NextResponse.json(result);
    }
    catch(err){
        return NextResponse.json({ error: "Failed to connect to the server" });
    }
}