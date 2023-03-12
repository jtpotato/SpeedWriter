export async function autocomplete(data: any) {
  console.log("Starting autocomplete process");

  const response = await fetch(
    "https://api-inference.huggingface.co/models/gpt2",
    {
      headers: {
        Authorization: "Bearer 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",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

export function cleanText(text: string) {
  console.debug(`Dirty text: ${text}`);
  text = text.slice(-500);
  text = text.replace(/(?:&nbsp;|<br>|\n)/g, " ");
  console.debug(`Clean text: ${text}`);
  return text;
}

export function shouldRunAI(text: string) {
  text = cleanText(text);
  if (text === "") {
    return false;
  }
  return true;
}

export const autocompleteParameters = {
  return_full_text: false,
  max_new_tokens: 5,
};
