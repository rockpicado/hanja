import * as hanjaTable from './data/hanjaeum.json';

type TRANSLATE_TYPES = 'SUBSTITUTION' | 'PARENTHESIS_HANGUL' | 'PARENTHESIS_HANJA';

function isHanja(char: string): boolean {
  return char in hanjaTable;
}

function split(text: string): string[] {
  let prevIsHanja: boolean | null = null;
  let segment = '';
  const result: string[] = [];

  for (const char of text) {
    const currentIsHanja = isHanja(char);

    if (prevIsHanja === currentIsHanja) {
      segment += char;
    } else {
      if (segment) result.push(segment);
      segment = char;
      prevIsHanja = currentIsHanja;
    }
  }

  if (segment) result.push(segment);
  return result;
}

function dueum(char: string, context: string): string {
  const chars = char.normalize('NFKD');

  // 모음이나 ㄴ 받침 뒤의 '렬, 률' → '열, 율'
  if ('렬률'.includes(char)) {
    const prevChar = context[context.length - 1]?.normalize('NFKD');
    if (!prevChar || prevChar[2] === undefined || prevChar[2] === '안'.normalize('NFKD')[2]) {
      return ('ㅇ' + chars.slice(1)).normalize('NFKC');
    }
  }

  if (context !== '') return char;

  // 단어 첫머리의 '녀, 뇨, 뉴, 니' → '여, 요, 유, 이'
  if (chars[0] === 'ㄴ'.normalize('NFKD') && 'ㅑㅕㅛㅠㅣㅖ'.normalize('NFKD').includes(chars[1])) {
    return ('ㅇ' + chars.slice(1)).normalize('NFKC');
  }

  // 단어 첫머리의 '랴, 려, 례, 료, 류, 리' → '야, 여, 예, 요, 유, 이'
  if (chars[0] === 'ㄹ'.normalize('NFKD') && 'ㅑㅕㅛㅠㅣㅖ'.normalize('NFKD').includes(chars[1])) {
    return ('ㅇ' + chars.slice(1)).normalize('NFKC');
  }

  // 단어 첫머리의 '라, 래, 로, 뢰, 루, 르' → '나, 내, 노, 뇌, 누, 느'
  if (chars[0] === 'ㄹ'.normalize('NFKD') && 'ㅏㅗㅜㅡㅐㅚ'.normalize('NFKD').includes(chars[1])) {
    return ('ㄴ' + chars.slice(1)).normalize('NFKC');
  }

  return char;
}

function translate(
  text: string,
  mode: TRANSLATE_TYPES | ((hanja: string, hangul: string) => string)
): string {
  if (mode === 'SUBSTITUTION') {
    let result = '';
    for (const char of text) {
      if (char in hanjaTable) {
        result += dueum(hanjaTable[char as keyof typeof hanjaTable], result);
      } else {
        result += char;
      }
    }
    return result;
  }

  if (typeof mode === 'function') {
    const fn = mode;
    let result = '';
    const segments = split(text);
    for (const segment of segments) {
      if (!isHanja(segment[0])) {
        result += segment;
      } else {
        result += fn(segment, translate(segment, 'SUBSTITUTION'));
      }
    }
    return result;
  }

  if (mode === 'PARENTHESIS_HANGUL') {
    return translate(text, (hanja, hangul) => `${hanja}(${hangul})`);
  }

  if (mode === 'PARENTHESIS_HANJA') {
    return translate(text, (hanja, hangul) => `${hangul}(${hanja})`);
  }

  return text;
}

export { translate, split };
