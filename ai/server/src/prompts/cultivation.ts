import type { CultivationQuery } from '../types/shared';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function buildCultivationPrompt(query: CultivationQuery): string {
  const vegetableName = escapeXml(query.vegetableName);
  const plantedAt = escapeXml(query.plantedAt);
  const region = escapeXml(query.region ?? '指定なし');
  const seedingType = query.seedingType === 'seed' ? '種まき' : '苗';
  const brand = query.brand ? escapeXml(query.brand) : undefined;
  const memo = query.memo ? escapeXml(query.memo) : undefined;

  return `あなたは家庭菜園の栽培アドバイザーです。以下の情報をもとに、今後の栽培スケジュールを JSON 形式で返してください。

<user_input>
<vegetable_name>${vegetableName}</vegetable_name>
<planted_at>${plantedAt}</planted_at>
<seeding_type>${seedingType}</seeding_type>
<region>${region}</region>${brand ? `\n<brand>${brand}</brand>` : ''}${memo ? `\n<memo>${memo}</memo>` : ''}
</user_input>

以下の JSON 形式で回答してください。JSON 以外の文字は含めないでください。

{
  "vegetableName": "入力された野菜名",
  "events": [
    {
      "type": "fertilizing" | "pinching" | "harvesting" | "watering" | "other",
      "title": "作業名",
      "description": "作業の具体的な手順・量・目安を1〜2文で記載（例：追肥なら肥料の種類と1株あたりの量、摘芯なら対象の芽の位置、収穫なら見極めポイント）",
      "scheduledDate": "YYYY-MM-DD"
    }
  ],
  "notes": "補足情報（任意）"
}

注意事項:
- events は時系列順に並べてください
- scheduledDate は植えた日以降の日付にしてください
- type は "fertilizing"（追肥）, "pinching"（摘芯・剪定）, "harvesting"（収穫）, "watering"（水やり）, "other"（その他）のいずれかです
- 一般的な家庭菜園での栽培スケジュールを提案してください
- description には作業の具体的な手順・量・目安を1〜2文で記載してください
- JSON のみを返してください`;
}
