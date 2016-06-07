import { connect } from 'react-redux';
import React, { Component } from 'react';
import { FormGroup } from 'react-bootstrap';
import Autosuggest from 'react-autosuggest';
import reqwest from 'reqwest';
import _ from 'lodash';

const fetchSuggestions = (value, context) => {
    reqwest({
        url: `/api/suggestion?q=${value}`,
        method: 'get'
    })
    .then(suggestions => {
        if (_.every(suggestions, (item) => item.matching.length === 0)) {
            context.setState({
                suggestions: [{
                    title: '无可用条目',
                    matching: [{
                        string: '录入新条目',
                        original: { suggestionType: 'empty' }
                    }]
                }]
            });
        } else {
            context.setState({ suggestions });
        }
    })
    .fail(err => { console.log('Suggestion error', err); });
};
const throttledFetchSuggestions = _.throttle(fetchSuggestions, 500);
class SearchBar extends Component {
    constructor() {
        super();
        this.state = {};
        this.state.value = '';
        this.state.suggestions = [];
    }

    handleUpdateSuggestion(arg) {
        if (arg.reason === 'type') {
            throttledFetchSuggestions(arg.value, this);
        }
    }
    render() {
        const onSelect = this.props.onSelect ? this.props.onSelect : () => {};
        const suggestions = this.state.suggestions;
        const theme = {
            container: 'autosuggest dropdown',
            containerOpen: 'dropdown open',
            input: 'form-control',
            suggestionsContainer: 'dropdown-menu bs-suggestion-container',
            suggestion: 'text-primary',
            sectionSuggestionContainer: 'dropdown-menu',
            suggestionFocused: 'active',
            sectionTitle: 'dropdown-header'
        };
        return (
            <div>
                <FormGroup
                  bsSize="lg"
                  className="search-container"
                >
                    <Autosuggest
                      onSuggestionsUpdateRequested={arg => this.handleUpdateSuggestion(arg)}
                      suggestions={suggestions}
                      getSuggestionValue={item => item.string}
                      multiSection
                      renderSectionTitle={s => <strong>{s.title}</strong>}
                      getSectionSuggestions={s => s.matching}
                      renderSuggestion={value => <span dangerouslySetInnerHTML={{ __html:value.string }}></span>}
                      onSuggestionSelected={(e,a) => {
                          this.setState({value: ""});
                          onSelect(a);
                      }}
                      theme={theme}
                      inputProps={{
                          value: this.state.value,
                          onChange: (e) => this.setState({ value: e.target.value }),
                          type: 'text',
                          placeholder: '搜索'
                      }}
                    />
                </FormGroup>

            </div>
        );
    }
}

module.exports = SearchBar;
