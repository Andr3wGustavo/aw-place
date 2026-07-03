# AWPLACE DOG - Arquitetura e Features Avançadas (Web3)

Este documento detalha a arquitetura técnica, esquemas de banco de dados e automações projetadas para a **AWPLACE DOG** — um ecossistema Web3 premium de venda de beats, preparado para expansão multivendor.

---

## 🎨 1. Estilo Visual: "Acrílico" iOS 17
Para garantir alta conversão, a interface passa confiança e luxo:
- **Desfoques de Fundo (Backdrop Blurs):** Efeitos intensos de blur `backdrop-filter: blur(25px) saturate(200%)` sobre manchas de gradiente (blobs) dinâmicas.
- **Bordas Micro-Iluminadas:** Bordas super finas brancas (`rgba(255, 255, 255, 0.08)`) imitando vidro e metal refletindo luz.
- **Visualizador de Onda Dinâmico:** Uma tela interativa no player que reage à música tocada usando a Web Audio API, estilo Apple Music.

---

## 🗄️ 2. Arquitetura de Banco de Dados Local (SQLite)
Um banco SQLite garante velocidade extrema, zero dependências para testes e fácil portabilidade quando migrarmos para VPS/AWS (podemos converter facilmente para PostgreSQL depois).

### Estrutura (Preparada para Escalabilidade)
- **`users` (Produtores e Compradores):** Controle de perfis. Autenticação feita via "Login com Carteira" (Sign-In with Ethereum - SIWE).
- **`beats`:** Guarda título, BPM, tom (scale), preço e os caminhos (paths) dos arquivos de áudio originais protegidos.
- **`purchases`:** Histórico de compras via Pix, Cartão ou Cripto, armazenando a Hash de Transação e o endereço da carteira.
- **`memberships`:** Controle de assinaturas ativas (quantos downloads gratuitos o usuário tem no mês).

---

## 🤖 3. Automações Inteligentes (O Motor)
- **Marca D'água (Watermark) Automática:** Um script em Node.js usando `ffmpeg` que, ao você fazer upload de um WAV, automaticamente embute a sua "voice tag" (ex: "awplace dog") a cada 15 segundos e gera um MP3 leve para demonstração. Você foca só em subir o arquivo original.
- **Geração Automática de Metadados NFT:** Assim que o beat é cadastrado, o sistema gera o JSON compatível com OpenSea contendo a capa, BPM e detalhes, pronto para o smart contract.
- **Mint Automático pós-Pix:** Se o cliente pagar via Pix, nosso webhook recebe a confirmação e o backend automaticamente transfere a Licença (NFT) para a carteira temporária do cliente, enviando o link de resgate e download por e-mail.
