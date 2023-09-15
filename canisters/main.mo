// vessel installsimport AccountId "mo:AccountId/AccountIdentifier";

import JSON "mo:json/JSON";

import Debug "mo:base/Debug";
import Array "mo:base/Array";
import Principal "mo:base/Principal";
import Buffer "mo:base/Buffer";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Result "mo:base/Result";
import Time "mo:base/Time";
import Text "mo:base/Text";
import ExtCore "./motoko/ext/Core";
import ExtCommon "./motoko/ext/Common";

//  - getUserTokenIds - use token holder AID (frontend) to obtain tokenIds from  tokens_ext (backend), it should return multiple token ids if user has multiple NFTs
//  - isClaimed - get claimed status, tracked in backend by tokenId.
//  - getTier  - getTokens has metadata blob its a query of all, consider storing data. Query data from tokenId and deliver a multiplier for all tokens where isClaimed is false.
//  - Canister has a subaccount that can send/hold mod tokens.
//  - airdrop - intakes a principal and AID. AID is used to perform validations and reward calculations. Principal is used to send tokens to.

actor Airdrop {

  type AccountId = ExtCore.AccountIdentifier;
  type TokenId = Nat;
  type Tier = Nat;
  type Token = { id : TokenId; tier : Tier; claimed : Bool };
  type Tokens = [Token];
  type MetadataLegacy = ExtCommon.Metadata;
  type TokenIndex = ExtCore.TokenIndex;
  type Time = Time.Time;
  type CommonError = ExtCore.CommonError;
  type nftObj = {
    tokenId : TokenId;
    metadata : MetadataLegacy;
    claimed : Bool
  };
  type Listing = {
    seller : Principal;
    price : Nat64;
    locked : ?Time
  };

  let nftActor = actor ("asrmz-lmaaa-aaaaa-qaaeq-cai") : actor {
    getTokens : () -> async [(ExtCore.TokenIndex, MetadataLegacy)];
    tokens_ext : (AccountId) -> async Result.Result<[(TokenIndex, ?Listing, ?Blob)], CommonError>
  };

  let maxHashmapSize = 1000000;
  func isEq(x : Text, y : Text) : Bool { x == y };

  //stable var admins : List.List<Text> = List.nil<Text>();
  stable var nftsByIdsEntries : [(Text, Text)] = [];
  var nftsByIdsHashMap = HashMap.fromIter<Text, Text>(nftsByIdsEntries.vals(), maxHashmapSize, isEq, Text.hash);

  public shared func getUserTokenIds(accountId : AccountId) : async Result.Result<[(TokenIndex, ?Listing, ?Blob)], CommonError> {
    //check principal against isOwner or smth like that

    let tokens = await nftActor.tokens_ext(accountId);

    switch (tokens) {
      case (#ok(tokens)) {
        Debug.print(debug_show (tokens));
        #ok(tokens)
      };
      case (#err(err)) {
        Debug.print("Error getting tokens: ");
        #err(err)
      }

    };

  };

}
