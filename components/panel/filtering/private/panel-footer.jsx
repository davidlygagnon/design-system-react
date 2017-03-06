/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Panel Filter Group Footer

// Implements the [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
// Based on SLDS v2.2.0-rc.1

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';

import Button from '../../../button';

/**
 * A filtering panel contextual filtering options.
 */
const PanelFilterFooter = ({
	addFilterLabel,
	onClickAdd,
	onClickRemoveAll,
	removeAllLabel
}) => (
	<div className="slds-filters__footer slds-grid slds-shrink-none">
		<Button
			label={addFilterLabel}
			onClick={onClickAdd}
			variant="link"
		/>
		<Button
			className="slds-col--bump-left"
			label={removeAllLabel}
			onClick={onClickRemoveAll}
			variant="link"
		/>
	</div>
);

PanelFilterFooter.displayName = 'SLDSPanelFilterFooter';

PanelFilterFooter.propTypes = {
	/**
	 * Localized description of the "Add Filter" button in the footer
	 */
	addFilterLabel: PropTypes.node.isRequired,
	/**
	 * Callback triggered when "Add Filter" is clicked. Recieves an `event`.
	 */
	onClickAdd: PropTypes.func.isRequired,
	/**
	 * Callback triggered when "Remove All" is clicked. Recieves an `event`.
	 */
	onClickRemoveAll: PropTypes.func.isRequired,
	/**
	 * Localized description of the "Remove All" button in the footer
	 */
	removeAllLabel: PropTypes.node.isRequired

};

export default PanelFilterFooter;
