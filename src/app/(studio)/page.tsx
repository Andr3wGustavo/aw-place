import styles from "./studio.module.css";

export default function StudioDashboard() {
  return (
    <div>
      <h1>Visão Geral do Produtor</h1>
      <p style={{ color: "#94a3b8", marginTop: "0.5rem" }}>
        Acompanhe suas vendas e licenças descentralizadas.
      </p>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>$ 1,240</span>
          <span className={styles.statLabel}>Vendas (USD/ETH)</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>45</span>
          <span className={styles.statLabel}>Licenças Vendidas</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>12</span>
          <span className={styles.statLabel}>Beats no Catálogo</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>8</span>
          <span className={styles.statLabel}>Membros Ativos (Clube)</span>
        </div>
      </div>
    </div>
  );
}
