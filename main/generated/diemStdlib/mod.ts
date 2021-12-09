
import { Serializer, Deserializer } from '../serde/mod.ts';
import { BcsSerializer, BcsDeserializer } from '../bcs/mod.ts';
import { Optional, Seq, Tuple, ListTuple, unit, bool, int8, int16, int32, int64, int128, uint8, uint16, uint32, uint64, uint128, float32, float64, char, str, bytes } from '../serde/mod.ts';

import * as DiemTypes from '../diemTypes/mod.ts';

/**
 * Structured representation of a call into a known Move script.
 */
export abstract class ScriptCall {
}

/**
 * Structured representation of a call into a known Move script function.
 */
export abstract class ScriptFunctionCall {
}


export class ScriptFunctionCallVariantCreatePool extends ScriptFunctionCall {

constructor (public coin_type1: DiemTypes.TypeTag, public coin_type2: DiemTypes.TypeTag, public coin1: uint64, public coin2: uint64, public share: uint64) {
  super();
}

}

export class ScriptFunctionCallVariantSetupAndMint extends ScriptFunctionCall {

constructor (public amount: uint64) {
  super();
}

}

export class ScriptFunctionCallVariantSetupAndMint extends ScriptFunctionCall {

constructor (public amount: uint64) {
  super();
}

}

export class ScriptFunctionCallVariantSwap extends ScriptFunctionCall {

constructor (public coin_type1: DiemTypes.TypeTag, public coin_type2: DiemTypes.TypeTag, public coin1: uint64) {
  super();
}

}

export interface TypeTagDef {
  type: Types;
  arrayType?: TypeTagDef;
  name?: string;
  moduleName?: string;
  address?: string;
  typeParams?: TypeTagDef[];
}

export interface ArgDef {
  readonly name: string;
  readonly type: TypeTagDef;
  readonly choices?: string[];
  readonly mandatory?: boolean;
}

export interface ScriptDef {
  readonly stdlibEncodeFunction: (...args: any[]) => DiemTypes.Script;
  readonly stdlibDecodeFunction: (script: DiemTypes.Script) => ScriptCall;
  readonly codeName: string;
  readonly description: string;
  readonly typeArgs: string[];
  readonly args: ArgDef[];
}

export interface ScriptFunctionDef {
  readonly stdlibEncodeFunction: (...args: any[]) => DiemTypes.TransactionPayload;
  readonly description: string;
  readonly typeArgs: string[];
  readonly args: ArgDef[];
}

export enum Types {
  Boolean,
  U8,
  U64,
  U128,
  Address,
  Array,
  Struct
}


export class Stdlib {
  private static fromHexString(hexString: string): Uint8Array { return new Uint8Array(hexString.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)));}

  /**

   */
  static encodeCreatePoolScriptFunction(coin_type1: DiemTypes.TypeTag, coin_type2: DiemTypes.TypeTag, coin1: bigint, coin2: bigint, share: bigint): DiemTypes.TransactionPayload {
    const tyArgs: Seq<DiemTypes.TypeTag> = [coin_type1, coin_type2];
    var serializer = new BcsSerializer();
    serializer.serializeU64(coin1);
    const coin1_serialized: bytes = serializer.getBytes();
    var serializer = new BcsSerializer();
    serializer.serializeU64(coin2);
    const coin2_serialized: bytes = serializer.getBytes();
    var serializer = new BcsSerializer();
    serializer.serializeU64(share);
    const share_serialized: bytes = serializer.getBytes();
    const args: Seq<bytes> = [coin1_serialized, coin2_serialized, share_serialized];
    const module_id: DiemTypes.ModuleId = new DiemTypes.ModuleId(new DiemTypes.AccountAddress([[91], [36], [209], [164], [130], [11], [195], [52], [241], [165], [112], [5], [107], [146], [220], [244]]), new DiemTypes.Identifier("CoinSwap"));
    const function_name: DiemTypes.Identifier = new DiemTypes.Identifier("create_pool");
    const script = new DiemTypes.ScriptFunction(module_id, function_name, tyArgs, args);
    return new DiemTypes.TransactionPayloadVariantScriptFunction(script);
  }

  /**

   */
  static encodeSetupAndMintScriptFunction(amount: bigint): DiemTypes.TransactionPayload {
    const tyArgs: Seq<DiemTypes.TypeTag> = [];
    var serializer = new BcsSerializer();
    serializer.serializeU64(amount);
    const amount_serialized: bytes = serializer.getBytes();
    const args: Seq<bytes> = [amount_serialized];
    const module_id: DiemTypes.ModuleId = new DiemTypes.ModuleId(new DiemTypes.AccountAddress([[91], [36], [209], [164], [130], [11], [195], [52], [241], [165], [112], [5], [107], [146], [220], [244]]), new DiemTypes.Identifier("BulldogCoin"));
    const function_name: DiemTypes.Identifier = new DiemTypes.Identifier("setup_and_mint");
    const script = new DiemTypes.ScriptFunction(module_id, function_name, tyArgs, args);
    return new DiemTypes.TransactionPayloadVariantScriptFunction(script);
  }

  /**

   */
  static encodeSetupAndMintScriptFunction(amount: bigint): DiemTypes.TransactionPayload {
    const tyArgs: Seq<DiemTypes.TypeTag> = [];
    var serializer = new BcsSerializer();
    serializer.serializeU64(amount);
    const amount_serialized: bytes = serializer.getBytes();
    const args: Seq<bytes> = [amount_serialized];
    const module_id: DiemTypes.ModuleId = new DiemTypes.ModuleId(new DiemTypes.AccountAddress([[91], [36], [209], [164], [130], [11], [195], [52], [241], [165], [112], [5], [107], [146], [220], [244]]), new DiemTypes.Identifier("PoodleCoin"));
    const function_name: DiemTypes.Identifier = new DiemTypes.Identifier("setup_and_mint");
    const script = new DiemTypes.ScriptFunction(module_id, function_name, tyArgs, args);
    return new DiemTypes.TransactionPayloadVariantScriptFunction(script);
  }

  /**

   */
  static encodeSwapScriptFunction(coin_type1: DiemTypes.TypeTag, coin_type2: DiemTypes.TypeTag, coin1: bigint): DiemTypes.TransactionPayload {
    const tyArgs: Seq<DiemTypes.TypeTag> = [coin_type1, coin_type2];
    var serializer = new BcsSerializer();
    serializer.serializeU64(coin1);
    const coin1_serialized: bytes = serializer.getBytes();
    const args: Seq<bytes> = [coin1_serialized];
    const module_id: DiemTypes.ModuleId = new DiemTypes.ModuleId(new DiemTypes.AccountAddress([[91], [36], [209], [164], [130], [11], [195], [52], [241], [165], [112], [5], [107], [146], [220], [244]]), new DiemTypes.Identifier("CoinSwap"));
    const function_name: DiemTypes.Identifier = new DiemTypes.Identifier("swap");
    const script = new DiemTypes.ScriptFunction(module_id, function_name, tyArgs, args);
    return new DiemTypes.TransactionPayloadVariantScriptFunction(script);
  }

  static decodeCreatePoolScriptFunction(script_fun: DiemTypes.TransactionPayload): ScriptFunctionCallVariantCreatePool {
  if (script_fun instanceof DiemTypes.TransactionPayloadVariantScriptFunction) {
      var deserializer = new BcsDeserializer(script_fun.value.args[0]);
      const coin1: bigint = deserializer.deserializeU64();

      var deserializer = new BcsDeserializer(script_fun.value.args[1]);
      const coin2: bigint = deserializer.deserializeU64();

      var deserializer = new BcsDeserializer(script_fun.value.args[2]);
      const share: bigint = deserializer.deserializeU64();

      return new ScriptFunctionCallVariantCreatePool(
        script_fun.value.ty_args[0],
        script_fun.value.ty_args[1],
        coin1,
        coin2,
        share
      );
    } else {
      throw new Error("Transaction payload not a script function payload")
    }
  }

  static decodeSetupAndMintScriptFunction(script_fun: DiemTypes.TransactionPayload): ScriptFunctionCallVariantSetupAndMint {
  if (script_fun instanceof DiemTypes.TransactionPayloadVariantScriptFunction) {
      var deserializer = new BcsDeserializer(script_fun.value.args[0]);
      const amount: bigint = deserializer.deserializeU64();

      return new ScriptFunctionCallVariantSetupAndMint(
        amount
      );
    } else {
      throw new Error("Transaction payload not a script function payload")
    }
  }

  static decodeSetupAndMintScriptFunction(script_fun: DiemTypes.TransactionPayload): ScriptFunctionCallVariantSetupAndMint {
  if (script_fun instanceof DiemTypes.TransactionPayloadVariantScriptFunction) {
      var deserializer = new BcsDeserializer(script_fun.value.args[0]);
      const amount: bigint = deserializer.deserializeU64();

      return new ScriptFunctionCallVariantSetupAndMint(
        amount
      );
    } else {
      throw new Error("Transaction payload not a script function payload")
    }
  }

  static decodeSwapScriptFunction(script_fun: DiemTypes.TransactionPayload): ScriptFunctionCallVariantSwap {
  if (script_fun instanceof DiemTypes.TransactionPayloadVariantScriptFunction) {
      var deserializer = new BcsDeserializer(script_fun.value.args[0]);
      const coin1: bigint = deserializer.deserializeU64();

      return new ScriptFunctionCallVariantSwap(
        script_fun.value.ty_args[0],
        script_fun.value.ty_args[1],
        coin1
      );
    } else {
      throw new Error("Transaction payload not a script function payload")
    }
  }

  static ScriptArgs: {[name: string]: ScriptDef} = {
  }

  static ScriptFunctionArgs: {[name: string]: ScriptFunctionDef} = {

                CreatePool: {
      stdlibEncodeFunction: Stdlib.encodeCreatePoolScriptFunction,
      description: "",
      typeArgs: ["coin_type1", "coin_type2"],
      args: [
        {name: "coin1", type: {type: Types.U64}}, {name: "coin2", type: {type: Types.U64}}, {name: "share", type: {type: Types.U64}}
      ]
    },
                

                SetupAndMint: {
      stdlibEncodeFunction: Stdlib.encodeSetupAndMintScriptFunction,
      description: "",
      typeArgs: [],
      args: [
        {name: "amount", type: {type: Types.U64}}
      ]
    },
                

                SetupAndMint: {
      stdlibEncodeFunction: Stdlib.encodeSetupAndMintScriptFunction,
      description: "",
      typeArgs: [],
      args: [
        {name: "amount", type: {type: Types.U64}}
      ]
    },
                

                Swap: {
      stdlibEncodeFunction: Stdlib.encodeSwapScriptFunction,
      description: "",
      typeArgs: ["coin_type1", "coin_type2"],
      args: [
        {name: "coin1", type: {type: Types.U64}}
      ]
    },
                
  }

}


export type ScriptDecoders = {
  User: {
    default: (type: keyof ScriptDecoders['User']) => void;
  };
};
