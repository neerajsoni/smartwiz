function StatementAnalyser() {
    this.parserHelper = new NlpParserHelper();

}

StatementAnalyser.prototype.constructor = StatementAnalyser;

StatementAnalyser.prototype.analyse = function (context, iStatement) {
    var allParsed = this.parserHelper.parseStatement(context.statements);
    var parsedStatement = this.parserHelper.parseStatement(context.statements[iStatement]);
    var k = iStatement > 0 ? 1 : 0; 
    if(k > 0) {
        var parsedPrevStatement = this.parserHelper.parseStatement(context.statements[iStatement - k]);

        var key;
        for (key in parsedStatement) {
            if (parsedPrevStatement.hasOwnProperty(key)) {
                var isCommon = parsedPrevStatement[key].includes(this.parserHelper.parseStatement[key]);
            }
        }
    }
}
