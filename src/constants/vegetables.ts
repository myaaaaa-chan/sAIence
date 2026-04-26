export type VegetableCategory =
  | 'fruit'
  | 'leaf'
  | 'root'
  | 'bean'
  | 'herb'
  | 'berry';

export interface VegetableMaster {
  readonly id: string;
  readonly name: string;
  readonly category: VegetableCategory;
  readonly aliases: readonly string[];
}

export interface CategoryInfo {
  readonly id: VegetableCategory;
  readonly name: string;
  readonly icon: string;
}

export const CATEGORIES: readonly CategoryInfo[] = [
  { id: 'fruit', name: '果菜類', icon: 'apple' },
  { id: 'leaf', name: '葉菜類', icon: 'leaf' },
  { id: 'root', name: '根菜類', icon: 'carrot' },
  { id: 'bean', name: '豆類', icon: 'bean' },
  { id: 'herb', name: 'ハーブ類', icon: 'sprout' },
  { id: 'berry', name: 'ベリー類', icon: 'grape' },
] as const;

export const VEGETABLES: readonly VegetableMaster[] = [
  // ── 果菜類（18種） ──
  { id: 'tomato', name: 'トマト', category: 'fruit', aliases: ['とまと', 'tomato'] },
  { id: 'mini-tomato', name: 'ミニトマト', category: 'fruit', aliases: ['みにとまと', 'mini tomato', 'cherry tomato', 'プチトマト', 'ぷちとまと'] },
  { id: 'eggplant', name: 'ナス', category: 'fruit', aliases: ['なす', 'eggplant', '茄子'] },
  { id: 'green-pepper', name: 'ピーマン', category: 'fruit', aliases: ['ぴーまん', 'green pepper'] },
  { id: 'paprika', name: 'パプリカ', category: 'fruit', aliases: ['ぱぷりか', 'paprika', 'bell pepper'] },
  { id: 'cucumber', name: 'キュウリ', category: 'fruit', aliases: ['きゅうり', 'cucumber', '胡瓜'] },
  { id: 'zucchini', name: 'ズッキーニ', category: 'fruit', aliases: ['ずっきーに', 'zucchini'] },
  { id: 'pumpkin', name: 'カボチャ', category: 'fruit', aliases: ['かぼちゃ', 'pumpkin', 'squash', '南瓜'] },
  { id: 'watermelon', name: 'スイカ', category: 'fruit', aliases: ['すいか', 'watermelon', '西瓜'] },
  { id: 'melon', name: 'メロン', category: 'fruit', aliases: ['めろん', 'melon'] },
  { id: 'corn', name: 'トウモロコシ', category: 'fruit', aliases: ['とうもろこし', 'corn', 'sweet corn', '玉蜀黍'] },
  { id: 'okra', name: 'オクラ', category: 'fruit', aliases: ['おくら', 'okra'] },
  { id: 'edamame', name: 'エダマメ', category: 'fruit', aliases: ['えだまめ', 'edamame', '枝豆'] },
  { id: 'green-bean', name: 'インゲン', category: 'fruit', aliases: ['いんげん', 'green bean', 'string bean', 'インゲン豆', 'いんげん豆'] },
  { id: 'bitter-melon', name: 'ゴーヤ', category: 'fruit', aliases: ['ごーや', 'bitter melon', 'goya', 'ゴーヤー', 'にがうり', '苦瓜'] },
  { id: 'shishito', name: 'ししとう', category: 'fruit', aliases: ['ししとうがらし', 'shishito', '獅子唐'] },
  { id: 'chili', name: 'とうがらし', category: 'fruit', aliases: ['トウガラシ', 'chili', 'chilli', 'chili pepper', '唐辛子'] },
  { id: 'winter-melon', name: '冬瓜', category: 'fruit', aliases: ['とうがん', 'トウガン', 'winter melon', 'wax gourd'] },

  // ── 葉菜類（21種） ──
  { id: 'lettuce', name: 'レタス', category: 'leaf', aliases: ['れたす', 'lettuce'] },
  { id: 'sunny-lettuce', name: 'サニーレタス', category: 'leaf', aliases: ['さにーれたす', 'sunny lettuce', 'leaf lettuce'] },
  { id: 'cabbage', name: 'キャベツ', category: 'leaf', aliases: ['きゃべつ', 'cabbage'] },
  { id: 'chinese-cabbage', name: '白菜', category: 'leaf', aliases: ['はくさい', 'ハクサイ', 'chinese cabbage', 'napa cabbage'] },
  { id: 'spinach', name: 'ほうれん草', category: 'leaf', aliases: ['ほうれんそう', 'ホウレンソウ', 'ホウレン草', 'spinach'] },
  { id: 'komatsuna', name: '小松菜', category: 'leaf', aliases: ['こまつな', 'コマツナ', 'komatsuna'] },
  { id: 'bok-choy', name: 'チンゲン菜', category: 'leaf', aliases: ['ちんげんさい', 'チンゲンサイ', 'bok choy', 'pak choi', '青梗菜'] },
  { id: 'garland-chrysanthemum', name: '春菊', category: 'leaf', aliases: ['しゅんぎく', 'シュンギク', 'garland chrysanthemum'] },
  { id: 'mizuna', name: '水菜', category: 'leaf', aliases: ['みずな', 'ミズナ', 'mizuna'] },
  { id: 'arugula', name: 'ルッコラ', category: 'leaf', aliases: ['るっこら', 'arugula', 'rocket'] },
  { id: 'kale', name: 'ケール', category: 'leaf', aliases: ['けーる', 'kale'] },
  { id: 'broccoli', name: 'ブロッコリー', category: 'leaf', aliases: ['ぶろっこりー', 'broccoli'] },
  { id: 'cauliflower', name: 'カリフラワー', category: 'leaf', aliases: ['かりふらわー', 'cauliflower'] },
  { id: 'asparagus', name: 'アスパラガス', category: 'leaf', aliases: ['あすぱらがす', 'asparagus'] },
  { id: 'celery', name: 'セロリ', category: 'leaf', aliases: ['せろり', 'celery'] },
  { id: 'green-onion', name: 'ネギ', category: 'leaf', aliases: ['ねぎ', 'green onion', 'welsh onion', '葱'] },
  { id: 'chinese-chive', name: 'ニラ', category: 'leaf', aliases: ['にら', 'chinese chive', 'garlic chive', '韮'] },
  { id: 'watercress', name: 'クレソン', category: 'leaf', aliases: ['くれそん', 'watercress', 'nasturtium'] },
  { id: 'petit-vert', name: 'プチヴェール', category: 'leaf', aliases: ['ぷちヴぇーる', 'petit vert', 'プチベール'] },
  { id: 'molokhia', name: 'モロヘイヤ', category: 'leaf', aliases: ['もろへいや', 'molokhia', 'mulukhiyah'] },
  { id: 'red-cabbage', name: '紫キャベツ', category: 'leaf', aliases: ['むらさききゃべつ', 'red cabbage', 'purple cabbage', 'レッドキャベツ'] },

  // ── 根菜類（14種） ──
  { id: 'daikon', name: '大根', category: 'root', aliases: ['だいこん', 'ダイコン', 'daikon', 'japanese radish'] },
  { id: 'turnip', name: 'カブ', category: 'root', aliases: ['かぶ', 'turnip', '蕪'] },
  { id: 'carrot', name: 'ニンジン', category: 'root', aliases: ['にんじん', 'carrot', '人参'] },
  { id: 'beet', name: 'ビーツ', category: 'root', aliases: ['びーつ', 'beet', 'beetroot'] },
  { id: 'burdock', name: 'ゴボウ', category: 'root', aliases: ['ごぼう', 'burdock', '牛蒡'] },
  { id: 'sweet-potato', name: 'サツマイモ', category: 'root', aliases: ['さつまいも', 'sweet potato', 'さつま芋', 'サツマ芋'] },
  { id: 'potato', name: 'ジャガイモ', category: 'root', aliases: ['じゃがいも', 'potato', 'じゃが芋', 'ジャガ芋', '馬鈴薯'] },
  { id: 'taro', name: 'サトイモ', category: 'root', aliases: ['さといも', 'taro', 'さと芋', 'サト芋', '里芋'] },
  { id: 'onion', name: 'タマネギ', category: 'root', aliases: ['たまねぎ', 'onion', '玉ねぎ', '玉葱'] },
  { id: 'garlic', name: 'ニンニク', category: 'root', aliases: ['にんにく', 'garlic', '大蒜'] },
  { id: 'ginger', name: 'ショウガ', category: 'root', aliases: ['しょうが', 'ginger', '生姜'] },
  { id: 'yam', name: '山芋', category: 'root', aliases: ['やまいも', 'ヤマイモ', 'yam', '長芋', 'ながいも', 'ナガイモ'] },
  { id: 'lotus-root', name: 'れんこん', category: 'root', aliases: ['レンコン', 'lotus root', '蓮根'] },
  { id: 'purple-sweet-potato', name: '紫いも', category: 'root', aliases: ['むらさきいも', '紫芋', 'purple sweet potato', '紫さつまいも'] },

  // ── 豆類（7種） ──
  { id: 'pea', name: 'エンドウ豆', category: 'bean', aliases: ['えんどうまめ', 'えんどう豆', 'pea', 'エンドウマメ'] },
  { id: 'snap-pea', name: 'スナップエンドウ', category: 'bean', aliases: ['すなっぷえんどう', 'snap pea', 'sugar snap pea'] },
  { id: 'broad-bean', name: 'ソラマメ', category: 'bean', aliases: ['そらまめ', 'broad bean', 'fava bean', '空豆', 'そら豆'] },
  { id: 'soybean', name: '大豆', category: 'bean', aliases: ['だいず', 'ダイズ', 'soybean'] },
  { id: 'black-bean', name: '黒豆', category: 'bean', aliases: ['くろまめ', 'クロマメ', 'black bean', 'black soybean'] },
  { id: 'peanut', name: 'ラッカセイ', category: 'bean', aliases: ['らっかせい', 'peanut', '落花生', 'ピーナッツ', 'ぴーなっつ'] },
  { id: 'bean-sprout', name: 'もやし', category: 'bean', aliases: ['モヤシ', 'bean sprout', 'mung bean sprout'] },

  // ── ハーブ類（16種） ──
  { id: 'basil', name: 'バジル', category: 'herb', aliases: ['ばじる', 'basil'] },
  { id: 'parsley', name: 'パセリ', category: 'herb', aliases: ['ぱせり', 'parsley'] },
  { id: 'shiso', name: 'シソ', category: 'herb', aliases: ['しそ', 'shiso', 'perilla', '紫蘇', '大葉', 'おおば'] },
  { id: 'mint', name: 'ミント', category: 'herb', aliases: ['みんと', 'mint'] },
  { id: 'rosemary', name: 'ローズマリー', category: 'herb', aliases: ['ろーずまりー', 'rosemary'] },
  { id: 'thyme', name: 'タイム', category: 'herb', aliases: ['たいむ', 'thyme'] },
  { id: 'oregano', name: 'オレガノ', category: 'herb', aliases: ['おれがの', 'oregano'] },
  { id: 'sage', name: 'セージ', category: 'herb', aliases: ['せーじ', 'sage'] },
  { id: 'coriander', name: 'コリアンダー', category: 'herb', aliases: ['こりあんだー', 'coriander', 'cilantro', 'パクチー', 'ぱくちー'] },
  { id: 'myoga', name: 'みょうが', category: 'herb', aliases: ['ミョウガ', 'myoga', '茗荷'] },
  { id: 'dill', name: 'ディル', category: 'herb', aliases: ['でぃる', 'dill'] },
  { id: 'chervil', name: 'チャービル', category: 'herb', aliases: ['ちゃーびる', 'chervil'] },
  { id: 'lemon-balm', name: 'レモンバーム', category: 'herb', aliases: ['れもんばーむ', 'lemon balm'] },
  { id: 'lavender', name: 'ラベンダー', category: 'herb', aliases: ['らべんだー', 'lavender'] },
  { id: 'fennel', name: 'フェンネル', category: 'herb', aliases: ['ふぇんねる', 'fennel'] },
  { id: 'chive', name: 'チャイブ', category: 'herb', aliases: ['ちゃいぶ', 'chive', 'chives'] },

  // ── ベリー類（3種） ──
  { id: 'strawberry', name: 'イチゴ', category: 'berry', aliases: ['いちご', 'strawberry', '苺'] },
  { id: 'blueberry', name: 'ブルーベリー', category: 'berry', aliases: ['ぶるーべりー', 'blueberry'] },
  { id: 'raspberry', name: 'ラズベリー', category: 'berry', aliases: ['らずべりー', 'raspberry'] },
] as const;

const CATEGORY_EMOJIS: Record<string, string> = {
  fruit: '🍅',
  leaf: '🥬',
  root: '🥕',
  bean: '🫘',
  herb: '🌿',
  berry: '🍓',
}

const VEGETABLE_EMOJIS: Record<string, string> = {
  // fruit
  'トマト': '🍅', 'ミニトマト': '🍅', 'ナス': '🍆', 'ピーマン': '🫑', 'パプリカ': '🫑',
  'キュウリ': '🥒', 'ズッキーニ': '🥒', 'カボチャ': '🎃', 'スイカ': '🍉', 'メロン': '🍈',
  'トウモロコシ': '🌽', 'オクラ': '🫛', 'エダマメ': '🫘', 'インゲン': '🫘',
  'ゴーヤ': '🥒', 'ししとう': '🌶️', 'とうがらし': '🌶️', '冬瓜': '🥬',
  // leaf
  'レタス': '🥬', 'サニーレタス': '🥬', 'キャベツ': '🥬', '白菜': '🥬',
  'ほうれん草': '🥬', '小松菜': '🥬', 'チンゲン菜': '🥬', '春菊': '🥬',
  '水菜': '🥬', 'ルッコラ': '🥬', 'ケール': '🥬', 'ブロッコリー': '🥦',
  'カリフラワー': '🥦', 'アスパラガス': '🌿', 'セロリ': '🌿', 'ネギ': '🧅',
  'ニラ': '🌿', 'クレソン': '🌿', 'プチヴェール': '🥦', 'モロヘイヤ': '🥬', '紫キャベツ': '🥬',
  // root
  '大根': '🥕', 'カブ': '🥕', 'ニンジン': '🥕', 'ビーツ': '🥕', 'ゴボウ': '🥕',
  'サツマイモ': '🍠', 'ジャガイモ': '🥔', 'サトイモ': '🥔', 'タマネギ': '🧅',
  'ニンニク': '🧄', 'ショウガ': '🌿', '山芋': '🥔', 'れんこん': '🌿', '紫いも': '🍠',
  // bean
  'エンドウ豆': '🫛', 'スナップエンドウ': '🫛', 'ソラマメ': '🫘',
  '大豆': '🫘', '黒豆': '🫘', 'ラッカセイ': '🥜', 'もやし': '🌱',
  // herb
  'バジル': '🌿', 'パセリ': '🌿', 'シソ': '🌿', 'ミント': '🌿',
  'ローズマリー': '🌿', 'タイム': '🌿', 'オレガノ': '🌿', 'セージ': '🌿',
  'コリアンダー': '🌿', 'みょうが': '🌿', 'ディル': '🌿', 'チャービル': '🌿',
  'レモンバーム': '🌿', 'ラベンダー': '💜', 'フェンネル': '🌿', 'チャイブ': '🌿',
  // berry
  'イチゴ': '🍓', 'ブルーベリー': '🫐', 'ラズベリー': '🍓',
}

export function getVegetableEmoji(name: string, category: string): string {
  return VEGETABLE_EMOJIS[name] ?? CATEGORY_EMOJIS[category] ?? '🌱'
}
