"use client";

import { useEffect, useRef, useState } from "react";
import {
  autocomplete,
  cleanText,
  autocompleteParameters,
  shouldRunAI,
} from "./ai";

function Home() {
  const editorRef = useRef<HTMLParagraphElement>(null);
  const [autocompleteIsPendingApproval, setAutocompleteIsPendingApproval] =
    useState(false);

  function keyDownHandler(event: any) {
    if (event.key != "Delete" && event.key != "Backspace") {
      if (
        !document.getSelection()?.isCollapsed &&
        autocompleteIsPendingApproval
      ) {
        if (event.key == "Enter") event.preventDefault();
        let selection = document.getSelection()!;
        selection.collapseToEnd();
        setAutocompleteIsPendingApproval(false);
      }
    }
    if (event.key === "Tab") {
      event.preventDefault();

      let cursorOffset = document.getSelection()?.anchorOffset!;

      if (!shouldRunAI(event.target.innerText)) return;

      autocomplete({
        inputs: cleanText(event.target.innerText),
        parameters: autocompleteParameters,
      }).then((result) => {
        let resultText: string = result[0]["generated_text"];
        resultText = cleanText(resultText);
        event.target.innerText += resultText;
        console.debug(cursorOffset);

        // Don't ask why - it just needs to be done this way.
        let selection = document.getSelection()!;
        selection.setPosition(selection.anchorNode);
        selection.setPosition(selection.anchorNode, cursorOffset);
        selection.extend(
          selection.anchorNode!,
          cursorOffset + resultText.length
        );

        console.debug(selection.anchorOffset);

        setAutocompleteIsPendingApproval(true);
      });
    }
  }

  function focusEditor() {
    if (document.activeElement != editorRef.current) {
      if (editorRef.current?.innerText == "") {
        editorRef.current?.focus();
      }
    }
  }

  useEffect(() => {
    // Focus editor on keypress
    document.addEventListener("keydown", focusEditor);

    // Don't forget to clean up
    return function cleanup() {
      document.removeEventListener("keydown", focusEditor);
    };
  }, []);

  return (
    <>
      <div>
        <p>Just start typing...</p>
        <p
          contentEditable
          onKeyDown={keyDownHandler}
          tabIndex={-1}
          ref={editorRef}
          style={{
            outline: "none",
          }}
        ></p>
      </div>
    </>
  );
}

export default Home;
