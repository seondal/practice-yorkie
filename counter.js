import yorkie from "yorkie-js-sdk";

const client = new yorkie.Client("https://api.yorkie.dev", {
  apiKey: "ciqlq12bjhd3s76qn1a0",
});
await client.activate();

const doc = new yorkie.Document("counter");
await client.attach(doc);

export function setupCounter(element) {
  let counter = 0;
  const setCounter = (count) => {
    counter = count;
    element.innerHTML = `count is ${counter}`;
  };
  element.addEventListener("click", () => {
    doc.update((root) => {
      root.counter.increase(1);
    });
  });

  doc.update((root) => {
    if (root.counter) {
      setCounter(root.counter.getValue());
    } else {
      root.counter = new yorkie.Counter(yorkie.IntType, counter);
    }
  });

  doc.subscribe((e) => {
    setCounter(doc.getRoot().counter.getValue());
  });
}
