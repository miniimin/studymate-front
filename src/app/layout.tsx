import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import styles from "@/app/page.module.css"
import './globals.css'

export const metadata = {
  title: '키플리',
  description: '스터디플랫폼',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.main}>
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html >
  )
}
