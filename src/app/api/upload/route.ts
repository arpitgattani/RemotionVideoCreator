import { NextRequest, NextResponse } from "next/server";
import admin from "firebase-admin";
import { getStorage } from "firebase-admin/storage";
import { getFirestore } from "firebase-admin/firestore";

let app;
try {
  app = admin.app();
} catch {
  app = admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID || "",
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL || "",
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n") || "",
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

const storage = getStorage(app);
const bucket = storage.bucket();
const db = getFirestore(app);

export async function POST(req: NextRequest) {
  try {
    // Parse formData
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const configName = formData.get("configName") as string;
    const configData = formData.get("configData") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);

    const timestamp = Date.now();
    const filename = `configs/${timestamp}-${file.name.replace(/\s+/g, "_")}`;

    const fileUpload = bucket.file(filename);
    await fileUpload.save(fileBuffer, {
      metadata: {
        contentType: file.type,
      },
    });

    await fileUpload.makePublic();

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;

    const configRef = db.collection("videoapi").doc();
    await configRef.set({
      name: configName,
      imageUrl: publicUrl,
      configData: JSON.parse(configData || "{}"),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      url: publicUrl,
      configId: configRef.id,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 },
    );
  }
}
