import { Selector } from "testcafe";

fixture("DNS Certificate Rendering").page`http://localhost:3000`;

const Document = "./fixture/sample-dns-verified.json";
const IframeBlock = Selector("#iframe");
const SampleTemplate = Selector("#root");
const StatusButton = Selector("#certificate-status");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (_prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("Sample document is rendered correctly when dns is verified", async t => {
  await t.setFilesToUpload("input[type=file]", [Document]);

  await StatusButton.with({ visibilityCheck: true })();

  await validateTextContent(t, StatusButton, [
    "Issued by EXAMPLE.OPENATTESTATION.COM"
  ]);

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, [
    "Name & Address of Shipping Agent/Freight Forwarder",
    "CERTIFICATE OF NON-MANIPULATION",
    "DEMO JOHN TAN",
    "Certification by Singapore Customs",
    "AQSIQ170923130"
  ]);
});
