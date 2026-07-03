# Roadmap de Implementação - AWPLACE DOG

Este cronograma cobre do MVP Frontend até a subida para a AWS/VPS e implantação na Mainnet Blockchain.

---

### 🎨 Fase 1: Interface Premium & Design (MVP Frontend)
*   [ ] HTML/CSS com estilo iOS 17 (Backdrop-filters, sombras dinâmicas, tema escuro de luxo).
*   [ ] Player Persistente com visualizador de espectro de áudio.
*   [ ] Motor de Busca (Instant search, slider de BPM, tags de Gênero).
*   [ ] Simuladores de Fluxo Web3 e Pix/Cartão.
*   [ ] Modal de Login via Wallet (Interface).

### 💾 Fase 2: Backend, Banco de Dados Local & Automação
*   [ ] Inicializar Servidor Express com SQLite (`users`, `beats`, `purchases`).
*   [ ] Script FFMPEG: Criação automática de Watermark nas batidas de upload.
*   [ ] Script Metadados: Geração automatizada de JSON para IPFS/OpenSea.
*   [ ] Endpoint Seguro de Token-Gating (Verifica NFT e libera WAV).

### ⛓️ Fase 3: Smart Contracts, Membership & Pagamentos
*   [ ] Smart Contracts em Solidity (Licenças + Membership NFT + Splits automáticos).
*   [ ] Deploy na rede teste (Base/Polygon).
*   [ ] Conectar biblioteca real de Web3 (Wagmi/Ethers).
*   [ ] Integração Stripe (Checkout Session) e Gerador Pix webhook.

### 🚀 Fase 4: VPS/AWS & Domínio (Produção)
*   [ ] Dockerizar a aplicação.
*   [ ] Configurar a conta AWS / Servidor VPS Linux.
*   [ ] Configurar o domínio (ex: awplacedog.com) com SSL via Nginx.
*   [ ] Deploy Mainnet e Lançamento!
