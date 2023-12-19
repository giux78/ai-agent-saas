
import { env } from "@/env.mjs"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({ region: "eu-west-1",
credentials: {
  accessKeyId: env.AWS_SERVER_PUBLIC_KEY,
  secretAccessKey: env.AWS_SERVER_SECRET_KEY,
} });

