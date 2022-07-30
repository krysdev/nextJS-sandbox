import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html> {/* changes here take effect after the server restart (ie. lang="en") */}
        <Head />
        <body>
          <div id="overlays" /> {/* self-closing tag here but on the page it is <div></div> */}
          <Main /> {/* the whole NextJS application is renedered by MAIN */}
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;


// "_document.js" can be used to edit the overall HTML document