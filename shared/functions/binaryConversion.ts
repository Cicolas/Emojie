export const BinaryConverter = {
  from: (str: string) => {
    const binary = atob(str);
    const bytes = new Uint8Array(binary.length)
      .map((_, i) => binary.charCodeAt(i));

    return String.fromCharCode(...new Uint16Array(bytes.buffer));
  },

  to: (str: string) => {
    const charBytes = new Uint16Array(str.length)
      .map((_, i) => str.charCodeAt(i));

    return btoa(String.fromCharCode(...new Uint8Array(charBytes.buffer)));
  }
}
