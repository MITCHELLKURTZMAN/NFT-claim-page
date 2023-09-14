import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface RegistryII {
  'register' : ActorMethod<[[] | [SubAccount], string], undefined>,
  'show' : ActorMethod<[], string>,
}
export type SubAccount = Uint8Array | number[];
export interface _SERVICE extends RegistryII {}
