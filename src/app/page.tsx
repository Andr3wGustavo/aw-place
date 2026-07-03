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
                    <span style={{color: '#6366f1', padding: '8px 20px', background: 'rgba(99,102,241,0.1)', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 600}}>
                        The Web3 Music Revolution
                    </span>
                    <h1 style={{fontSize: '4.5rem', fontWeight: 800, margin: '1.5rem 0 1rem'}}>
                        Own Your Sound. <br/>
                        <span style={{ color: '#ec4899' }}>Buy Beats as NFTs.</span>
                    </h1>
                    <p style={{color: '#94a3b8', fontSize: '1.2rem', marginBottom: '3rem'}}>
                        Licenças garantidas por Smart Contracts. Downloads imutáveis em qualidade de estúdio.
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
