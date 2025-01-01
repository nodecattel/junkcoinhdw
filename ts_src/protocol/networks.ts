import { NetType } from "./types";
import { hexToBytes } from "@noble/hashes/utils";

const b = hexToBytes;

export const MAINNET: NetType = {
  type: "main",
  magic: 0xfbc0b6db,
  checkpointMap: {
    0: b("a2effa738145e377e08a61d76179c21703e13e48910b30a2a87f0dfe794b64c6"), // Genesis block hash
  },
  deployments: {
    csv: {
      name: "csv",
      bit: 3,
      startTime: 1703462400, // 2023-12-25 00:00:00
      timeout: 1735084800,   // 2024-12-25 18:00:00
      threshold: 9576,       // 95% of 10,080
      window: 10080,
      required: false,
      force: false,
    },
    segwit: {
      name: "segwit",
      bit: 4,
      startTime: 1703462400,
      timeout: 1735084800,
      threshold: 9576,
      window: 10080,
      required: false,
      force: false,
    },
    testdummy: {
      name: "testdummy",
      bit: 28,
      startTime: 1199145601, // January 1, 2008
      timeout: 1230767999,   // December 31, 2008
      threshold: -1,
      window: -1,
      required: false,
      force: true,
    },
  },
  deploys: [],
  keyPrefix: {
    privkey: 0x99,          // WIF prefix
    xpubkey: 0x0488b21e,    // BIP32 public key
    xprivkey: 0x0488ade4,   // BIP32 private key
    xpubkey58: "xpub",
    xprivkey58: "xprv",
    coinType: 0,
  },
  addressPrefix: {
    pubkeyhash: 0x10,
    scripthash: 0x05,
    bech32: "jc1q",
  },
};

export const TESTNET: NetType = {
  type: "testnet",
  magic: 0xfcc1b7dc,
  checkpointMap: {
    0: b("a2effa738145e377e08a61d76179c21703e13e48910b30a2a87f0dfe794b64c6"),
  },
  deployments: {
    csv: {
      name: "csv",
      bit: 3,
      startTime: 1703462400,
      timeout: 1735084800,
      threshold: 9576,
      window: 10080,
      required: false,
      force: false,
    },
    segwit: {
      name: "segwit",
      bit: 4,
      startTime: 1703462400,
      timeout: 1735084800,
      threshold: 9576,
      window: 10080,
      required: false,
      force: false,
    },
    testdummy: {
      name: "testdummy",
      bit: 28,
      startTime: 1199145601,
      timeout: 1230767999,
      threshold: -1,
      window: -1,
      required: false,
      force: true,
    },
  },
  deploys: [],
  keyPrefix: {
    privkey: 0xef,          // WIF prefix
    xpubkey: 0x02facafd,    // BIP32 public key
    xprivkey: 0x02fac398,   // BIP32 private key
    xpubkey58: "tpub",
    xprivkey58: "tprv",
    coinType: 1,
  },
  addressPrefix: {
    pubkeyhash: 0x6f,       // Testnet addresses start with 'm' or 'n'
    scripthash: 0x05,
    bech32: "tjc1q",
  },
};

MAINNET.deploys = [
  MAINNET.deployments.csv,
  MAINNET.deployments.segwit,
  MAINNET.deployments.testdummy,
];

TESTNET.deploys = [
  TESTNET.deployments.csv,
  TESTNET.deployments.segwit,
  TESTNET.deployments.testdummy,
];
