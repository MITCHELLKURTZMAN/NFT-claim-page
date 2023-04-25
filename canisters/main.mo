// vessel installs
import AccountId "mo:AccountId/AccountIdentifier";

import Debug "mo:base/Debug";
import Array "mo:base/Array";
import Principal "mo:base/Principal";

shared ({ caller = installer }) actor class RegistryII(holders: [Text]){

  type Registry = (AccountId.AccountIdentifier, ?Principal);

  if (holders.size() > 150) Debug.trap "NFT holders must be under 150";

  stable var registryII = Array.map<Text, Registry>(holders, func h {
    let accountId = switch (AccountId.fromText(h)) {
      case (#ok  v) v;
      case (#err _) Debug.trap "Cannot convert AccountIdentifier";
    };
    (accountId, null)
  });

  Debug.print(debug_show(registryII));

  public shared({caller = caller}) func register(subaccount: ?AccountId.SubAccount) {
    let accontId = AccountId.fromPrincipal(caller, subaccount);
    var isOwner = false;
    registryII := Array.map<Registry, Registry>(registryII, func(a, p) {
      if (AccountId.equal(a, accontId)) {
        isOwner := true;
        return (a, ?caller);
      }
      else return (a, null);
    });
    if (not isOwner) Debug.trap "You have logged in with the wrong wallet or put in the wrong Subaccount.";
  };

  public shared query({caller = caller}) func show(): async [(Text, ?Text)] {
    Array.map<Registry, (Text, ?Text)>(registryII, func(a, p) {
      let principalText_null = switch (p) {
        case (?p) ?Principal.toText(p);
        case (_) null;
      };
      let accontIdText = AccountId.toText(a);

      (accontIdText, principalText_null)
    })
  };
};
