"use client"

import { useState } from 'react';

export default function Web3LoginButton() {
    const [address, setAddress] = useState<string | null>(null);

    const handleLogin = () => {
        // Integração futura com Wagmi / Viem para capturar a carteira MetaMask
        // SIWE: Sign-In With Ethereum
        setAddress("0x7F...3B92");
    };

    return (
        <button 
            onClick={handleLogin}
            style={{
                background: address ? 'rgba(255, 255, 255, 0.1)' : 'rgba(99, 102, 241, 0.2)',
                border: address ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid #6366f1',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '100px',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.3s'
            }}
        >
            {address ? `🟢 ${address}` : "Conectar Carteira (SIWE)"}
        </button>
    );
}
