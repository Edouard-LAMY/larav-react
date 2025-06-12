import React, { useEffect } from "react";
// import { Fingerprint } from "@fingerprintjs/fingerprintjs"
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import fp from "@fingerprintjs/fingerprintjs";

const FingerprintScriptLoader = () => {
  const fpPromise = FingerprintJS.load();

  useEffect(() => {

    const loadFingerprint = async () => {
      const fp = await fpPromise;
      const result = await fp.get();
      console.log('====================================');
      console.log('dans la fonction 2 ', result);
      console.log('====================================');
    };

    loadFingerprint(); // Exécuter la fonction asynchrone
  }, []); // Exécute uniquement une fois lorsque le composant est monté

  return null; // Le composant ne rend rien
};

export default FingerprintScriptLoader;
