// vessel installs
import AccountId "mo:AccountId/AccountIdentifier";
import JSON "mo:json/JSON";

import Debug "mo:base/Debug";
import Array "mo:base/Array";
import Principal "mo:base/Principal";
import Buffer "mo:base/Buffer";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";


// node scripts/upload/uploader.js $(dfx canister id main) $(dfx identity whoami) /Users/clankpan/Develop/ICME/SNS/NFT-claim-page/arg.json
shared ({ caller = installer }) actor class RegistryII(arg: Text){


  // type Registry = (AccountId.AccountIdentifier, ?Principal);
  // // var registryII = Buffer.Buffer<(AccountId.AccountIdentifier, ?Principal)>(150);
  // stable var registryII: [var Registry] = [];

  type AccountId = AccountId.AccountIdentifier;
  type Value = {#P: Principal; #N};
  type Key = AccountId;
  stable var entries: [(Key, Value)] = [];

  // Parse JSON
  switch (JSON.parse(arg)) {
    case (?#Array array) {
      // if deploy arg is not null, reset registry
    if (array.size() != 150) Debug.trap "NFT holders must be under 150";
    entries := Array.map<JSON.JSON, (Key, Value)>(array, func(e) {
      let aId = switch (e) {
        case (#String s) switch (AccountId.fromText(s)) {
          case (#ok  v) v;
          case (#err _) Debug.trap "Cannot convert AccountIdentifier";
        };
        case _ Debug.trap "Second level must be string";
      };

      (aId, #N)
    });
    Debug.print "Reset current registry";
    };
    case (?#Null) Debug.print "Not reset current registry"; // Not reset current registry
    case _ Debug.trap "Must be array"
  };
  let registry = HashMap.fromIter<Key, Value>(entries.vals(), 150, AccountId.equal, AccountId.hash);

  system func postupgrade() {
    entries := Iter.toArray(registry.entries());
  };

  public shared({caller = caller}) func register(subaccount: ?AccountId.SubAccount, ii: Text) {
    if (Principal.isAnonymous(caller)) Debug.trap "You are anonymos";
    let aId = AccountId.fromPrincipal(caller, subaccount);
    switch (registry.get(aId)) {
      case (?_) registry.put(aId, #P(Principal.fromText(ii)));
      case null Debug.trap "You have logged in with the wrong wallet or put in the wrong Subaccount."
    };
    Debug.print("Success!: " # AccountId.toText(aId));
  };

  public shared query({caller = caller}) func show(): async Text {
    if (caller != installer) Debug.trap "Not authorised";
    if (Principal.isAnonymous(caller)) Debug.trap "Not authorised";

    JSON.show(#Object(
      Array.map<(Key, Value), (Text, JSON.JSON)>(
        Iter.toArray(registry.entries()), // from
        func((aId, value)) {
          let ii = switch (value) {
            case (#P(p)) #String(Principal.toText(p));
            case (#N) #Null;
          };
          (AccountId.toText(aId), ii); // to
    })));
  };

  // dfx deploy main --argument $(printf '%s' $(cat test/arg.json)) --upgrade-unchanged
};
