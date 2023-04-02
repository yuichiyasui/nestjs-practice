const smallAlphabetPattern = '(?=.*[a-z])' as const;

const largeAlphabetPattern = '(?=.*[A-Z])' as const;

const numberPattern = '(?=.*[0-9])' as const;

const symbolPattern = '(?=.*[!@;:+_%&$#<>-])' as const;

const smallAndLargeAndNumber =
  `${smallAlphabetPattern}${largeAlphabetPattern}${numberPattern}` as const;
const smallAndLargeAndSymbol =
  `${smallAlphabetPattern}${largeAlphabetPattern}${symbolPattern}` as const;
const largeAndNumberAndSymbol =
  `${largeAlphabetPattern}${numberPattern}${symbolPattern}` as const;
const smallAndNumberAndSymbol =
  `${smallAlphabetPattern}${numberPattern}${symbolPattern}` as const;

/** 英大文字小文字数字記号のいずれか3種類以上を含む */
export const passwordRegExp = new RegExp(
  `${smallAndLargeAndNumber}|${smallAndLargeAndSymbol}|${largeAndNumberAndSymbol}|${smallAndNumberAndSymbol}`,
);
