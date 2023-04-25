let upstream = https://github.com/dfinity/vessel-package-set/releases/download/mo-0.8.7-20230406/package-set.dhall sha256:cb4ea443519a950c08db572738173a30d37fb096e32bc98f35b78436bae1cd17

let packages = [
  { name = "base-0.7.3"
  , repo = "https://github.com/dfinity/motoko-base"
  , version = "moc-0.7.3"
  , dependencies = [ "base-0.7.3" ]
  },

  { name = "AccountId"
  , repo = "https://github.com/aviate-labs/principal.mo"
  , version = "v0.2.6"
  , dependencies = [ "base-0.7.3"  ]
  },
  { name = "array"
  , version = "v0.2.1"
  , repo = "https://github.com/aviate-labs/array.mo"
  , dependencies = [ "base-0.7.3" ]
  },
  { name = "crypto"
  , version = "v0.3.1"
  , repo = "https://github.com/aviate-labs/crypto.mo"
  , dependencies = [ "base-0.7.3", "encoding" ]
  },
  { name = "encoding"
  , version = "v0.4.1"
  , repo = "https://github.com/aviate-labs/encoding.mo"
  , dependencies = [ "base-0.7.3", "array" ]
  },
  { name = "hash"
  , version = "v0.1.1"
  , repo = "https://github.com/aviate-labs/hash.mo"
  , dependencies = [ "base-0.7.3", "array" ]
  },


  { name = "json"
  , repo = "https://github.com/aviate-labs/json.mo"
  , version = "main"
  , dependencies = [ "base-0.7.3", "parser-combinators" ]
  },
  { name = "parser-combinators"
  , repo = "https://github.com/aviate-labs/parser-combinators.mo"
  , version = "v0.1.2"
  , dependencies = [ "base-0.7.3" ]
  }
]

in  upstream # packages
