import Link from "next/link";
import styles from "./studio.module.css";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.studioContainer}>
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>AWPLACE Studio</h2>
        <nav className={styles.navLinks}>
          <Link href="/studio" className={styles.navLink}>
            Dashboard
          </Link>
          <Link href="/studio/upload" className={styles.navLink}>
            Upload Beat
          </Link>
          <Link href="/studio/catalog" className={styles.navLink}>
            Catálogo
          </Link>
          <Link href="/studio/automations" className={styles.navLink}>
            Automações de IA
          </Link>
        </nav>
      </aside>
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
