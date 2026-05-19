import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Indra Cyber Home - Эцэг эхийн хяналт",
  description: "Хүүхдийн боловсролын явцыг хянах систем",
};

export default function ParentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}