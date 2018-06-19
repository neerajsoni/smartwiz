function NlpParserHelper() {
    //https://unpkg.com/compromise@latest/builds/compromise.min.js
    
    // this.docElements = ['nouns', 'singular', 'person', 'firstName', 'maleName', 'femaleName', 'lastName', 'honorific', 'places', 'country', 'city', 'region', 'address', 'organizations', 'sportsTeam', 'company', 'school', 'plural', 'uncountable', 'pronoun', 'actor', 'activity', 'unit', 'demonym', 'possessive', 'verbs', 'presentTense', 'infinitive', 'gerund', 'pastTense', 'perfectTense', 'futurePerfect', 'pluperfect', 'copula', 'modal', 'participle', 'particle', 'phrasalVerb', 'values', 'ordinal', 'cardinal', 'multiple', 'romanNumeral', 'fraction', 'textValue', 'numericValue', 'niceNumber', 'money', 'percent', 'dates', 'month', 'weekDay', 'relativeDay', 'year', 'duration', 'time', 'holiday', 'adjectives', 'comparable', 'comparative', 'superlative', 'numberRange', 'adverbs', 'currency', 'determiner', 'conjunction', 'preposition', 'questionWord', 'expression', 'urls', 'phoneNumbers', 'hashTags', 'atMention', 'emoji', 'email', 'condition', 'verbPhrase', 'auxiliary', 'negative', 'contractions', 'titleCase', 'camelCase', 'upperCase', 'hyphenated', 'acronyms', 'clauseEnd', 'quotation'];    
    this.docElements = ['activity', 'nouns', 'people', 'places', 'organizations', 'verbs', 'values', 'dates', 'adjectives', 'adverbs', 'urls', 'phoneNumbers', 'hashTags', 'contractions', 'acronyms'];

    // nlp.plugin(lexicon);

    this.stringUtils = new StringUtils();
};

NlpParserHelper.prototype.constructor = NlpParserHelper;

NlpParserHelper.prototype.getDoc = function(statement) {
    return nlp(statement, lexicon);
}

NlpParserHelper.prototype.parseStatement = function (statement) {
    var jsonData = {};
    var doc = this.getDoc(statement);

    try {
        for (var attempts = 0; attempts < this.docElements.length; attempts++) {
            if (doc[this.docElements[attempts]] != undefined) {
                var elementList = doc[this.docElements[attempts]]();
                jsonData[this.docElements[attempts]] = this.stringUtils.listStrings(elementList.list);
            } else {
                jsonData[this.docElements[attempts]] = '';
            }
        }
    } catch (e) {
        console.log('error while processing statement');
    }

    return jsonData;
}

NlpParserHelper.prototype.parseStatements = function(paragraph) {
    return this.getDoc(paragraph).sentences();
}