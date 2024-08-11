import { UploadThingError } from "uploadthing/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();


// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        // Set permissions and file types for this FileRoute
        .middleware(async ({}) => {
            // This code runs on your server before upload
            const user = auth();
            if (!user.userId) throw new UploadThingError("Unauthorized");
            if (user.userId !== "user_2gfs8voqQwlIuXC4cuu5ugMtfrj")
              throw new UploadThingError("Unauthorized");

            // If you throw, the user will not be able to upload
            if (!user) throw new Error("Unauthorized");

            // Whatever is returned here is accessible in onUploadComplete as `metadata`
            return { userId: user.userId };
        })
        .onUploadComplete(async () => {

            // This code RUNS ON YOUR SERVER after upload
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
