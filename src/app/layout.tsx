import '../globals.css';
import Header from '../components/Header/Header'

export const metadata = {
  title: 'RentalCar',
  description: 'Car rental web application',
 
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className="app">
        <Header />    {/* Header завжди зверху */}
        {children}    {/* Main підставляється з page.tsx */}
      </body>
    </html>
  );
}
