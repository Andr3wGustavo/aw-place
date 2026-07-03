"use client"

export default function CheckoutModal({ beat, onClose }: { beat: any, onClose: () => void }) {
    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(15px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100000
        }}>
            <div style={{
                background: '#09090b', border: '1px solid rgba(255,255,255,0.1)',
                padding: '2.5rem', borderRadius: '24px', width: '90%', maxWidth: '650px',
                color: '#fff', boxShadow: '0 20px 40px rgba(0,0,0,0.8)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                    <h2>Checkout: {beat.title}</h2>
                    <button onClick={onClose} style={{background: 'transparent', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer', lineHeight: '1rem'}}>×</button>
                </div>

                <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>Escolha o nível da sua Licença Descentralizada (NFT):</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
                    <div style={{ padding: '1.5rem', border: '2px solid #6366f1', borderRadius: '16px', background: 'rgba(99,102,241,0.05)', cursor: 'pointer', transition: 'all 0.3s' }}>
                        <h3 style={{ color: '#6366f1' }}>Basic Lease</h3>
                        <p style={{color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.5rem'}}>MP3 File + Contract<br/>Up to 50,000 Streams</p>
                        <h4 style={{marginTop: '1.5rem', fontSize: '1.5rem'}}>${beat.priceUsd}</h4>
                    </div>
                    <div style={{ padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.3s' }}>
                        <h3 style={{ color: '#f8fafc' }}>Premium Stems</h3>
                        <p style={{color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.5rem'}}>WAV Trackouts + Contract<br/>Unlimited Streams</p>
                        <h4 style={{marginTop: '1.5rem', fontSize: '1.5rem'}}>${(beat.priceUsd * 2.5).toFixed(2)}</h4>
                    </div>
                </div>

                <h3>Método de Pagamento</h3>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button style={{ flex: 1, padding: '1rem', background: '#fff', border: 'none', color: '#000', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>
                        Pagar com FIAT (Stripe / Pix)
                    </button>
                    <button style={{ flex: 1, padding: '1rem', background: 'rgba(99, 102, 241, 0.2)', border: '1px solid #6366f1', color: '#6366f1', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>
                        Pagar com Cripto (ETH)
                    </button>
                </div>
            </div>
        </div>
    );
}
