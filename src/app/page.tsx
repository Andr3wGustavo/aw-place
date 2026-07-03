import Web3LoginButton from "./components/Web3LoginButton";
import { getCatalog } from "./actions/beat-actions";

export default async function StorefrontPage() {
    // Busca as batidas diretamente do nosso Banco de Dados SQLite (Server Action)
    const beats = await getCatalog();

    return (
        <main className="app-container">
            {/* Navbar (O CSS estará em globals.css puxado do protótipo) */}
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

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <span className="hero-badge" style={{color: '#6366f1'}}>Web3 Music Revolution</span>
                    <h1 style={{fontSize: '4rem', fontWeight: 800}}>
                        Own Your Sound. <br/>
                        <span style={{ color: '#ec4899' }}>Buy Beats as NFTs.</span>
                    </h1>
                    <p style={{color: '#94a3b8', fontSize: '1.2rem', marginBottom: '2rem'}}>
                        Licenças garantidas por Smart Contracts. Downloads em qualidade de estúdio.
                    </p>
                </div>
            </section>

            {/* Grid de Beats Direto do Banco */}
            <section id="beats" className="beats-grid" style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem', paddingBottom: '120px'
            }}>
                {beats.length === 0 ? (
                    <p style={{color: '#94a3b8'}}>Nenhuma batida cadastrada ainda. Acesse o Creator Console para fazer upload!</p>
                ) : (
                    beats.map(beat => (
                        <div key={beat.id} className="beat-card" style={{
                            background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255,255,255,0.1)', 
                            borderRadius: '20px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem'
                        }}>
                            <div style={{height: '250px', background: '#333', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <span style={{fontSize: '3rem'}}>🎵</span>
                            </div>
                            <div>
                                <h3 style={{fontSize: '1.2rem'}}>{beat.title}</h3>
                                <p style={{color: '#94a3b8', fontSize: '0.9rem'}}>{beat.genre} • {beat.bpm} BPM</p>
                                <p style={{color: '#6366f1', fontWeight: 700, marginTop: '0.5rem'}}>${beat.priceUsd}</p>
                            </div>
                            <button style={{background: 'rgba(99, 102, 241, 0.2)', border: '1px solid #6366f1', color: '#fff', padding: '10px', borderRadius: '10px', cursor: 'pointer'}}>
                                Comprar Licença
                            </button>
                        </div>
                    ))
                )}
            </section>
        </main>
    );
}
