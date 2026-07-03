// js/beats-data.js
// Mock database representing the beats available on awplace dog

const beatsCatalog = [
    {
        id: "beat-001",
        title: "Neon Skies",
        producer: "awplace dog",
        genre: "trap",
        bpm: 140,
        key: "C Minor",
        priceEth: 0.02,
        priceUsd: 49.99,
        cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=300",
        audioDemo: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        id: "beat-002",
        title: "Midnight Ride",
        producer: "awplace dog",
        genre: "drill",
        bpm: 144,
        key: "F# Minor",
        priceEth: 0.025,
        priceUsd: 59.99,
        cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=300",
        audioDemo: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        id: "beat-003",
        title: "Smooth Talk",
        producer: "awplace dog",
        genre: "rnb",
        bpm: 95,
        key: "A Major",
        priceEth: 0.015,
        priceUsd: 35.00,
        cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=300",
        audioDemo: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
];

window.beatsCatalog = beatsCatalog;
