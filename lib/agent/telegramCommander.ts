// ============================================================================
// TELEGRAM COMMAND CENTER & INTERACTIVE APPROVAL ENGINE
// Sends briefings and handles inline button approvals/tweaks from your phone.
// ============================================================================

import { SynthesisResult } from "./codeSynthesizer";
import { mergeBranchToMain, discardBranch } from "./gitBrancher";

export async function sendElevationBriefing(
  synthesis: SynthesisResult,
  branchName: string,
  qaIterations: number
): Promise<number | null> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID in environment.");
    return null;
  }

  const messageText = `
🏛️ *JAIN WISDOM ELEVATION REPORT*

📍 *Target Page:* \`${synthesis.filePath}\`
✨ *Design Pattern:* ${synthesis.designInspirationApplied}
🔬 *Autonomous QA:* Passed in ${qaIterations} self-healing pass(es)

📜 *DIGAMBAR AAGAM VERIFICATION:*
• *Shastra:* ${synthesis.digambarProof.shastra}
• *Author:* ${synthesis.digambarProof.author}
• *Reference:* ${synthesis.digambarProof.reference}
• *Doctrinal Proof:* ${synthesis.digambarProof.explanation}

🌟 *Summary of Elevation:*
${synthesis.summary}

🌿 *Git Branch:* \`${branchName}\`

---
_Tap an action below to command your autonomous agent:_
`.trim();

  const inlineKeyboard = {
    inline_keyboard: [
      [
        { text: "✅ Merge to Main", callback_data: `merge:${branchName}` },
        { text: "❌ Discard", callback_data: `discard:${branchName}` }
      ],
      [
        { text: "🔁 Request Changes (Reply in chat)", callback_data: `feedback:${branchName}` }
      ]
    ]
  };

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: "Markdown",
        reply_markup: inlineKeyboard
      })
    });

    const data = await res.json();
    if (data.ok) {
      console.log(`✅ Telegram briefing dispatched to chat ${chatId}!`);
      return data.result.message_id;
    } else {
      console.error("Failed to send Telegram message:", data);
      return null;
    }
  } catch (err) {
    console.error("Error sending Telegram briefing:", err);
    return null;
  }
}

/**
 * Polls Telegram updates for button clicks on this specific branch.
 */
export async function waitForUserApproval(
  branchName: string,
  cwd: string,
  timeoutMinutes = 180
): Promise<"merged" | "discarded" | "timeout"> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return "timeout";

  console.log(`Listening for Telegram approval on branch ${branchName}...`);
  const startTime = Date.now();
  let lastUpdateId = 0;

  while (Date.now() - startTime < timeoutMinutes * 60 * 1000) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates?offset=${lastUpdateId + 1}&timeout=20`);
      const data = await res.json();

      if (data.ok && data.result.length > 0) {
        for (const update of data.result) {
          lastUpdateId = update.update_id;

          if (update.callback_query && update.callback_query.data) {
            const cbData = update.callback_query.data;

            if (cbData === `merge:${branchName}`) {
              console.log(`Received approval to merge ${branchName}! Merging now...`);
              mergeBranchToMain(branchName, cwd);

              await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: update.callback_query.message.chat.id,
                  text: `🎉 *SUCCESS!* Branch \`${branchName}\` has been merged into *main* and pushed live!`
                })
              });
              return "merged";
            }

            if (cbData === `discard:${branchName}`) {
              console.log(`Received command to discard ${branchName}.`);
              discardBranch(branchName, cwd);

              await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: update.callback_query.message.chat.id,
                  text: `🗑️ Branch \`${branchName}\` has been discarded.`
                })
              });
              return "discarded";
            }
          }
        }
      }
    } catch (e) {
      // transient network wait
      await new Promise(r => setTimeout(r, 5000));
    }

    await new Promise(r => setTimeout(r, 3000));
  }

  return "timeout";
}
