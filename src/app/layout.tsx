import './globals.css'; // ✅ This is essential

export const metadata = {
  title: 'Your App',
  description: 'Awesome prompt site',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
