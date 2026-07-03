import Web3LoginButton from "./components/Web3LoginButton";
import { getCatalog } from "./actions/beat-actions";
import BeatCard from "./components/BeatCard";

export default async function StorefrontPage() {
    // Busca as batidas diretamente do Banco de Dados
    const beats = await getCatalog();

    return (
        <main className="app-container">
            <header className="navbar">
                <div className="logo">
                    <span>awplace dog</span>
                </div>
                
                <nav className="nav-links">
                    <a href="#beats" className="active">Beats</a>
                    <a href="/studio">Creator Console</a>
                </nav>
                
                <div className="nav-actions">
                    <Web3LoginButton />
                </div>
            </header>

            <section className="hero">
                <div className="hero-content">
                    <span style={{color: '#06b6d4', padding: '8px 25px', background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '100px', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', boxShadow: '0 0 15px rgba(6,182,212,0.3)'}}>
                        The Web3 Music Revolution
                    </span>
                    <h1 style={{fontSize: '5rem', fontWeight: 900, margin: '2rem 0 1.5rem', lineHeight: '1.1', letterSpacing: '-2px'}}>
                        Own Your Sound. <br/>
                        <span className="web3-gradient-text">Buy Beats as NFTs.</span>
                    </h1>
                    <p style={{color: '#94a3b8', fontSize: '1.25rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem'}}>
                        Licenças garantidas por Smart Contracts. Downloads imutáveis em qualidade de estúdio, conectando produtores e artistas diretamente.
                    </p>
                </div>
            </section>

            {/* Grid de Beats Renderizados via React Client Component */}
            <section id="beats" className="beats-grid">
                {beats.length === 0 ? (
                    <p style={{color: '#94a3b8'}}>Nenhuma batida cadastrada ainda. Acesse o Creator Console para fazer upload!</p>
                ) : (
                    beats.map(beat => (
                        <BeatCard key={beat.id} beat={beat} />
                    ))
                )}
            </section>
        </main>
    );
}
