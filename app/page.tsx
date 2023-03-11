'use client';

import { FormEvent } from "react";

function Home() {
  async function query(data: any) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/EleutherAI/gpt-j-6B",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }

  function textEntryHandler(event: any) {
    let text: string = event.target.innerHTML;
    text = text.replace(/(?:&nbsp;|<br>)/g,' ');
    if (text.endsWith(" ")) {
      console.log("Sending to the AI!")
      query({"inputs": text, "parameters": {"return_full_text": false, "use_cache": false, "max_new_tokens": 5}}).then((response) => {
        console.log(response[0]["generated_text"]);
      });
    }
  }

  return (
    <>
      <p contentEditable onInput={textEntryHandler}></p>
    </>
  );
}

export default Home;