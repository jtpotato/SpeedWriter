export async function autocomplete(data: any) {
  console.log("Starting autocomplete process");
  console.debug(JSON.stringify(data))

  const response = await fetch(
    "https://api-inference.huggingface.co/models/EleutherAI/gpt-j-6B",
    {
      headers: {
        Authorization: "Bearer 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",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  console.debug(result)
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
  do_sample: true,
  temperature: 1.2,
  repetition_pentalty: 5
};
