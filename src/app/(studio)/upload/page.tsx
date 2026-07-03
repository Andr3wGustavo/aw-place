"use client"
import styles from "../studio.module.css";
import { uploadBeatAction } from "@/app/actions/beat-actions";

export default function UploadBeatPage() {
  return (
    <div>
      <h1>Novo Upload Automático</h1>
      <p style={{ color: "#94a3b8", marginTop: "0.5rem" }}>
        Arraste o seu WAV Mestre. Nosso sistema de automação cuidará da marca d'água de voz e conversão MP3.
      </p>

      <form action={uploadBeatAction} style={{ maxWidth: "600px", marginTop: "2rem" }}>
        
        {/* Zona de Drop para Arquivo */}
        <div className={styles.uploadZone}>
            <div className={styles.uploadIcon}>🎵</div>
            <h3>Arraste o arquivo .WAV aqui</h3>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginTop: "0.5rem" }}>
                Os metadados NFT serão gerados automaticamente.
            </p>
        </div>

        <div className={styles.formGroup}>
            <label>Título da Batida</label>
            <input type="text" name="title" placeholder="Ex: Neon Skies" required />
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
            <div className={styles.formGroup} style={{ flex: 1 }}>
                <label>Gênero</label>
                <input type="text" name="genre" placeholder="Ex: Trap" required />
            </div>
            <div className={styles.formGroup} style={{ flex: 1 }}>
                <label>BPM</label>
                <input type="number" name="bpm" placeholder="140" required />
            </div>
        </div>

        <div className={styles.formGroup}>
            <label>Preço Base (USD)</label>
            <input type="number" step="0.01" name="price" placeholder="49.99" required />
        </div>
        
        {/* Campo Oculto Mock para simplificar o PriceEth (normalmente gerado pelo servidor) */}
        <input type="hidden" name="priceEth" value="0.02" />

        <button type="submit" className={styles.submitBtn}>
            Fazer Upload & Processar Metadados Web3
        </button>
      </form>
    </div>
  );
}
