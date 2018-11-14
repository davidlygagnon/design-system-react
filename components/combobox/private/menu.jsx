/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable jsx-a11y/interactive-supports-focus */

import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import classNames from 'classnames';
import Tooltip from '../../tooltip';

import Icon from '../../icon';

const propTypes = {
	/*
	 * Active descendant in menu
	 */
	activeOption: PropTypes.object,
	/*
	 * Index of active descendant in menu
	 */
	activeOptionIndex: PropTypes.number,
	/**
	 * CSS classes to be added to container `div` tag. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * CSS classes to be added to tag with `.slds-dropdown`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	classNameMenu: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * CSS classes to be added to menu sub header `span` tag. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	classNameMenuSubHeader: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Sets the dialog width to the width of one of the following:
	 * `target`: (Menus attached to `input` typically follow this UX pattern),
	 *  `menu`: Consider setting a menuMaxWidth if using this value. If not, width will be set to width of largest menu item.
	 *  'none'
	 */
	inheritWidthOf: PropTypes.oneOf(['target', 'menu', 'none']),
	/*
	 * Id used for assistive technology
	 */
	inputId: PropTypes.string,
	/**
	 * Determines the height of the menu based on SLDS CSS classes.
	 */
	itemVisibleLength: PropTypes.oneOf([5, 7, 10]),
	/**
	 * **Text labels for internationalization**
	 * This object is merged with the default props object on every render.
	 * * `noOptionsFound`: Custom message that renders when no matches found. The default empty state is just text that says, 'No matches found.'.
	 */
	labels: PropTypes.shape({
		noOptionsFound: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
			.isRequired,
		optionDisabledTooltipLabel: PropTypes.string
	}),
	/**
	 * Accepts a custom menu item rendering function that becomes a custom component and is passed in the following props:
	 * * `assistiveText`: Object, `assistiveText` prop that is passed into Combobox
	 * * `option`: Object, option data for item being rendered that is passed into Combobox
	 * * `selected`: Boolean, allows rendering of `assistiveText.optionSelectedInMenu` in Readonly Combobox
	 *
	 * _Tested with snapshot testing._
	 */
	menuItem: PropTypes.func,
	/*
	 * Sets a maximum width that the menu will be if `inheritWidthOf` is menu.
	 */
	maxWidth: PropTypes.string,
	/*
	 * Menu options
	 */
	options: PropTypes.array,
	/*
	 * Callback to remove active descendent
	 */
	resetActiveOption: PropTypes.func,
	/*
	 * Callback when option is selected with keyboard or mouse
	 */
	onSelect: PropTypes.func,
	/*
	 * Selected options
	 */
	selection: PropTypes.array,
	/**
	 * Changes styles of the menu option
	 */
	variant: PropTypes.oneOf(['icon-title-subtitle', 'checkbox']),
	isSelected: PropTypes.func,
	assistiveText: PropTypes.object,
};

const defaultProps = {};

const Menu = (props) => {
	let maxWidth = props.inheritWidthOf === 'menu' ? 'inherit' : undefined;
	maxWidth =
		props.inheritWidthOf === 'menu' && props.maxWidth
			? props.maxWidth
			: maxWidth;

	// .slds-dropdown sets the menu to absolute positioning, since it has a relative parent. Absolute positioning removes clientHeight and clientWidth which Popper.js needs to absolute position the menu's wrapping div. Absolute positioning an already absolute positioned element doesn't work. Setting the menu's position to relative allows PopperJS to work it's magic.
	const menuOptions = props.options.map((optionData, index) => {
		const active =
			index === props.activeOptionIndex &&
			isEqual(optionData, props.activeOption);
		const selected = props.isSelected({
			selection: props.selection,
			option: optionData,
		});
		const MenuItem = props.menuItem;

		if (optionData.type === 'separator') {
			return optionData.label ? (
				<li
					className="slds-dropdown__header slds-truncate"
					title={optionData.label}
					role="separator"
					key={`menu-separator-${optionData.id}`}
				>
					<span
						className={classNames(
							'slds-text-title_caps',
							props.classNameMenuSubHeader
						)}
					>
						{optionData.label}
					</span>
				</li>
			) : (
					<li
						className="slds-has-divider_top-space"
						role="separator"
						key={`menu-separator-${optionData.id}`}
					/>
				);
		}

		const ariaProps = {
			'aria-disabled': !!optionData.disabled,
			'aria-selected': active
		};

		const tooltipId = `${props.inputId}-listbox-option-help-${optionData.id}`;
		if (optionData.disabled) {
			ariaProps['aria-describedby'] = tooltipId;
		}

		const menuItem = {
			'icon-title-subtitle': (
				<span // eslint-disable-line jsx-a11y/no-static-element-interactions
					{...ariaProps}
					id={`${props.inputId}-listbox-option-${optionData.id}`}
					className={classNames(
						'slds-media slds-listbox__option',
						'slds-listbox__option_entity slds-listbox__option_has-meta',
						{
							'slds-has-focus': active,
							'slds-disabled-text': optionData.disabled
						}
					)}
					onClick={(event) => {
						if (optionData.disabled) {
							return;
						}
						props.onSelect(event, { option: optionData });
					}}
					role="option"
				>
					{optionData.disabled ? (
						<Tooltip
							id={tooltipId}
							position="absolute"
							align="top left"
							triggerStyle={{ marginRight: '5px' }}
							content={props.labels.optionDisabledTooltipLabel}
						><span className="slds-m-right_xx-small slds-icon slds-icon-text-error slds-icon_x-small">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="error" width="16px" height="16px"><path d="M12 .9C5.9.9.9 5.9.9 12s5 11.1 11.1 11.1 11.1-5 11.1-11.1S18.1.9 12 .9zM3.7 12c0-4.6 3.7-8.3 8.3-8.3 1.8 0 3.5.5 4.8 1.5L5.2 16.8c-1-1.3-1.5-3-1.5-4.8zm8.3 8.3c-1.8 0-3.5-.5-4.8-1.5L18.8 7.2c1 1.3 1.5 3 1.5 4.8 0 4.6-3.7 8.3-8.3 8.3z" /></svg>
							</span></Tooltip>
					) : null}
					{optionData.icon && !props.menuItem ? (
						<span className="slds-media__figure">{optionData.icon}</span>
					) : null}
					{props.menuItem ? (
						<MenuItem
							assistiveText={props.assistiveText}
							selected={selected}
							option={optionData}
						/>
					) : (
							<span className="slds-media__body">
								<span className="slds-listbox__option-text slds-listbox__option-text_entity">
									{optionData.label}
								</span>
								<span className="slds-listbox__option-meta slds-listbox__option-meta_entity">
									{optionData.subTitle}
								</span>
							</span>
						)}
				</span>
			),
			checkbox: (
				<span // eslint-disable-line jsx-a11y/no-static-element-interactions
					{...ariaProps}
					id={`${props.inputId}-listbox-option-${optionData.id}`}
					className={classNames(
						'slds-media slds-listbox__option',
						' slds-listbox__option_plain slds-media_small slds-media_center',
						{
							'slds-has-focus': active,
							'slds-is-selected': selected,
							'slds-disabled-text': optionData.disabled
						}
					)}
					onClick={(event) => {
						if (optionData.disabled) {
							return;
						}
						props.onSelect(event, {
							selection: props.selection,
							option: optionData,
						});
					}}
					role="option"
				>
					<span className="slds-media__figure">
						<Icon
							className="slds-listbox__icon-selected"
							category="utility"
							name="check"
							size="x-small"
						/>
					</span>
					<span className="slds-media__body">
						{props.menuItem ? (
							<MenuItem
								assistiveText={props.assistiveText}
								selected={selected}
								option={optionData}
							/>
						) : (
								<span className="slds-truncate" title={optionData.label}>
									{selected ? (
										<span className="slds-assistive-text">
											{props.assistiveText.optionSelectedInMenu}
										</span>
									) : null}{' '}
									{optionData.label}
								</span>
							)}
					</span>
				</span>
			),
		};

		return (
			<li
				className="slds-listbox__item"
				key={`menu-option-${optionData.id}`}
				role="presentation"
			>
				{menuItem[props.variant]}
			</li>
		);
	});

	return (
		<ul
			className={classNames(
				'slds-listbox slds-listbox_vertical slds-dropdown slds-dropdown_fluid',
				{
					'slds-dropdown_length-with-icon-5': props.itemVisibleLength === 5,
					'slds-dropdown_length-with-icon-7': props.itemVisibleLength === 7,
					'slds-dropdown_length-with-icon-10': props.itemVisibleLength === 10,
				},
				props.classNameMenu
			)}
			role="presentation"
			style={{
				width: props.inheritWidthOf === 'menu' ? 'auto' : undefined,
				maxWidth,
				position: props.menuPosition !== 'relative' ? 'relative' : undefined,
			}}
		>
			{menuOptions.length ? (
				menuOptions
			) : (
					<li
						className="slds-listbox__item slds-listbox__status"
						role="status"
						aria-live="polite"
					>
						<span className="slds-m-left--x-large slds-p-vertical--medium">
							{props.labels.noOptionsFound}
						</span>
					</li>
				)}
		</ul>
	);
};

Menu.displayName = 'Menu';
Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
