import { mount } from "enzyme";
import UnverifiedView from "./UnverifiedView";
import { TYPES, MESSAGES } from "../../../constants/VerificationErrorMessages";

const VALID_VERIFICATION_STATUS = {
  hash: {
    checksumMatch: true
  },
  issued: {
    issuedOnAll: true,
    details: [
      {
        address: "0x48399Fb88bcD031C556F53e93F690EEC07963Af3",
        issued: true
      }
    ]
  },
  revoked: {
    revokedOnAny: false,
    details: [
      {
        address: "0x48399Fb88bcD031C556F53e93F690EEC07963Af3",
        revoked: false
      }
    ]
  },
  valid: true,
  identity: {
    identifiedOnAll: true,
    details: [
      {
        identified: true,
        dns: "tradetrust.io",
        smartContract: "0x48399Fb88bcD031C556F53e93F690EEC07963Af3"
      }
    ]
  }
};

const STATUS = ["HASH", "ISSUED", "REVOKED", "IDENTITY"];

describe("UnverifiedView", () => {
  it("displays hash error if the hash is invalid", () => {
    const wrapper = mount(
      <UnverifiedView
        handleRenderOverwrite={() => {}}
        verificationStatus={{
          ...VALID_VERIFICATION_STATUS,
          hash: { checksumMatch: false }
        }}
        resetData={() => {}}
      />
    );
    const errorContainerElm = wrapper.find("#error-tab");
    expect(errorContainerElm.text()).toContain(
      MESSAGES[TYPES.HASH].failureTitle
    );
    expect(errorContainerElm.text()).toContain(
      MESSAGES[TYPES.HASH].failureMessage
    );
  });

  it("displays issuing error if the document is not issued", () => {
    const wrapper = mount(
      <UnverifiedView
        handleRenderOverwrite={() => {}}
        verificationStatus={{
          ...VALID_VERIFICATION_STATUS,
          issued: { issuedOnAll: false }
        }}
        resetData={() => {}}
      />
    );
    const errorContainerElm = wrapper.find("#error-tab");
    expect(errorContainerElm.text()).toContain(
      MESSAGES[TYPES.ISSUED].failureTitle
    );
    expect(errorContainerElm.text()).toContain(
      MESSAGES[TYPES.ISSUED].failureMessage
    );
  });

  it("display revocation error if the document is revoked", () => {
    const wrapper = mount(
      <UnverifiedView
        handleRenderOverwrite={() => {}}
        verificationStatus={{
          ...VALID_VERIFICATION_STATUS,
          revoked: { revokedOnAny: true }
        }}
        resetData={() => {}}
      />
    );
    const errorContainerElm = wrapper.find("#error-tab");
    expect(errorContainerElm.text()).toContain(
      MESSAGES[TYPES.REVOKED].failureTitle
    );
    expect(errorContainerElm.text()).toContain(
      MESSAGES[TYPES.REVOKED].failureMessage
    );
  });

  it("displays identity error if the identity is not verified", () => {
    const wrapper = mount(
      <UnverifiedView
        handleRenderOverwrite={() => {}}
        verificationStatus={{
          ...VALID_VERIFICATION_STATUS,
          identity: { identifiedOnAll: false }
        }}
        resetData={() => {}}
      />
    );
    const errorContainerElm = wrapper.find("#error-tab");
    expect(errorContainerElm.text()).toContain(
      MESSAGES[TYPES.IDENTITY].failureTitle
    );
    expect(errorContainerElm.text()).toContain(
      MESSAGES[TYPES.IDENTITY].failureMessage
    );
  });
  it("displays error in all fields when all verification fail", () => {
    const wrapper = mount(
      <UnverifiedView
        handleRenderOverwrite={() => {}}
        verificationStatus={{
          ...VALID_VERIFICATION_STATUS,
          hash: { checksumMatch: false },
          issued: { issuedOnAll: false },
          revoked: { revokedOnAny: true },
          identity: { identifiedOnAll: false }
        }}
        resetData={() => {}}
      />
    );
    wrapper
      .find("#error-tab")
      .children()
      .forEach((child, index) => {
        expect(child.text()).toContain(MESSAGES[STATUS[index]].failureTitle);
        expect(child.text()).toContain(MESSAGES[STATUS[index]].failureMessage);
      });
  });
});
