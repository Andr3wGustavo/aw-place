"use client"

import { useState } from 'react';
import { useAudio } from '../context/AudioContext';
import CheckoutModal from './CheckoutModal';

export default function BeatCard({ beat }: { beat: any }) {
    const { playBeat, currentBeat, isPlaying } = useAudio();
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    // Checa se ESSE card específico está tocando no contexto global
    const isThisPlaying = currentBeat?.id === beat.id && isPlaying;

    return (
        <>
            <div className="beat-card animate-slide-up">
                {/* Capa clicável para dar Play/Pause */}
                <div 
                    style={{height: '250px', background: '#333', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', cursor: 'pointer', transition: 'all 0.3s'}}
                    onClick={() => playBeat(beat)}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                    <span style={{
                        fontSize: '3rem', 
                        background: 'rgba(0,0,0,0.5)', 
                        padding: '10px', borderRadius: '50%', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        backdropFilter: 'blur(10px)'
                    }}>
                        {isThisPlaying ? '⏸' : '▶'}
                    </span>
                </div>
                
                {/* Informações da Música */}
                <div style={{ marginTop: '1rem' }}>
                    <h3 style={{fontSize: '1.2rem', margin: 0}}>{beat.title}</h3>
                    <p style={{color: '#94a3b8', fontSize: '0.9rem', margin: '0.2rem 0'}}>{beat.genre} • {beat.bpm} BPM</p>
                    <p style={{color: '#06b6d4', fontWeight: 700, marginTop: '0.5rem'}}>${beat.priceUsd}</p>
                </div>

                {/* Botão de Compra Híbrida */}
                <button 
                    onClick={() => setIsCheckoutOpen(true)}
                    style={{
                        background: 'rgba(99, 102, 241, 0.2)', border: '1px solid #6366f1', 
                        color: '#fff', padding: '12px', borderRadius: '10px', cursor: 'pointer', 
                        fontWeight: 600, marginTop: '1rem', transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(99, 102, 241, 0.4)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(99, 102, 241, 0.2)'}
                >
                    Comprar Licença
                </button>
            </div>

            {/* Modal de Checkout (só renderiza se o estado for true) */}
            {isCheckoutOpen && (
                <CheckoutModal beat={beat} onClose={() => setIsCheckoutOpen(false)} />
            )}
        </>
    );
}
