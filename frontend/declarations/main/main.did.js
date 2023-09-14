export const idlFactory = ({ IDL }) => {
  const SubAccount = IDL.Vec(IDL.Nat8);
  const RegistryII = IDL.Service({
    'register' : IDL.Func([IDL.Opt(SubAccount), IDL.Text], [], ['oneway']),
    'show' : IDL.Func([], [IDL.Text], ['query']),
  });
  return RegistryII;
};
export const init = ({ IDL }) => { return [IDL.Text]; };
