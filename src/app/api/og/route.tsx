/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
// @ts-nocheck
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const hasTitle = searchParams.has("title");
  const title = hasTitle
    ? searchParams.get("title")?.slice(0, 100)
    : "Appily Advance";

  const hasImage = searchParams.has("image");
  const image = hasImage ? searchParams.get("image") : null;

  try {
    return new ImageResponse(
      (
        <div style={{ display: "flex" }}>
          <img width={320} height={320} src={image} />
          <h1>{title}</h1>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    return new Response("Failed to generate OG Image", { status: 500 });
  }
}
