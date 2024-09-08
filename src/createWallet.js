// Importando as dependências
const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

// Define a rede | Mainnet - Rede principla | Testnet - Rede de teste
const network = bitcoin.networks.testnet;

// Derivação de carteiras HD | Carteira determinística hierárquica
const path = `m/49'/1'/0'/0`;

// Gera mnemonic | Conjunto de palavras aleatórias - seed
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

// Cria a raiz da carteira HD
let root = bip32.fromSeed(seed, network);

// Cria uma conta | Par de chave pública e privada
let account = root.derivePath(path);
let node = account.derive(0).derive(0);

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network
}).address

console.log(" - - - - Carteira Gerada - - - - ");
console.log(`Endereço: ${btcAddress}`);
console.log(`Chave privada: ${node.toWIF()}`);
console.log(`Seed: ${mnemonic}`);
