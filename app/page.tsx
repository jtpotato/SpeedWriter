"use client";

import { useEffect, useRef, useState } from "react";
import {
  autocomplete,
  cleanText,
  autocompleteParameters,
  shouldRunAI,
} from "./ai";

function Home() {
  const promptTypeRef = useRef<HTMLInputElement>(null);
  const promptIdeasRef = useRef<HTMLTextAreaElement>(null);
  const starterParagraphRef = useRef<HTMLTextAreaElement>(null);

  function startGeneration() {
    let prompt = `This is an ${promptTypeRef.current?.value} about ${promptIdeasRef.current?.value}. The contents are as follows:`;
    console.log(prompt);

    autocomplete({
      inputs: prompt,
      parameters: autocompleteParameters,
      options: { use_cache: false },
    }).then((result) => {
      console.log(result[0]["generated_text"]);
      starterParagraphRef.current!.value = result[0]["generated_text"];
    });
  }

  function continueGeneration() {
    autocomplete({
      inputs: starterParagraphRef.current!.value.slice(-500),
      parameters: autocompleteParameters,
      options: { use_cache: false },
    }).then((result) => {
      console.log(result[0]["generated_text"]);
      starterParagraphRef.current!.value += result[0]["generated_text"];
    });
  }

  return (
    <>
      <input
        ref={promptTypeRef}
        placeholder="This piece is an..."
        style={{ display: "block", width: "100%" }}
      ></input>
      <textarea
        ref={promptIdeasRef}
        placeholder="Some ideas that will be covered are..."
        style={{ display: "block", width: "100%" }}
      ></textarea>

      <button onClick={startGeneration}>Go!</button>

      <textarea
        ref={starterParagraphRef}
        placeholder="Here's what the AI came up with..."
        style={{ display: "block", width: "100%" }}
      />

      <button onClick={continueGeneration}>More!</button>
    </>
  );
}

export default Home;
