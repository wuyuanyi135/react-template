import _ from 'lodash'
function reduceAuthors(authorList = {}) {
    if (!authorList.length) {
        return "";
    }
    var ret = _.castArray(authorList).reduce((p, c) => {
        return `${p}, ${c}`;
    }, "");
    return _.trim(ret, ', ');
}

/**
 * build source string
 */
function makeSource(SO, PST) {
    return `${SO}${PST=='aheadofprint'?' [Epub ahead of print]':''}`;
}

function makeISSN(IS) {
    return _.castArray(IS).map((item) => {
        var reg = /(\S{4}-\S{4}).*\((.*)\).*/;
        var result = reg.exec(item);
        try {
            return {
                issn: result[1],
                issnType: result[2]
            }
        } catch (e) {
            return {
                issn: "",
                issnType: ""
            }
        }

    })
}
/**
 * Map the field name to previous version.
 * @method mapMedline
 * @param  {object}   medlineObject retrieved by queryMedline
 * @return {object}                 mapped object
 */
export function mapMedline(medlineObject) {
    return {
        pmid: medlineObject.PMID,
        authors: reduceAuthors(medlineObject.AU),
        affiliation: _(_.castArray(medlineObject.AD)).omitBy(_.isUndefined).values().value(),
        selectedAffiliation: "",
        selectedISSN: "",
        selectedPublicationTypes: "",
        articleTitle: medlineObject.TI ? medlineObject.TI : "",
        source: makeSource(medlineObject.SO, medlineObject.PST),
        issn: makeISSN(_.castArray(medlineObject.IS)),
        publicationTypes: _.castArray(medlineObject.PT)
    }
}
