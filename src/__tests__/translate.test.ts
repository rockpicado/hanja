import hanja from '../index';

test('split hanja', () => {
  const corpora = hanja.split('大韓民國은 民主共和國이다.');
  expect(corpora.length).toBe(4);
  expect(corpora[0]).toBe('大韓民國');
  expect(corpora[1]).toBe('은 ');
  expect(corpora[2]).toBe('民主共和國');
  expect(corpora[3]).toBe('이다.');
});

test('translate substitution mode', () => {
  expect(hanja.translate("韓國語", "SUBSTITUTION")).toBe("한국어");
  expect(hanja.translate("한국어", "SUBSTITUTION")).toBe("한국어");
  expect(hanja.translate("利用해", "SUBSTITUTION")).toBe("이용해");
  expect(hanja.translate("連結된", "SUBSTITUTION")).toBe("연결된");
  expect(hanja.translate("1800年에", "SUBSTITUTION")).toBe("1800년에");
  expect(hanja.translate("그레고리曆", "SUBSTITUTION")).toBe("그레고리력");
  expect(hanja.translate("系列", "SUBSTITUTION")).toBe("계열");
  expect(hanja.translate("分列", "SUBSTITUTION")).toBe("분열");
  expect(hanja.translate("烈士", "SUBSTITUTION")).toBe("열사");
});

test("translate parenthesis hanja mode", () => {
  expect(hanja.translate('韓國語', "PARENTHESIS_HANGUL")).toBe('韓國語(한국어)');

  expect(hanja.translate("韓國語", "PARENTHESIS_HANGUL")).toBe("韓國語(한국어)");
  expect(hanja.translate("利用해", "PARENTHESIS_HANGUL")).toBe("利用(이용)해");
  expect(
      hanja.translate("大韓民國은 民主共和國이다.", "PARENTHESIS_HANGUL")
  ).toBe("大韓民國(대한민국)은 民主共和國(민주공화국)이다.");
});

test("translate parenthesis custom mode", () => {
  expect(
      hanja.translate("大韓民國은 民主共和國이다.", (hanja, hangul) => `<ruby>${hanja}<rt>${hangul}</rt></ruby>`)
  ).toBe("<ruby>大韓民國<rt>대한민국</rt></ruby>은 <ruby>民主共和國<rt>민주공화국</rt></ruby>이다.");
});
