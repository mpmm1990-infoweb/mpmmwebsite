import { supabase } from "./supabase";

interface PurchaseOrder {
  bookId: string;
  bookTitle: string;
  email: string;
  phone: string;
  paymentMethod: "bkash" | "nagad";
  paymentRef: string;
  amount: number;
}

export async function createPurchaseOrder(order: PurchaseOrder) {
  const { data, error } = await supabase
    .from("purchases")
    .insert({
      book_id: order.bookId,
      book_title: order.bookTitle,
      email: order.email,
      phone: order.phone,
      payment_method: order.paymentMethod,
      payment_ref: order.paymentRef,
      amount: order.amount,
      status: "pending",
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function verifyPurchase(purchaseId: string) {
  const { data, error } = await supabase
    .from("purchases")
    .select("*")
    .eq("id", purchaseId)
    .single();

  if (error) throw error;
  return data;
}

export async function generateDownloadLink(
  pdfPath: string,
  expiresInSeconds = 3600
) {
  const { data, error } = await supabase.storage
    .from("books")
    .createSignedUrl(pdfPath, expiresInSeconds);

  if (error) throw error;
  return data.signedUrl;
}
