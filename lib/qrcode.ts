import QRCode from "qrcode";

export async function generateQrDataUrl(text: string): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      width: 240,
      margin: 2,
      color: {
        dark: "#171717",
        light: "#FFFFFF",
      },
    });
  } catch (err) {
    console.error("Failed to generate QR Code", err);
    throw err;
  }
}
