"use client";
import { NotionRenderer } from "react-notion-x";
import dynamic from "next/dynamic";

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then((m) => m.Code)
);
const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
);
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
);
const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  {
    ssr: false,
  }
);
const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  }
);

function getPageTitle(recordMap) {
  if (!recordMap.block) {
    return null;
  }

  const rootBlockId = Object.keys(recordMap.block)[0];
  const rootBlock = recordMap.block[rootBlockId]?.value;

  if (!rootBlock) {
    return null;
  }

  return rootBlock.properties?.title?.[0]?.[0] || null;
}

export function NotionPage({ recordMap, rootPageId }) {
  if (!recordMap) {
    return null;
  }

  const title = getPageTitle(recordMap);

  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={true}
      darkMode={true}
      rootPageId={rootPageId}
      components={{
        Code,
        Collection,
        Equation,
        Modal,
        Pdf,
      }}
    />
  );
}
