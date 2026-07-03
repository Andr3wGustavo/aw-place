"use server"

import { PrismaClient } from "@prisma/client"

// Previne instâncias fantasma no Hot-Reload do Next.js
const globalForPrisma = global as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

/**
 * Cadastra um novo Beat no banco de dados.
 * (Espaço reservado para conectar a automação de Watermark)
 */
export async function uploadBeatAction(formData: FormData) {
    const title = formData.get("title") as string;
    const bpm = parseInt(formData.get("bpm") as string);
    const genre = formData.get("genre") as string;
    const priceUsd = parseFloat(formData.get("price") as string);
    const priceEth = parseFloat(formData.get("priceEth") as string);
    
    // WIP: Instanciar Child Process do Node.js aqui para rodar FFMPEG e 
    // gerar a marca d'água automaticamente com o WAV bruto.
    
    const newBeat = await prisma.beat.create({
        data: {
            title,
            bpm,
            genre,
            priceUsd,
            priceEth,
            demoAudioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", // Mock para testes sem IPFS
            producer: {
                connectOrCreate: {
                    where: { email: "producer@awplace.dog" },
                    create: { email: "producer@awplace.dog", role: "PRODUCER", name: "AWPLACE ADMIN" }
                }
            }
        }
    });

    // Avisa o Next.js para atualizar o cache da vitrine (Storefront) instantaneamente
    const { revalidatePath } = require("next/cache");
    const { redirect } = require("next/navigation");
    
    revalidatePath('/');
    redirect('/studio?upload=success');
}

/**
 * Busca todo o catálogo disponível para a vitrine
 */
export async function getCatalog() {
    return prisma.beat.findMany({
        include: { producer: true },
        orderBy: { createdAt: 'desc' }
    });
}
