import { verifyPurchase, generateDownloadLink } from "@/lib/purchase";
import { sanityFetch } from "@/sanity/client";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Verify purchase exists and is verified
    const purchase = await verifyPurchase(id);

    if (!purchase) {
      return Response.json(
        { error: "Purchase not found" },
        { status: 404 }
      );
    }

    if (purchase.status !== "verified") {
      return Response.json(
        {
          error: "Purchase not yet verified",
          status: purchase.status,
        },
        { status: 403 }
      );
    }

    // Get the book's PDF path from Sanity
    const book = await sanityFetch<{ supabasePdfPath?: string }>(
      `*[_type == "book" && _id == $bookId][0]{ supabasePdfPath }`,
      { bookId: purchase.book_id },
      ["book"]
    );

    if (!book?.supabasePdfPath) {
      return Response.json(
        { error: "PDF not available for this book" },
        { status: 404 }
      );
    }

    // Generate signed URL (expires in 1 hour)
    const downloadUrl = await generateDownloadLink(
      book.supabasePdfPath,
      3600
    );

    return Response.json({ downloadUrl });
  } catch (error) {
    console.error("Download error:", error);
    return Response.json(
      { error: "Failed to generate download link" },
      { status: 500 }
    );
  }
}
