"use client"

import { useAudio } from '../context/AudioContext';

export default function AudioPlayer() {
    const { currentBeat, isPlaying, togglePlay, progress, duration } = useAudio();

    // Se nenhuma música foi selecionada na vitrine, esconde o player
    if (!currentBeat) return null;

    // Converte segundos em formato MM:SS
    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;

    return (
        <div className="audio-player-glass">
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {/* Capa animada (girando levemente quando toca) */}
                <div style={{ width: '50px', height: '50px', background: `linear-gradient(135deg, #ec4899, #6366f1)`, borderRadius: '12px', boxShadow: '0 0 15px rgba(236,72,153,0.5)', transition: 'transform 0.5s', transform: isPlaying ? 'scale(1.1)' : 'scale(1)' }}></div>
                <div>
                    <h4 style={{ margin: 0, fontSize: '1rem' }}>{currentBeat.title}</h4>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>AWPLACE DOG</p>
                </div>
            </div>
            
            <button 
                onClick={togglePlay}
                style={{ background: '#6366f1', border: 'none', color: '#fff', borderRadius: '50%', width: '45px', height: '45px', cursor: 'pointer', fontSize: '1.2rem'}}
            >
                {isPlaying ? '⏸' : '▶'}
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{formatTime(progress)}</span>
                <div style={{width: '250px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px'}}>
                    <div style={{width: `${progressPercent}%`, height: '100%', background: '#6366f1', borderRadius: '5px', transition: 'width 0.1s linear'}}></div>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{formatTime(duration)}</span>
            </div>
            
            <button style={{ background: 'transparent', border: '1px solid #6366f1', color: '#6366f1', padding: '8px 15px', borderRadius: '50px', cursor: 'pointer'}}>
                Comprar Licença
            </button>
        </div>
    );
}
