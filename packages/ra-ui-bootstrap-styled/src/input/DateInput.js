import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from 'bootstrap-styled/lib/Input';
import FormGroup from 'bootstrap-styled/lib/Form/FormGroup';
import FormFeedback from 'bootstrap-styled/lib/Form/FormFeedback';
import { addField, FieldTitle } from '@yeutech/ra-core';

import sanitizeRestProps from './sanitizeRestProps';

/**
 * Convert Date object to String
 * 
 * @param {Date} v value to convert
 * @returns {String} A standardized date (yyyy-MM-dd), to be passed to an <input type="date" />
 */
const dateFormatter = v => {
    if (!(v instanceof Date) || isNaN(v)) return;
    const pad = '00';
    const yyyy = v.getFullYear().toString();
    const MM = (v.getMonth() + 1).toString();
    const dd = v.getDate().toString();
    return `${yyyy}-${(pad + MM).slice(-2)}-${(pad + dd).slice(-2)}`;
};

const sanitizeValue = value => {
    // null, undefined and empty string values should not go through dateFormatter
    // otherwise, it returns undefined and will make the input an uncontrolled one.
    if (value == null || value === '') {
        return '';
    }

    const finalValue = typeof value instanceof Date ? value : new Date(value);
    return dateFormatter(finalValue);
};

export class DateInput extends Component {
    onChange = event => {
        this.props.input.onChange(event.target.value);
    };

    render() {
        const {
            className,
            meta,
            input,
            isRequired,
            label,
            options,
            source,
            resource,
            // Our props
            size,
            classNameInput,
            labelHidden,
            ...rest
        } = this.props;
        if (typeof meta === 'undefined') {
            throw new Error(
                "The DateInput component wasn't called within a redux-form <Field>. Did you decorate it and forget to add the addField prop to your component? See https://marmelab.com/react-admin/Inputs.html#writing-your-own-input-component for details."
            );
        }
        const { touched, error } = meta;
        const value = sanitizeValue(input.value);

        return (
            <FormGroup color={error ? 'danger' : ''} className={className} {...sanitizeRestProps(rest)}>
                <FieldTitle
                    label={label}
                    source={source}
                    resource={resource}
                    isRequired={isRequired}
                    labelHidden={labelHidden}
                />
                <Input
                    type="date"
                    {...input}
                    {...options}
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                    onChange={this.handleChange}
                    size={size}
                    value={value}
                    className={classNameInput}
                />
                {!!(touched && error) && <FormFeedback>{error}</FormFeedback>}
            </FormGroup>
        );
    }
}

DateInput.propTypes = {
    className: PropTypes.string,
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    meta: PropTypes.object,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    labelHidden: PropTypes.bool,
    size: PropTypes.string,
    classNameInput: PropTypes.string,
};

DateInput.defaultProps = {
    options: {},
};

export default addField(DateInput);
