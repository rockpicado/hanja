
import * as hanjaTable from '../data/hanjaeum.json';

type TRANSLATE_TYPES = 'SUBSTITUTION' | 'PARENTHESIS_HANGUL' | 'PARENTHESIS_HANJA'

function isHanja(char: string): boolean {
  return char in hanjaTable;
}

function split(text: string): string[] {
  let prev = null;
  let segment: null | string = null;
  const result = [];
  for (const char of text) {
    if (prev === isHanja(char)) {
      if (segment !== null) segment += char;
      continue;
    }
    
    if (segment !== null) result.push(segment);
    prev = !prev;
    segment = "";
    segment += char;
  }
  if (segment !== null) result.push(segment);

  return result;
}

function dueum(char: string, context: string): string {
  const chars = char.normalize('NFKD');

  // 모음이나 ㄴ 받침 뒤에 이어지는 '렬, 률'은 '열, 율'로 발음한다.
  if ('렬률'.includes(char)) {
    const prevChars = context[context.length - 1].normalize('NFKD');
    if (prevChars[2] === undefined || prevChars[2] === '알'.normalize('NFKD')[2]) {
      return ('ㅇ' + chars.slice(1)).normalize('NFKC');
    }
  }

  if (context !== '') return char;

  // 한자음 '녀, 뇨, 뉴, 니', '랴, 려, 례, 료, 류, 리'가 단어 첫머리에 올 때
  // '여, 요, 유, 이', '야, 여, 예, 요, 유, 이'로 발음한다.
  if (chars[0] === 'ㄴ'.normalize('NFKD') && 'ㅑㅕㅛㅠㅣㅖ'.normalize('NFKD').includes(chars[1]) ) {
    return ('ㅇ'+chars.slice(1)).normalize('NFKC');
  }
  if (chars[0] === 'ㄹ'.normalize('NFKD') && 'ㅑㅕㅛㅠㅣㅖ'.normalize('NFKD').includes(chars[1]) ) {
    return ('ㅇ'+chars.slice(1)).normalize('NFKC');
  }
  // 한자음 '라, 래, 로, 뢰, 루, 르'가 단어 첫머리에 올 때 '나, 내, 노, 뇌,
  // 누, 느'로 발음한다.
  if (chars[0] === 'ㄹ'.normalize('NFKD') && 'ㅏㅗㅜㅡㅐㅚ'.normalize('NFKD').includes(chars[1]) ) {
    return ('ㄴ'+chars.slice(1)).normalize('NFKC');
  }

  return char;
}

function translate(text: string, mode: TRANSLATE_TYPES | ((hanja: string, hangul: string) => string)): string {
  if (mode === 'SUBSTITUTION') {
    let result = "";
    for (const char of text) {
      if (char in hanjaTable) result += dueum(hanjaTable[char as keyof typeof hanjaTable], result);
      else result += char;
    }
    return result;
  } else if (typeof mode === 'function') {
    const fn = mode || function (hanja) { return hanja; };

    let result = "";
    const segments = split(text);
    for (const segment of segments) {
      if (!isHanja(segment[0])) {
        result += segment;
      } else {
        result += fn(segment, translate(segment, 'SUBSTITUTION'));
      }
    }
    return result;
  } else if (mode === 'PARENTHESIS_HANGUL') {
    return translate(text, (hanja, hangul) => `${hanja}(${hangul})`);
  } else if (mode === 'PARENTHESIS_HANJA') {
    return translate(text, (hanja, hangul) => `${hangul}(${hanja})`);
  }

  return text;
};

export { translate, split };