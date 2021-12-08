import {
    assert,
    assertEquals,
  } from "https://deno.land/std@0.85.0/testing/asserts.ts";
  import * as devapi from "../main/devapi.ts";
  import * as main from "../main/mod.ts";
  import * as context from "../main/context.ts";
  import * as helpers from "../main/helpers.ts";
  import * as mv from "../main/move.ts";

  Deno.test("Test Swap", async () => {

    // mint bulldogs and poodles
    let typeArguments: string[] = [];
    let args: any[] = [mv.U64("1000")];
    let poodleMint: string = context.defaultUserContext.address + "::PoodleCoin::setup_and_mint";
    let poodleMintTxn = await helpers.invokeScriptFunction(poodleMint, typeArguments, args);
    poodleMintTxn = await devapi.waitForTransaction(poodleMintTxn.hash);
    let bulldogMint: string = context.defaultUserContext.address + "::BulldogCoin::setup_and_mint";
    let bulldogMintTxn = await helpers.invokeScriptFunction(bulldogMint, typeArguments, args);
    bulldogMintTxn = await devapi.waitForTransaction(bulldogMintTxn.hash);
    assert(poodleMintTxn.success);
    assert(bulldogMintTxn.success);





  });
