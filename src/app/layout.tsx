import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
title: {
default: "CloudsArchive | Every Cloud Has a Story",
template: "%s | CloudsArchive",
},
description:
"Discover, explore, and share beautiful cloud and sky photography with the CloudsArchive community.",
metadataBase: new URL(
process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
),
};

export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode;
}>) {
return (
<html lang="en">
<body>{children}</body>
</html>
);
}