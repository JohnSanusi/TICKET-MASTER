import { NextResponse } from "next/server"
import path from "path"
import fs from "fs"
import { writeFile } from "fs/promises"

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get("file") as File

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const filename = Date.now() + "_" + file.name.replaceAll(" ", "_")
  
  // Ensure uploads directory exists
  const uploadDir = path.join(process.cwd(), "public/uploads")
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }

  try {
    await writeFile(path.join(uploadDir, filename), buffer)
    return NextResponse.json({ 
      success: true, 
      url: `/uploads/${filename}` 
    })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
