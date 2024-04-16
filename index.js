const select = require("xml-crypto").xpath;
const dom = require("@xmldom/xmldom").DOMParser;
const SignedXml = require("xml-crypto").SignedXml;
const fs = require("fs");
const xpath = require('xpath');

var cabecera = `<?xml version="1.0" encoding="ISO-8859-1"?>
<EnvioBOLETA xmlns="http://www.sii.cl/SiiDte" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0" xsi:schemaLocation="http://www.sii.cl/SiiDte EnvioBOLETA_v11.xsd">
<SetDTE ID="SetDoc">
<Caratula version="1.0">
<RutEmisor>1-1</RutEmisor>
<RutEnvia>1-1</RutEnvia>
<RutReceptor>60803000-K</RutReceptor>
<FchResol>2015-07-27</FchResol>
<NroResol>0</NroResol>
<TmstFirmaEnv>2024-04-11T07:39:51</TmstFirmaEnv>
<SubTotDTE>
<TpoDTE>39</TpoDTE>
<NroDTE>1</NroDTE>
</SubTotDTE>
</Caratula>
</SetDTE></EnvioBOLETA>`;


 var sig1 = new SignedXml();
 
sig1.privateKey = fs.readFileSync("client_test.pem");
	  
sig1.signatureAlgorithm = "http://www.w3.org/2000/09/xmldsig#rsa-sha1";

sig1.canonicalizationAlgorithm = "http://www.w3.org/TR/2001/REC-xml-c14n-20010315";
sig1.addReference({
  xpath: "//*[local-name(.)='SetDTE']",
  digestAlgorithm: "http://www.w3.org/2000/09/xmldsig#sha1",
  transforms: ["http://www.w3.org/2000/09/xmldsig#enveloped-signature"],
});
	sig1.computeSignature(cabecera);
	console.log(sig1.getSignedXml());