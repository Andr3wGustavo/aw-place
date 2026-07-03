import { getCatalog } from "../actions/beat-actions";
import BeatCard from "../components/BeatCard";
import Web3LoginButton from "../components/Web3LoginButton";

export default async function VipBeatClubPage() {
    // Simulação do Banco de Dados: Pegamos apenas as batidas marcadas como "Premium/Caras"
    // Na blockchain real, leríamos a carteira conectada e checaríamos se ele tem o NFT VIP
    const beats = await getCatalog();
    const exclusiveBeats = beats.filter(b => b.priceUsd > 50);

    return (
        <main className="app-container">
            <header className="navbar">
                <div className="logo">
                    <a href="/" style={{color: 'inherit', textDecoration: 'none'}}>awplace dog</a>
                </div>
                <div className="nav-actions">
                    <Web3LoginButton />
                </div>
            </header>

            <section className="hero" style={{padding: '5rem 0 3rem'}}>
                <div className="hero-content">
                    <span style={{color: '#ec4899', padding: '8px 25px', background: 'rgba(236, 72, 153, 0.1)', border: '1px solid rgba(236, 72, 153, 0.3)', borderRadius: '100px', fontSize: '0.9rem', fontWeight: 600}}>
                        Token-Gated Experience
                    </span>
                    <h1 style={{fontSize: '4rem', fontWeight: 900, margin: '1.5rem 0'}}>
                        AWPLACE <span style={{color: '#ec4899'}}>VIP CLUB</span>
                    </h1>
                    <p style={{color: '#94a3b8', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto'}}>
                        Acesso autorizado! Você possui o passe NFT. Bem-vindo ao acervo oculto de batidas premium. Ninguém mais tem acesso a esta página.
                    </p>
                </div>
            </section>

            <div className="beats-grid" style={{marginTop: '2rem'}}>
                {exclusiveBeats.length === 0 ? (
                    <p style={{color: '#94a3b8'}}>Nenhuma batida exclusiva vazada no momento.</p>
                ) : (
                    exclusiveBeats.map(beat => (
                        <BeatCard key={beat.id} beat={beat} />
                    ))
                )}
            </div>
        </main>
    );
}
