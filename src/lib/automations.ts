import path from 'path';

/**
 * AWPLACE DOG - Motor FFMPEG
 * Processa a música real e aplica a voice tag. (Requer FFMPEG nativo no Docker Alpine).
 */
export async function generateWatermarkedPreview(inputWavPath: string, outputMp3Name: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const voiceTagPath = path.resolve('./public/assets/voice-tag.mp3');
        const outputPath = path.resolve(`./public-previews/${outputMp3Name}.mp3`);
        
        console.log(`[FFMPEG] Mixando áudio master com Voice Tag: ${inputWavPath}`);
        
        /* Implementação Real - Ativar após deploy na VPS
        const ffmpeg = require('fluent-ffmpeg');
        ffmpeg()
          .input(inputWavPath)
          .input(voiceTagPath)
          // Filtro avançado para sobrepor a Voice Tag em Loop
          .complexFilter('[0:a][1:a]amix=inputs=2:duration=first:dropout_transition=2[a]')
          .outputOptions(['-map [a]', '-c:a libmp3lame', '-q:a 2'])
          .save(outputPath)
          .on('end', () => resolve(`/public-previews/${outputMp3Name}.mp3`))
          .on('error', (err) => reject(err));
        */

        // Bypass seguro para o ambiente local (sem dependência nativa no momento)
        setTimeout(() => resolve(`/public-previews/${outputMp3Name}.mp3`), 1500);
    });
}

/**
 * AWPLACE DOG - Upload de Metadados via Pinata IPFS API
 */
export async function uploadMetadataToIPFS(beatId: string, title: string, coverIpfsUrl: string) {
    const metadata = {
        name: `${title} - AWPLACE License`,
        description: `Premium Utility NFT License for the track: ${title}`,
        image: coverIpfsUrl,
        attributes: [
            { trait_type: "Platform", value: "awplace dog" },
            { trait_type: "Beat ID", value: beatId }
        ]
    };

    console.log("[IPFS] Fazendo upload permanente do JSON via Pinata Cloud...");
    
    /* Implementação Real 
    const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.PINATA_JWT}`
        },
        body: JSON.stringify(metadata)
    });
    const data = await res.json();
    return `ipfs://${data.IpfsHash}`;
    */

    return "ipfs://QmMockHashProntoParaDeployawplacedog";
}
