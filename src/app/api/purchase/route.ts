import { createPurchaseOrder } from "@/lib/purchase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { bookId, bookTitle, email, phone, paymentMethod, paymentRef, amount } = body;

    // Validate required fields
    if (!bookId || !email || !phone || !paymentMethod || !paymentRef || !amount) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate payment method
    if (!["bkash", "nagad"].includes(paymentMethod)) {
      return Response.json(
        { error: "Invalid payment method" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const purchase = await createPurchaseOrder({
      bookId,
      bookTitle: bookTitle || "",
      email,
      phone,
      paymentMethod,
      paymentRef,
      amount,
    });

    return Response.json(
      { success: true, purchaseId: purchase.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Purchase error:", error);
    return Response.json(
      { error: "Failed to process purchase" },
      { status: 500 }
    );
  }
}
