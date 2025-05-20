import { NextApiRequest, NextApiResponse } from "next";

import { S3 } from "aws-sdk";
import { nanoid } from "nanoid";

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  httpOptions: {
    timeout: 300000,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const s3Params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Fields: {
      key: `${nanoid()}.mp4`,
      "Content-Type": "video/mp4",
    },
  };

  try {
    const data = await s3.createPresignedPost(s3Params);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generating signed URL" });
  }
}
