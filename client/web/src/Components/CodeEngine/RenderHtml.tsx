import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import DOMPurify from "dompurify"; // To sanitize HTML

const Container = styled.iframe`
  width: 100%;
  margin: 0 auto;
  height: 100%;
  display: inline-flex;
  flex-direction: column;
  border: 0;
`;

interface File {
  filename: string;
  code: string;
}

const RenderHtml = ({ result }: { result: { files: File[] } }): JSX.Element => {
  const { files } = result;
  const container = useRef<HTMLIFrameElement>(null);

  const createCombinedHtml = (
    userHtml: string[],
    userCssFiles: string[],
    userJsFiles: string[],
  ) => {
    // Combine CSS and JS content safely
    const styles = userCssFiles
      .map((css) => `<style>${css}</style>`)
      .join("\n");
    const scripts = userJsFiles
      .map((js) => `<script>${js}</script>`)
      .join("\n");

    // Safely combine into a single HTML file

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Combined Iframe Content</title>
          ${styles}
      </head>
      <body>
          ${userHtml.join("\n")}
          ${scripts}
      </body>
      </html>
    `;
  };

  useEffect(() => {
    if (container.current) {
      // Filter by file type
      const userHtml = files
        .filter((file) => file.filename.endsWith(".html"))
        .map((file) => file.code);
      const userCss = files
        .filter((file) => file.filename.endsWith(".css"))
        .map((file) => file.code);
      const userJavascript = files
        .filter((file) => file.filename.endsWith(".js"))
        .map((file) => file.code);

      // Combine files into a single HTML structure
      const code = createCombinedHtml(userHtml, userCss, userJavascript);

      // Set iframe content with srcdoc
      container.current.srcdoc = code;
    }
  }, [files]);

  return <Container sandbox="allow-scripts" ref={container} />;
};

export default RenderHtml;
