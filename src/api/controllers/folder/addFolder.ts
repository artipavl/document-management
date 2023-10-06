import connectDB from "../../connect-db";
import FolderModel from "@/api/models/folder";

interface getFoldersProps {
  name: string;
}

export const addFolders = async ({ name }: getFoldersProps) => {
  try {
    await connectDB();
    const Folders = await FolderModel.create({
      name: name.toLowerCase(),
      href: translit(name),
    });
    return Folders;
  } catch (error) {
    console.log(error);
  }
};

function translit(str: string) {
  const space = "-";
  let link = "";
  const transl = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    є: "ie",
    ж: "zh",
    з: "z",
    и: "y",
    і: "i",
    й: "i",
    ї: "j",
    к: "k",
    до: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    про: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "h",
    ц: "c",
    ч: "ch",
    ш: "sh",
    щ: "sh",
    ъ: space,
    ь: space,
    ю: "yu",
    я: "ya",
  };
  if (str != "") str = str.toLowerCase();
  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i);
    if (/[а-яе]/.test(char)) {
      // замінюємо символи російською
      link += transl[char as keyof typeof transl];
    } else if (/[a-z0-9]/.test(char)) {
      // символи на анг. залишаємо як є
      link += char;
    } else {
      if (link.slice(-1) !== space) link += space; // інші символи замінюємо на space
    }
  }
  return link;
}
