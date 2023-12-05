import { readFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'yaml';
const file = readFileSync(join(__dirname, '../table.yml'), 'utf8');
const hanjaTable = parse(file);

enum TRANSLATE_TYPES {
  SUBSTITUTION = 'SUBSTITUTION', PARENTHESIS_HANGUL = 'PARENTHESIS_HANGUL', PARENTHESIS_HANJA = 'PARENTHESIS_HANJA'
}

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
  // return [text]
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

function translate(text: string, mode: TRANSLATE_TYPES): string {
  if (mode === TRANSLATE_TYPES.SUBSTITUTION) {
    let result = "";
    for (const char of text) {
      if (char in hanjaTable) result += dueum(hanjaTable[char], result);
      else result += char;
    }
    return result;
  } else if (mode === TRANSLATE_TYPES.PARENTHESIS_HANGUL) {
    let result = "";
    const segments = split(text);
    for (const segment of segments) {
      if (!isHanja(segment[0])) {
        result += segment;
      } else {
        result += `${segment}(${translate(segment, TRANSLATE_TYPES.SUBSTITUTION)})`;
      }
    }
    return result;
    
  } else if (mode === TRANSLATE_TYPES.PARENTHESIS_HANJA) {
    let result = "";
    const segments = split(text);
    for (const segment of segments) {
      if (!isHanja(segment[0])) {
        result += segment;
      } else {
        result += `${translate(segment, TRANSLATE_TYPES.SUBSTITUTION)}(${segment})`;
      }
    }
    return result;
  }

  return text;
}


export default { TRANSLATE_TYPES, split, translate };
