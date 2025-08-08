import hanja from '../index';

test('get strokes', () => {
  expect(hanja.getStrokes('人', '一丨丿丶乙')).toBe('丿丶');
  expect(hanja.getStrokes('口', '一丨丿丶乙')).toBe('丨乙一');
  expect(hanja.getStrokes('十', '一丨丿丶乙')).toBe('一丨');
  expect(hanja.getStrokes('木', '一丨丿丶乙')).toBe('一丨丿丶');
  expect(hanja.getStrokes('水', '一丨丿丶乙')).toBe('乙乙丿丶');
  expect(hanja.getStrokes('友', '一丨丿丶乙')).toBe('一丿乙丶');
  expect(hanja.getStrokes('反', '一丨丿丶乙')).toBe('一丿乙丶');
  expect(hanja.getStrokes('沈', '一丨丿丶乙')).toBe('丶丶丶丶乙丿乙');
  expect(hanja.getStrokes('家', '一丨丿丶乙')).toBe('丶丶乙一丿乙丿丿丿丶');
  expect(hanja.getStrokes('大', '一丨丿丶乙')).toBe('一丿丶');
  expect(hanja.getStrokes('韓', '一丨丿丶乙')).toBe('一丨丨乙一一一丨乙丨一丨乙一一乙丨');
  expect(hanja.getStrokes('民', '一丨丿丶乙')).toBe('乙一乙一乙');
  expect(hanja.getStrokes('國', '一丨丿丶乙')).toBe('丨乙一丨乙一一乙丶丿一');

  expect(hanja.getStrokes('숲', '一丨丿丶乙')).toBeUndefined();
});

test('stroke format', () => {
  expect(hanja.getStrokes('合')).toBe('341251');
  expect(hanja.getStrokes('合', '12345')).toBe('341251');
  expect(hanja.getStrokes('合', '一丨丿丶乚')).toBe('丿丶一丨乚一');
  expect(hanja.getStrokes('合', '一丨丿丶乙')).toBe('丿丶一丨乙一');
  expect(hanja.getStrokes('合', 'MLJKN')).toBe('JKMLNM');
  expect(hanja.getStrokes('合', 'hspnz')).toBe('pnhszh');
});
