# PDF Tron - sample

```
This is basically the default setup from the PDF Tron documentation with a few minor tweaks you can see in App.js.
I tried initially to create a specific area that user can click in order to sign, but the easiest way to do it ended up being to adjust the original PDF document in Acrobat and create a "Sign" field. PDF Tron then is able to recognize the "Sign" field when it loads the PDF and automatically allows user to click there now to draw their signature. The code for this is under "documentLoaded".

The code for saving the PDF once a changed is made is under "annotationChanged" and it uses a small PHP script to save a new version of the PDF once the user makes a change to it like drawing or writing something. Code for this is some php inside the save folder here.

It may be faster for you to just use the PDF Tron original and add things from there, but this example might be helpful as well to see some of the things I tried.
Original react sample: https://github.com/PDFTron/webviewer-react-sample
PDF Signing sample using Firebase, which never worked for me: https://github.com/PDFTron/pdftron-sign-app
```

## Initial setup

Setup should be fairly standard. Clone the repo and npm install. I usually had to test directly on a web server as the application locally didn't always work. It might work for you, however. Once on a server, I had to also adjust the MIME settings to allow some of the core PDF Tron libraries to be loaded.

## WebViewer APIs

See [API documentation](https://www.pdftron.com/documentation/web/guides/ui/apis).
