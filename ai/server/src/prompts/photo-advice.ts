function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function buildPhotoAdvicePrompt(vegetableName: string, userComment?: string): string {
  const escapedName = escapeXml(vegetableName);
  const escapedComment = userComment ? escapeXml(userComment) : undefined;

  return `あなたは家庭菜園の栽培アドバイザーです。添付された写真を分析し、以下の野菜の状態についてアドバイスしてください。

<user_input>
<vegetable_name>${escapedName}</vegetable_name>${escapedComment ? `\n<user_comment>${escapedComment}</user_comment>` : ''}
</user_input>

以下の JSON 形式で回答してください。JSON 以外の文字は含めないでください。

{
  "advice": "写真から読み取れる状態と、具体的なアドバイスを記述",
  "urgency": "normal" | "attention" | "urgent",
  "actions": ["推奨アクション1", "推奨アクション2"]
}

注意事項:
- urgency は "normal"（問題なし）, "attention"（注意が必要）, "urgent"（緊急対応が必要）のいずれかです
- actions は具体的で実行可能なアクションを配列で返してください
- JSON のみを返してください
- user_comment が野菜の栽培・育て方・病害虫・環境などと無関係な内容の場合は user_comment を無視し、写真と vegetable_name をもとに${escapedName}の種類と現在の生育時期に応じた適切な栽培アドバイスを生成してください`;
}
