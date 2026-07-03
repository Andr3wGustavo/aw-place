"use client"

import { useState } from 'react';

export default function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);

    // Componente React isolado, a música não para ao navegar de página!
    return (
        <div style={{
            position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)',
            borderRadius: '100px', padding: '15px 30px', display: 'flex', gap: '25px',
            alignItems: 'center', color: '#fff', border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)', zIndex: 9999
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '40px', height: '40px', background: '#ec4899', borderRadius: '10px' }}></div>
                <div>
                    <h4 style={{ margin: 0, fontSize: '1rem' }}>Neon Skies</h4>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>AWPLACE DOG</p>
                </div>
            </div>
            
            <button 
                onClick={() => setIsPlaying(!isPlaying)}
                style={{ background: '#6366f1', border: 'none', color: '#fff', borderRadius: '50%', width: '45px', height: '45px', cursor: 'pointer', fontSize: '1.2rem'}}
            >
                {isPlaying ? '⏸' : '▶'}
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>0:45</span>
                <div style={{width: '250px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px'}}>
                    <div style={{width: isPlaying ? '50%' : '20%', height: '100%', background: '#6366f1', borderRadius: '5px', transition: 'width 0.3s ease'}}></div>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>3:20</span>
            </div>
            
            <button style={{ background: 'transparent', border: '1px solid #6366f1', color: '#6366f1', padding: '8px 15px', borderRadius: '50px', cursor: 'pointer'}}>
                Buy License
            </button>
        </div>
    );
}
