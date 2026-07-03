import { prisma } from "../../actions/beat-actions";
import BeatCard from "../../components/BeatCard";
import Web3LoginButton from "../../components/Web3LoginButton";
import { notFound } from "next/navigation";

export default async function ProducerProfilePage({ params }: { params: { id: string } }) {
    // Busca o produtor e todas as suas músicas
    const producer = await prisma.user.findUnique({
        where: { id: params.id },
        include: { beats: true }
    });

    if (!producer) return notFound();

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

            {/* Header do Produtor */}
            <section style={{marginTop: '4rem', marginBottom: '4rem', display: 'flex', alignItems: 'center', gap: '2rem', padding: '3rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', backdropFilter: 'blur(10px)'}}>
                <div style={{width: '120px', height: '120px', background: 'linear-gradient(45deg, #6366f1, #ec4899)', borderRadius: '50%', boxShadow: '0 0 30px rgba(99,102,241,0.5)'}}></div>
                <div>
                    <span style={{color: '#06b6d4', fontSize: '0.9rem', fontWeight: 700}}>PRODUCER PROFILE</span>
                    <h1 style={{fontSize: '3rem', margin: '0.5rem 0'}}>{producer.name}</h1>
                    <p style={{color: '#94a3b8'}}>Official Beat Store & Web3 Smart Contracts</p>
                </div>
                <div style={{marginLeft: 'auto'}}>
                    <button className="web3-glow-button" style={{padding: '12px 25px', background: '#fff', color: '#000', border: 'none', borderRadius: '100px', fontWeight: 800, cursor: 'pointer'}}>
                        Inscrever-se no VIP
                    </button>
                </div>
            </section>

            <h2 style={{marginBottom: '2rem'}}>Catálogo do Produtor</h2>
            <div className="beats-grid">
                {producer.beats.length === 0 ? (
                    <p style={{color: '#94a3b8'}}>O catálogo está vazio.</p>
                ) : (
                    producer.beats.map(beat => (
                        <BeatCard key={beat.id} beat={beat} />
                    ))
                )}
            </div>
        </main>
    );
}
