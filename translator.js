/**
 * Translates a given string to Pig Latin or English using jQuery.
 *
 * @param {string} str - The string to be translated.
 * @param {boolean} toPigLatin - Indicates whether the translation should be to Pig Latin (true) or to English (false).
 * @return {string} The translated string.
 */
function translate(str, toPigLatin) {
    if (toPigLatin) {
        const words = str.split(" ");
        const pigLatinWords = words.map(word => word.slice(1) + word.charAt(0) + "ay");
        const pigLatinString = pigLatinWords.join(" ");
        return $(pigLatinString).text();
    } else {
        return $(str).text().replace(/(^|\s)(\w)/g, function(match, p1, p2) {
            return p1 + p2.toUpperCase();
        });
    }
}

/**
 * Checks if a word is in Pig Latin.
 *
 * @param {string} word - The word to check.
 * @return {boolean} True if the word is in Pig Latin, false otherwise.
 */
function isPigLatin(word) {
    const pigLatinPatterns = [
        { pattern: /.*[^aeiouy]+[aeiouy]+ay$/, isPigLatin: true },
        { pattern: /^[aeiouy]+yay$/, isPigLatin: true },
        { pattern: /^[aeiouy]+ay$/, isPigLatin: true },
    ];

    return pigLatinPatterns.some(({ pattern, isPigLatin }) => pattern.test(word)) || false;
}

/**
 * Detects the language of the input text by counting the number of English words and Pig Latin words.
 *
 * @param {string} inputText - The text to be analyzed.
 * @return {string} The detected language. Possible values are "English", "Pig Latin", or "Uncertain".
 */
function detectLanguage(inputText) {
    const words = inputText.split(' ');
    const counts = { english: 0, pigLatin: 0 };

    for (const word of words) {
        counts[isPigLatin(word) ? 'pigLatin' : 'english']++;
    }

    if (counts.english > counts.pigLatin) {
        return 'English';
    } else if (counts.english < counts.pigLatin) {
        return 'Pig Latin';
    } else {
        return 'Uncertain';
    }
}
