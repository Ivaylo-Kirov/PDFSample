import React, { useRef, useEffect } from "react";
import WebViewer from "@pdftron/webviewer";
import axios from "axios";
import "./App.css";

const App = () => {
  const viewer = useRef(null);

  // if using a class, equivalent of componentDidMount
  useEffect(() => {
    WebViewer(
      {
        path: "/webviewer/lib",
        initialDoc: "test.pdf",
      },
      viewer.current
    ).then((instance) => {
      const { PDFNet, docViewer, Annotations } = instance;
      const annotManager = docViewer.getAnnotationManager();

      // SIGNING

      docViewer.on("documentLoaded", async () => {
        await PDFNet.initialize();
        const doc = await docViewer.getDocument().getPDFDoc();

        // Add an StdSignatureHandler instance to PDFDoc, making sure to keep track of it using the ID returned.
        const sigHandlerId = await doc.addStdSignatureHandlerFromURL(
          certfile,
          "password"
        );

        // Obtain the signature form field from the PDFDoc via Annotation.
        const sigField = await doc.getField("Signature1");

        // Tell PDFNetC to use the SignatureHandler created to sign the new signature form field.
        const sigDict = await sigField.useSignatureHandler(sigHandlerId);

        // Add more information to the signature dictionary.
        await sigDict.putName("SubFilter", "adbe.pkcs7.detached");
        await sigDict.putString("Name", "PDFTron");
        await sigDict.putString("Location", "Vancouver, BC");
        await sigDict.putString("Reason", "Document verification.");
      });

      // SIGNING END

      annotManager.on("annotationChanged", async () => {
        const doc = docViewer.getDocument();
        const xfdfString = await annotManager.exportAnnotations();
        const options = { xfdfString };
        const data = await doc.getFileData(options);
        const arr = new Uint8Array(data);
        const blob = new Blob([arr], { type: "application/pdf" });
        axios
          .post("save.php", blob, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error.response);
          });
      });
    });
  }, []);

  return (
    <div className="App">
      <div className="header">BW Portal - PDF Prototype</div>
      <div className="webviewer" ref={viewer}></div>
    </div>
  );
};

export default App;
