// vessel installs
import AccountId "mo:AccountId/AccountIdentifier";
import JSON "mo:json/JSON";

import Debug "mo:base/Debug";
import Array "mo:base/Array";
import Principal "mo:base/Principal";
import Buffer "mo:base/Buffer";


// node scripts/upload/uploader.js $(dfx canister id main) $(dfx identity whoami) /Users/clankpan/Develop/ICME/SNS/NFT-claim-page/arg.json
shared ({ caller = installer }) actor class RegistryII(){

  type Registry = (AccountId.AccountIdentifier, ?Principal);
  var registryII = Buffer.Buffer<(AccountId.AccountIdentifier, ?Principal)>(150);


  public shared({caller = caller}) func setHolders(inputJsonText: Text) {
    if (caller != installer) Debug.trap "Not authorised";
    if (Principal.isAnonymous(caller)) Debug.trap "Not authorised";
    let jsonArrray = switch (JSON.parse(inputJsonText)) {
      case (?#Array v) v;
      case _ Debug.trap "Must be array"
    };

    for (e in jsonArrray.vals()) {
      let s = switch (e) {
        case (#String s) s;
        case _ Debug.trap "second level must be string";
      };
      let aId = switch (AccountId.fromText(s)) {
        case (#ok  v) v;
        case (#err _) Debug.trap "Cannot convert AccountIdentifier";
      };
      registryII.add((aId, null));
    };

    if (registryII.size() > 150) Debug.trap "NFT holders must be under 150";

    Debug.print(debug_show(Buffer.toArray(registryII)));
  };

  public shared({caller = caller}) func register(subaccount: ?AccountId.SubAccount) {
    let accontId = AccountId.fromPrincipal(caller, subaccount);
    var isOwner = false;
    registryII := Buffer.map<Registry, Registry>(registryII, func(a, p) {
      if (AccountId.equal(a, accontId)) {
        isOwner := true;
        return (a, ?caller);
      }
      else return (a, null);
    });
    if (not isOwner) Debug.trap "You have logged in with the wrong wallet or put in the wrong Subaccount.";
  };

  public shared query({caller = caller}) func show(): async [(Text, ?Text)] {
    Buffer.toArray(Buffer.map<Registry, (Text, ?Text)>(registryII, func(a, p) {
      let principalText_null = switch (p) {
        case (?p) ?Principal.toText(p);
        case (_) null;
      };
      let accontIdText = AccountId.toText(a);

      (accontIdText, principalText_null)
    }))
  };
};
