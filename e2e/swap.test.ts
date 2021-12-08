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
    let scriptFunction: string = context.defaultUserContext.address + "::PoodleCoin::setup_and_mint";
    let typeArguments: string[] = [];
    let args: any[] = [mv.U64("1000")];
    let txn = await helpers.invokeScriptFunction(scriptFunction, typeArguments, args);
    assert("hello");
  });
