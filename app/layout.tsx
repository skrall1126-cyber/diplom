import type { Metadata } from "next";
import "./globals.css";
import PageTransition from "@/components/PageTransition";
import AIChatbot from "@/components/AIChatbot";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Indra Cyber Institute",
  description: "Empower Your Future",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn">
      <body>
        <AuthProvider>
          <PageTransition>{children}</PageTransition>
          <AIChatbot />
        </AuthProvider>
      </body>
    </html>
  );
}
