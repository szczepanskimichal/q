// import fs from "fs";
// import path from "path";
// import formidable from "formidable";
// import AWS from "aws-sdk";

// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRET_KEY,
// });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req, res) {
//   const form = new formidable.IncomingForm({
//     uploadDir: path.join(process.cwd(), "tmp"),
//     keepExtensions: true,
//   });

//   form.parse(req, async (err, fields, files) => {
//     if (err) {
//       console.error("Form parsing error:", err);
//       return res.status(500).json({ error: "Error parsing form" });
//     }

//     const file = files.file;
//     if (!file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const filePath = file.filepath;
//     if (!fs.existsSync(filePath)) {
//       return res.status(400).json({ error: "File not found" });
//     }

//     const buffer = fs.readFileSync(filePath);
//     const newFilename = `${Date.now()}-${file.originalFilename}`;
//     const bucket = process.env.AWS_BUCKET_NAME;

//     try {
//       await s3
//         .upload({
//           Bucket: bucket,
//           Key: newFilename,
//           Body: buffer,
//         })
//         .promise();

//       fs.unlinkSync(filePath);

//       const fileUrl = `https://${bucket}.s3.amazonaws.com/${newFilename}`;

//       return res.status(200).json({ fileUrl });
//     } catch (uploadError) {
//       console.error("File upload error:", uploadError);
//       return res.status(500).json({ error: "Error uploading file" });
//     }
//   });
// }
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "formidable";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handle(req, res) {
  const uploadDir = path.join(process.cwd(), "tmp");

  // Sprawdź, czy katalog istnieje, jeśli nie, utwórz go
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const form = formidable({
    uploadDir: "./tmp",
    keepExtensions: true,
  });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parsing error:", err);
      return res.status(500).json({ error: "Error parsing form data" });
    }

    const file = files.file[0];

    try {
      const s3client = new S3Client({
        region: "eu-north-1",
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY,
          secretAccessKey: process.env.AWS_SECRET_KEY,
        },
      });

      const ext = file.originalFilename.split(".").pop();
      const newFilename = uniqid() + "." + ext;
      const bucket = "ecommerce2-michal";
      const buffer = fs.readFileSync(file.filepath);

      await s3client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: newFilename,
          ACL: "public-read",
          ContentType: file.mimetype,
          Body: buffer,
        })
      );
      fs.unlinkSync(file.filepath);
      const fileUrl = `https://${bucket}.s3.amazonaws.com/${newFilename}`;
      return res.status(200).json(fileUrl);
    } catch (uploadError) {
      console.error("File upload error:", uploadError);
      return res.status(500).json({ error: "Error uploading file" });
    }
  });
}
