
import * as hanjaTable from './data/hoek.json';

type StrokesFormat = '12345' // default
  | '一丨丿丶乚' // https://www.cns11643.gov.tw/wordView.jsp?ID=92487
  | '一丨丿丶乙' // https://en.wikipedia.org/wiki/Stroke_count_method
  | 'hspnz' // https://github.com/rime/rime-stroke
  | 'MLJKN' // https://github.com/picado-tv/my_rime_handarin

function getStrokes(hanja: string, format: StrokesFormat = '12345'): string | undefined {
  const strokes = hanjaTable[hanja as keyof typeof hanjaTable] || undefined;
  if (!strokes) return undefined;
  if (format === '12345') return strokes;

  return [...strokes].map(ch => format[ch.charCodeAt(0)-'0'.charCodeAt(0)-1]).join('');
}

export { getStrokes };
