// This is an auto-generated file, do not edit manually
export const definition = {
  models: {
    GitcoinPassportStamp: {
      id: "kjzl6hvfrbw6c7qwuncazqr1z04a824op7h6lx05aoigqo40aitil11ix0edrs2",
      accountRelation: { type: "list" },
    },
  },
  objects: {
    GitcoinPassportStampEip712ValueType: {
      name: { type: "string", required: true },
      type: { type: "string", required: true },
    },
    GitcoinPassportStampEip712DomainTypes: {
      Proof: {
        type: "list",
        required: false,
        item: {
          type: "reference",
          refType: "object",
          refName: "GitcoinPassportStampEip712ValueType",
          required: false,
        },
      },
      Context: {
        type: "list",
        required: false,
        item: {
          type: "reference",
          refType: "object",
          refName: "GitcoinPassportStampEip712ValueType",
          required: false,
        },
      },
      Document: {
        type: "list",
        required: false,
        item: {
          type: "reference",
          refType: "object",
          refName: "GitcoinPassportStampEip712ValueType",
          required: false,
        },
      },
      EIP712Domain: {
        type: "list",
        required: false,
        item: {
          type: "reference",
          refType: "object",
          refName: "GitcoinPassportStampEip712ValueType",
          required: false,
        },
      },
      CredentialStatus: {
        type: "list",
        required: false,
        item: {
          type: "reference",
          refType: "object",
          refName: "GitcoinPassportStampEip712ValueType",
          required: false,
        },
      },
      CredentialSubject: {
        type: "list",
        required: false,
        item: {
          type: "reference",
          refType: "object",
          refName: "GitcoinPassportStampEip712ValueType",
          required: false,
        },
      },
    },
    GitcoinPassportStampEip712DomainDomain: {
      name: { type: "string", required: true },
    },
    GitcoinPassportStampEip712Domain: {
      types: {
        type: "reference",
        refType: "object",
        refName: "GitcoinPassportStampEip712DomainTypes",
        required: true,
      },
      domain: {
        type: "reference",
        refType: "object",
        refName: "GitcoinPassportStampEip712DomainDomain",
        required: true,
      },
      primaryType: { type: "string", required: true },
    },
    GitcoinPassportStampGitcoinPassportVcProof: {
      type: { type: "string", required: true },
      created: { type: "datetime", required: true },
      _context: { type: "string", required: true },
      proofValue: { type: "string", required: true },
      eip712Domain: {
        type: "reference",
        refType: "object",
        refName: "GitcoinPassportStampEip712Domain",
        required: true,
      },
      proofPurpose: { type: "string", required: true },
      verificationMethod: { type: "string", required: true },
    },
    GitcoinPassportStampGitcoinPassportVcCredentialSubjectContext: {
      hash: { type: "string", required: true },
      provider: { type: "string", required: true },
      metaPointer: { type: "string", required: true },
    },
    GitcoinPassportStampGitcoinPassportVcCredentialSubject: {
      _id: { type: "string", required: true },
      hash: { type: "string", required: true },
      _context: {
        type: "reference",
        refType: "object",
        refName:
          "GitcoinPassportStampGitcoinPassportVcCredentialSubjectContext",
        required: true,
      },
      provider: { type: "string", required: true },
      metaPointer: { type: "string", required: true },
    },
    GitcoinPassportStamp: {
      type: {
        type: "list",
        required: true,
        item: { type: "string", required: true },
      },
      proof: {
        type: "reference",
        refType: "object",
        refName: "GitcoinPassportStampGitcoinPassportVcProof",
        required: true,
      },
      issuer: { type: "string", required: true, indexed: true },
      _context: {
        type: "list",
        required: true,
        item: { type: "string", required: true },
      },
      issuanceDate: { type: "datetime", required: true, indexed: true },
      expirationDate: { type: "datetime", required: true, indexed: true },
      credentialSubject: {
        type: "reference",
        refType: "object",
        refName: "GitcoinPassportStampGitcoinPassportVcCredentialSubject",
        required: true,
      },
    },
  },
  enums: {},
  accountData: {
    gitcoinPassportStampList: {
      type: "connection",
      name: "GitcoinPassportStamp",
    },
  },
};
