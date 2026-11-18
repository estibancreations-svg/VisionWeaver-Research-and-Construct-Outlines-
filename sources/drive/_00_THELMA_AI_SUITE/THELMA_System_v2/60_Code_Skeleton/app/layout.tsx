Original name: layout.tsx
Drive ID: 1dsBhQEVx0Nd9IBQeyqflYBJthP1BKIpT
Parent folder: _00_THELMA_AI_SUITE/THELMA_System_v2/60_Code_Skeleton/app/
Modified: 2025-12-18T21:24:42.000Z

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial" }}>
        {children}
      </body>
    </html>
  );
}
