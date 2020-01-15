import React, { Component } from 'react';
import cx from 'classnames';
import Select from '../Select';
import MultiSelectTrigger from './SelectTrigger';

export default class PowerSelectMultiple extends Component {
  state = {};

  componentWillMount() {
    this.filterOptions(this.props.options, this.props.selected);
  }

  componentWillReceiveProps(nextProps) {
    this.filterOptions(nextProps.options, nextProps.selected);
  }

  handleOnChange = ({ option, select }) => {
    let { selected, onChange } = this.props;
    if (option) {
      let options = selected.slice();
      options.push(option);
      onChange({
        options,
        select,
      });
    }
    select.actions.focus();
    if (select.searchTerm) {
      select.actions.search('');
    }
  };

  filterOptions(options, selected, callback) {
    let filteredOptions = [];
    if (this.props.filterSelectedOptions) {
      filteredOptions = options.filter(option => selected.indexOf(option) === -1);
    } else {
      filteredOptions = [...options];
    }
    this.setState({ filteredOptions }, callback);
  }

  handleKeyDown = (event, { select }) => {
    if (event.which === 8) {
      let { selected, onChange } = this.props;
      let value = event.target.value;
    }
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event, { select });
    }
  };

  removeOption = ({ option, select }) => {
    let { selected, onChange } = this.props;
    let options = selected.filter(opt => opt !== option);
    onChange({
      options,
      select,
    });
    select.actions.focus();
  };

  handleClearClick = (event, { select }) => {
    event.stopPropagation();
    this.props.onChange({
      options: [],
      select,
    });
    if (select.searchTerm) {
      select.actions.search('');
    }
    select.actions.close();
    select.actions.focus();
  };

  render() {
    let { className, options, onChange, ...rest } = this.props;
    return (
      <Select
        className={cx('PowerSelectMultiple', className)}
        ref={select => (this.select = select)}
        triggerComponent={props => (
          <MultiSelectTrigger
            {...props}
            showOptionClose={this.props.showOptionClose}
            searchEnabled={this.props.searchEnabled}
            onOptionCloseClick={this.removeOption}
            onClearClick={this.handleClearClick}
          />
        )}
        {...rest}
        options={this.state.filteredOptions}
        onChange={this.handleOnChange}
        closeOnSelect={this.props.closeOnSelect}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}

PowerSelectMultiple.displayName = 'PowerSelectMultiple';
