import { NetType } from "./types";
import { hexToBytes } from "@noble/hashes/utils";

const b = hexToBytes;

export const MAINNET: NetType = {
  type: "main",
  magic: 0xfbc0b6db, // From chainparams.cpp pchMessageStart
  checkpointMap: {
    0: b("a2effa738145e377e08a61d76179c21703e13e48910b30a2a87f0dfe794b64c6"), // Genesis block hash
    // Add more checkpoints from chainparams.cpp checkpointData
  },
  deployments: {
    csv: {
      name: "csv",
      bit: 3,
      startTime: 1703462400, // 2023-12-25 00:00:00
      timeout: 1735084800,   // 2024-12-25 18:00:00
      threshold: 9576, // 95% of 10,080
      window: 10080,
      required: false,
      force: false,
    },
    segwit: {
      name: "segwit",
      bit: 4,
      startTime: 1703462400, // 2023-12-25 00:00:00
      timeout: 1735084800,   // 2024-12-25 18:00:00
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
    privkey: 0x99, // WIF prefix from chainparams
    xpubkey: 0x0488b21e,  // BIP32 public
    xprivkey: 0x0488ade4, // BIP32 private
    xpubkey58: "xpub",
    xprivkey58: "xprv",
    coinType: 0,
  },
  addressPrefix: {
    pubkeyhash: 0x10, // From chainparams base58Prefixes
    scripthash: 0x05,
    bech32: "jc1q",    // New SegWit prefix
  },
};

MAINNET.deploys = [
  MAINNET.deployments.csv,
  MAINNET.deployments.segwit,
  MAINNET.deployments.testdummy,
];
