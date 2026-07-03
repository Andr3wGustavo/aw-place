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
        <div style={{
            position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)',
            borderRadius: '100px', padding: '15px 30px', display: 'flex', gap: '25px',
            alignItems: 'center', color: '#fff', border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)', zIndex: 9999
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {/* Se houvesse cover da música, entraria aqui. Mock colorido pro MVP */}
                <div style={{ width: '40px', height: '40px', background: '#ec4899', borderRadius: '10px' }}></div>
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
