import { useEffect, useState } from "preact/hooks";
import emojiJSON from "../shared/emojis.json" with { type: "json" };
import { Emoji } from "../shared/types/emoji.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
import ifEmoji from 'if-emoji'
import { Signal } from "@preact/signals";

type CategoriesType =
  'food drink'      |
  'flags'           |
  'travel places'   |
  'symbols'         |
  'smileys emotion' |
  'activities'      |
  'objects'         |
  'animals nature'  |
  'people body'     |
  ''                ;

const emojiListCache = emojiJSON.map(
  obj => {
    const wordsSet = Array.from(new Set(
      [
        ...obj.description.split(" "),
        ...obj.category.split(" "),
        ...obj.aliases,
        ...obj.tags
      ]
    ))

    return {
      emoji: obj.emoji,
      name: obj.aliases[0],
      words: wordsSet,
      category: obj.category
    }
  }
)

const emojiCategoryList: {name: CategoriesType, emoji: string}[] = [
  { name: "smileys emotion",  emoji: "😃"},
  { name: "people body",      emoji: "🤙"},
  { name: "animals nature",   emoji: "🐈"},
  { name: "food drink",       emoji: "🍕"},
  { name: "travel places",    emoji: "🌍"},
  { name: "activities",       emoji: "🎈"},
  { name: "objects",          emoji: "📦"},
  { name: "symbols",          emoji: "🆗"},
  { name: "flags",            emoji: "🏁"},
]

interface EmojiCardProps {
  emoji: string,
  name: string,
  inputEmoji: (emoji: string) => void;
}

function EmojiCard({emoji, name, inputEmoji}: EmojiCardProps) {
  return <button class="
      flex justify-center items-center
      w-12 h-12
      border-2 rounded-md border-gray-400
      text-2xl
      bg-white hover:bg-gray-300 duration-200
      cursor-pointer
    "
    name={name}
    onClick={ inputEmoji.bind({}, emoji) }
  >
    {emoji}
  </button>
}

interface EmojiCategoryProps {
  emoji: string,
  category: CategoriesType,
  categorySelected: CategoriesType,
  onSelect: (str: CategoriesType) => void;
}

function EmojiCategory({emoji, category, categorySelected, onSelect}: EmojiCategoryProps) {
  return <span
    onClick={() => { onSelect(category) }}
    class={`cursor-pointer ${categorySelected === category ? "grayscale-0" : "grayscale"} `}
  >
    {emoji}
  </span>
}

interface EmojiListingProps {
  emojiStr: Signal<string>;
}

export default function EmojiListing({ emojiStr }: EmojiListingProps) {
  if (!IS_BROWSER) return <></>;

  const [emojiList, setEmojiList] = useState<Emoji[]>(emojiListCache);
  const [filter, setFilter] = useState<string>("");
  const [category, setCategory] = useState<CategoriesType>("");

  function updateFilter(ev: Event) {
    const target = ev.target as HTMLInputElement;

    setEmojiList(
      getEmoji(target.value, category)
    );

    setFilter(target.value);
  }

  function updateCategory(str: CategoriesType) {
    const newCategoryValue = category === str ? "": str;

    setEmojiList(
      getEmoji(filter, newCategoryValue)
    );

    setCategory(newCategoryValue);
  }

  function inputEmoji(emoji: string) {
    emojiStr.value = emojiStr.value.concat(emoji);
  }

  return <>
    <input
      type="text"
      class="
        outline-none
        px-4 py-2 mb-4 w-full
        rounded-full border-2 border-gray-400 focus:border-gray-600
        transition-all duration-300 ease-in-out
        text-gray-700 font-mediumtext-base
        placeholder:font-normal placeholder:tracking-normal
      "
      placeholder="search emoji"
      onInput={ updateFilter }
    />
    <div class="w-full flex gap-2 select-none">
      {
        emojiCategoryList.map(({emoji, name}) => <EmojiCategory
          emoji={emoji} onSelect={updateCategory} categorySelected={category} category={name}
        ></EmojiCategory>)
      }
    </div>
    <div class="w-full h-full py-4 grid grid-cols-6 gap-4 auto-rows-min select-none">
      {emojiList.map(obj => <EmojiCard {...obj} inputEmoji={inputEmoji}/>)}
    </div>
  </>
}

function getEmoji(filter: string, categoryFilter: CategoriesType): Emoji[] {
  const wordsFilter = filter.split(" ");
  let emojiListKeywords: {
    emoji: string;
    name: string;
    words: string[];
    category: string;
  }[] = emojiListCache.filter(({category}) => !categoryFilter || categoryFilter === category);

  wordsFilter.forEach(word => {
    emojiListKeywords = emojiListKeywords
      .filter(({words}) => words.some((val) => val.includes(word)))
  })

  return emojiListKeywords.map(({name, emoji}) => {return {name, emoji}});
}
