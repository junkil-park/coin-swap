// Copyright (c) The Diem Core Contributors
// SPDX-License-Identifier: Apache-2.0

// Generated on new project creation. Invoked by shuffle CLI.

// Creates typescript wrappers around the Developer API for easier consumption,

// deno-lint-ignore-file no-explicit-any
// deno-lint-ignore-file ban-types
import * as context from "./context.ts";
import {
  Account,
  Event,
  OnChainTransaction,
  PendingTransaction,
  SigningMessage,
  SigningMessageRequest,
  Transaction,
  UserTransactionRequest,
} from "./client.ts";

// Retrieves the ledger information as defined by the root /
// of the Developer API
export async function ledgerInfo() {
  return await context.client().getLedgerInfo();
}

// Returns a list of transactions, ascending from page 0.
export async function transactions(start?: number, limit?: number): Promise<OnChainTransaction[]> {
  // TODO: Have below return a list of transactions desc by sequence number
  return await context.client().getTransactions(start, limit);
}

// Returns a specific transaction based on the version or hash.
export async function transaction(
  versionOrHash: number | string,
): Promise<Transaction> {
  return await context.client().getTransaction(versionOrHash);
}

// Polls for a specific transaction to complete, returning the txn object.
export async function waitForTransaction(
  versionOrHash: number | string,
  timeout?: number,
): Promise<OnChainTransaction> {
  return await context.client().waitForTransaction(versionOrHash, timeout);
}

// Returns transactions specific to a particular address.
export async function accountTransactions(
  addr?: string,
  start?: number,
  limit?: number
): Promise<OnChainTransaction[]> {
  addr = context.addressOrDefault(addr);
  return await context.client().getAccountTransactions(addr, start, limit);
}

// Returns resources for a specific address.
// deno-lint-ignore ban-types
export async function resources(addr?: string): Promise<object[]> {
  addr = context.addressOrDefault(addr);
  return await context.client().getAccountResources(addr);
}

// Returns modules for a specific address, or the default account.
export async function modules(addr?: string) {
  addr = context.addressOrDefault(addr);
  return await context.client().getAccountModules(addr);
}

// Gets the account resource for a particular adress, or the default account.
export async function account(addr?: string): Promise<Account> {
  addr = context.addressOrDefault(addr);
  return await context.client().getAccount(addr);
}

// Returns events by account event handle.
export async function events(
  handleStruct: string,
  fieldName: string,
  start?: number,
  limit?: number,
  addr?: string,
): Promise<Event[]> {
  addr = context.addressOrDefault(addr);
  return await context.client().getEventsByEventHandle(addr, handleStruct, fieldName, start, limit);
}

// Returns the sequence number for a particular address, or the default account
// for the console if no address is passed.
export async function sequenceNumber(addr?: string): Promise<number> {
  const acc = await account(addr);
  return parseInt(acc.sequence_number);
}

export async function accounts() {
  return [await account()];
}

// POSTs a BCS payload to the /transactions endpoint in the developer API.
export async function submitBcsTransaction(
  body: string | Uint8Array,
): Promise<any> {
  return await context.client().submitBcsTransaction(body);
}

// POSTs a JSON payload to the /transactions/signing_message endpoint in the
// developer API to get the signing message for a payload.
export async function createSigningMessage(
  body: SigningMessageRequest,
): Promise<SigningMessage> {
  return await context.client().createSigningMessage(body);
}

// POSTs a JSON payload to the /transactions endpoint in the developer API.
export async function submitTransaction(
  body: UserTransactionRequest,
): Promise<PendingTransaction> {
  return await context.client().submitTransaction(body);
}

export async function resourcesWithName(
  resourceName: string,
  addr?: string,
): Promise<any[]> {
  return (await resources(addr))
    .filter(
      (entry: any) => entry["type"].split("::").includes(resourceName),
    );
}
