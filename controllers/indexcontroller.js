function test() {
    //take this plugin,
    var plugin = {
        name:'compromise-dinosaur',
        words: {
        brontosaurus:'Dinosaur',
        trex: 'Dinosaur'
        },
        tags: {
        Dinosaur: {
            isA: 'Animal'
        },
        Animal: {
            isA: 'Noun'
        }
        },
        regex: {
        '.osaurus$': 'Dinosaur',
        'uuu+': 'Exaggeration1'
        }
    };
  
    //then load it in nlp-compromise (it unpacks automatically)
    nlp.plugin(plugin);
    var doc = nlp('i saw a HUUUUGE trex').debug()
    /*
        'i'           - Pronoun, Noun, Singular
        'saw'         - PastTense, Verb, VerbPhrase
        'a'           - Determiner
        'HUUUUGE'     - Exaggeration
        'trex'        - Dinosaur, Animal, Noun, Singular
    */
    
        var div = document.getElementById('divType');
        div.innerText = doc.out()
}

function processInputs() {
    new IndexController().processInputs();
}

function parseLanguage() {
    new IndexController().parseLanguage();
}

function filter() {
    new IndexController().filter();
}

function runCommand() {
    new IndexController().runCommand();
}

function IndexController() {
    this.parserHelper = new NlpParserHelper();
    this.statementAnalyser = new StatementAnalyser();
    this.htmlHelper = new HtmlHelper();
}

IndexController.prototype.parseLanguage = function () {
    var stringUtils = new StringUtils();
    var qryInput = 'Create a callreport for jefferies. Add a meeting to call report with attendees Mark, Brian and Neeraj for 11:30 AM tomorrow.';
    var allStatements = this.parserHelper.parseStatements(qryInput);
    var statementList = stringUtils.listStrings(allStatements.list);
    var divType = document.getElementById('divType');
    var div = document.getElementById('divNames');
    div.innerHTML = '';
    divType.innerHTML = statementList;

    var allParsed = this.parserHelper.parseStatement(qryInput);
    var i;
    for(i = 0; i < statementList.length; i++) {
        div.innerHTML += this.htmlHelper.createTable(this.parserHelper.parseStatement(statementList[i]));
        this.statementAnalyser.analyse({"statements":allStatements}, i);
    }
}

IndexController.prototype.processInputs = function () {
    var div = document.getElementById('divNames');
    var divType = document.getElementById('divType');
    var statement = document.getElementById('qryInput').value;
    divType.textContent = statement;
    div.innerHTML = this.htmlHelper.createTable(this.parserHelper.parseStatement(statement));
}

IndexController.prototype.filter = function () {
    var statement = document.getElementById('qryInput').value;
    var filter = document.getElementById('qryFilter').value;
    var doc = this.parserHelper.getDoc(statement);
    var div = document.getElementById('divNames');
    div.innerText = doc.match(filter).out();
}

IndexController.prototype.runCommand = function () {
    var statement = document.getElementById('qryInput').value;
    var command = document.getElementById('txtCommand').value;
    var doc = this.parserHelper.getDoc(statement);
    var div = document.getElementById('divType');
    div.innerText = doc[command]().out();
}

IndexController.prototype.printAllTags = function () {
    console.log(nlp.world.tags.getOwnPropertyNames());
}
