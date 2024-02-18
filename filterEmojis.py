import json

def filter_emojis():
  with open('./shared/emojis.raw.json', "r", encoding="utf-8") as f_in, \
       open('./shared/emojis.json', 'w', encoding="utf-8") as f_out:
    data = json.load(f_in)

    print("INFO: Converting Emojis")

    data = list(filter(
      lambda obj: 12.0 > float(obj["unicode_version"]),
      data
    ))

    print("INFO: Emojis Filtered")

    data_copied = data.copy()

    version_list = list(map(
      lambda obj: float(obj["unicode_version"]),
      data_copied
    ))
    version_list.sort()
    version_list = set(version_list)

    print("INFO: Versions =", version_list)

    categories_list = list(map(
      lambda obj: obj["category"],
      data_copied
    ))
    categories_list = set(categories_list)

    print("INFO: Categories =", categories_list)

    f_out.write(
      json
        .dumps(data, indent="\t", ensure_ascii=False)
        .casefold()
        .replace("_", " ")
        .replace("&", " ")
        .replace("   ", " ")
    )

    print("INFO: Emojis Written")

if __name__ == "__main__":
  filter_emojis()
