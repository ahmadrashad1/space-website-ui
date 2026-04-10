import fs from "node:fs";
import path from "node:path";
import Script from "next/script";

function extractContent(source) {
  const bodyOpen = source.indexOf("<body>");
  const firstScript = source.indexOf("<script>");

  if (bodyOpen === -1 || firstScript === -1 || firstScript <= bodyOpen) {
    throw new Error("Could not extract body markup from index.html");
  }

  return source.slice(bodyOpen + "<body>".length, firstScript).trim();
}

function extractScript(source) {
  const scriptOpen = source.lastIndexOf("<script>");
  const scriptClose = source.indexOf("</script>", scriptOpen);

  if (scriptOpen === -1 || scriptClose === -1 || scriptClose <= scriptOpen) {
    throw new Error("Could not extract interaction script from index.html");
  }

  return source.slice(scriptOpen + "<script>".length, scriptClose).trim();
}

const sourceHtml = fs.readFileSync(path.join(process.cwd(), "index.html"), "utf8");
const pageMarkup = extractContent(sourceHtml);
const pageScript = extractScript(sourceHtml);

export default function HomePage() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: pageMarkup }} />
      <Script id="site-interactions" strategy="afterInteractive">
        {pageScript}
      </Script>
    </>
  );
}
