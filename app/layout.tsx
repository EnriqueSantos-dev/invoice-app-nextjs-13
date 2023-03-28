import "@/app/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import Providers from "./components/Providers";
import { League_Spartan } from "@next/font/google";

const roboto = League_Spartan({
  weight: ["400", "500", "700"],
  adjustFontFallback: true,
  subsets: ["latin"],
});

export const metadata = {
  title: "Invoice | App",
  description: "Invoice App. Challenge from frontend mentor",
  authors: [
    {
      name: "Enrique Santos",
      url: "https://github.com/enriquesantos-dev",
    },
  ],
  icons: [
    {
      rel: "icon",
      url: "/assets/favicon.png",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.className}>
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
