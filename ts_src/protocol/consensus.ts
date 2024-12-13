import BN from "bn.js";
import { assert } from "../hd/common";

// Currency and Amounts
export const COIN = 100000000; // One Junkcoin in satoshis
export const MAX_MONEY = 54000000 * COIN;
export const BASE_REWARD = 50 * COIN;
export const HALF_REWARD = Math.floor(BASE_REWARD / 2);

// Block and Transaction Parameters
export const MAX_BLOCK_SERIALIZED_SIZE = 4000000;
export const MAX_BLOCK_WEIGHT = 4000000;
export const MAX_BLOCK_BASE_SIZE = 1000000;
export const MAX_BLOCK_SIZE = 4000000;
export const MAX_RAW_BLOCK_SIZE = 4000000;
export const MAX_BLOCK_SIGOPS = 1000000 / 50;
export const MAX_BLOCK_SIGOPS_COST = 80000;
export const MEDIAN_TIMESPAN = 11;

// Version Bits 
export const VERSION_TOP_BITS = 0x20000000;
export const VERSION_TOP_MASK = 0xe0000000;

// Maturity and Witness
export const COINBASE_MATURITY = 70;
export const WITNESS_SCALE_FACTOR = 4;

// Chain Parameters from chainparams.cpp
export const POW_TARGET_TIMESPAN = 24 * 60 * 60; // 1 day
export const POW_TARGET_SPACING = 60; // 1 minute
export const POW_LIMIT = "00000fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
export const AUXPOW_CHAIN_ID = 0x2020;
export const BIP34_ENABLED_HEIGHT = 0x210c;
export const BIP65_ENABLED_HEIGHT = 0x210c;
export const BIP66_ENABLED_HEIGHT = 0x210c;
export const MAJORITY_ENFORCE_BLOCK_UPGRADE = 1500;
export const MAJORITY_REJECT_BLOCK_OUTDATED = 1900;
export const MAJORITY_WINDOW = 2000;

// Locktime and Sequence
export const LOCKTIME_THRESHOLD = 500000000;
export const SEQUENCE_DISABLE_FLAG = (1 << 31) >>> 0;
export const SEQUENCE_TYPE_FLAG = 1 << 22;
export const SEQUENCE_GRANULARITY = 9;
export const SEQUENCE_MASK = 0x0000ffff;

// Script Limits
export const MAX_SCRIPT_SIZE = 10000;
export const MAX_SCRIPT_STACK = 2000;
export const MAX_SCRIPT_PUSH = 520;
export const MAX_SCRIPT_OPS = 201;
export const MAX_MULTISIG_PUBKEYS = 20;

// BIP16 Activation Time
export const BIP16_TIME = 1333238400;

// Zero Hashes 
export const ZERO_HASH = Buffer.allocUnsafe(32);
export const ZERO_FALCON_HASH = Buffer.allocUnsafe(48);

/** 
 * Check if the amount is within valid money range.
 * @param {number} nValue - Value to check
 * @returns {boolean} True if valid
 */
export function MoneyRange(nValue: number): boolean {
  return nValue >= 0 && nValue <= MAX_MONEY;
}

/**
 * Calculate block reward at given height with halving interval
 * @param {number} height - Block height
 * @param {number} interval - Halving interval
 * @returns {number} Block reward
 */
export function getReward(height: number, interval: number): number {
  assert(height >= 0, "Bad height for reward.");
  const halvings = Math.floor(height / interval);
  if (halvings >= 64) return 0;  // After 64 halvings, block reward becomes 0
  if (halvings === 0) return BASE_REWARD;
  return HALF_REWARD >>> (halvings - 1);
}

/**
 * Convert compact bits to target BN
 * @param {number} compact - Compact bits representation
 * @returns {BN} Target as BN
 */
export function fromCompact(compact: number): BN {
  if (compact === 0) return new BN(0);
  const exponent = compact >>> 24;
  const negative = (compact >>> 23) & 1;
  let mantissa = compact & 0x7fffff;
  let num;
  if (exponent <= 3) {
    mantissa >>>= 8 * (3 - exponent);
    num = new BN(mantissa);
  } else {
    num = new BN(mantissa);
    num.iushln(8 * (exponent - 3));
  }
  if (negative) num.ineg();
  return num;
}

/**
 * Convert target BN to compact bits
 * @param {BN} num - Target as BN
 * @returns {number} Compact bits representation
 */
export function toCompact(num: BN): number {
  if (num.isZero()) return 0;
  let exponent = num.byteLength();
  let mantissa;
  if (exponent <= 3) {
    mantissa = num.toNumber();
    mantissa <<= 8 * (3 - exponent);
  } else {
    mantissa = num.ushrn(8 * (exponent - 3)).toNumber();
  }
  if (mantissa & 0x800000) {
    mantissa >>= 8;
    exponent++;
  }
  let compact = (exponent << 24) | mantissa;
  if (num.isNeg()) compact |= 0x800000;
  compact >>>= 0;
  return compact;
}

/**
 * Verify proof of work 
 * @param {string} hash - Block hash
 * @param {number} bits - Target in compact form
 * @returns {boolean} True if valid
 */
export function verifyPOW(hash: string, bits: number): boolean {
  const target = fromCompact(bits);
  if (target.isNeg() || target.isZero()) return false;
  const num = new BN(hash, "le");
  return num.cmp(target) <= 0;
}

/**
 * Check version bits
 * @param {number} version - Block version
 * @param {number} bit - Bit to check
 * @returns {boolean} True if bit is set
 */
export function hasBit(version: number, bit: number): boolean {
  const bits = (version & VERSION_TOP_MASK) >>> 0;
  const mask = 1 << bit;
  return bits === VERSION_TOP_BITS && (version & mask) !== 0;
}
