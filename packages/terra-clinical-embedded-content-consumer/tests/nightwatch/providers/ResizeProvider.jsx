/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Provider } from 'xfc';

function ResizeProvider() {
  Provider.init({
    acls: ['http://localhost:8080'],
    onReady: () => {
      setTimeout(() => {
        document.getElementById('resize').innerHTML = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
      }, 1000);
    },
  });

  return (
    <div>
      <title>Resize Provider</title>
      <meta charSet="utf-8" />
      <style dangerouslySetInnerHTML={{ __html: '\nbody {\nborder: 5px dashed #00F;padding-bottom: 5px;\n}\nhtml[hidden] { display: none; }\n' }} />
      <div>
        <h1>Resize content</h1>
        <p>This page simulates the situation where the embedded content consumer resizes automatically when the content changes.</p>
        <p id="resize" />
      </div>
    </div>
  );
}

export default ResizeProvider;
