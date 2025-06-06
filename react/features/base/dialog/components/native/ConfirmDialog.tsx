import React from 'react';
import { WithTranslation } from 'react-i18next';
import Dialog from 'react-native-dialog';
import { connect } from 'react-redux';

import { translate } from '../../../i18n/functions';
import { renderHTML } from '../functions.native';

import AbstractDialog, { IProps as AbstractProps } from './AbstractDialog';
import styles from './styles';


/**
 * The type of the React {@code Component} props of
 * {@link ConfirmDialog}.
 */
interface IProps extends AbstractProps, WithTranslation {

    /**
     * The i18n key of the text label for the back button.
     */
    backLabel?: string;

    /**
     * The i18n key of the text label for the cancel button.
     */
    cancelLabel?: string;

    /**
     * The React {@code Component} children.
     */
    children?: React.ReactNode;

    /**
     * The i18n key of the text label for the confirm button.
     */
    confirmLabel?: string;

    /**
     * Dialog description key for translations.
     */
    descriptionKey?: string | { key: string; params: string; };

    /**
     * Whether the back button is hidden.
     */
    isBackHidden?: Boolean;

    /**
     * Whether the cancel button is hidden.
     */
    isCancelHidden?: Boolean;

    /**
     * Whether or not the nature of the confirm button is destructive.
     */
    isConfirmDestructive?: Boolean;

    /**
     * Whether or not the confirm button is hidden.
     */
    isConfirmHidden?: Boolean;

    /**
     * Dialog title.
     */
    title?: string;

    /**
     * Renders buttons vertically.
     */
    verticalButtons?: boolean;
}

/**
 * React Component for getting confirmation to stop a file recording session in
 * progress.
 *
 * @augments Component
 */
class ConfirmDialog extends AbstractDialog<IProps> {
    /**
     * Default values for {@code ConfirmDialog} component's properties.
     *
     * @static
     */
    static defaultProps = {
        isConfirmDestructive: false,
        isConfirmHidden: false
    };

    /**
     * Renders the dialog description.
     *
     * @returns {React$Component}
     */
    _renderDescription() {
        const { descriptionKey, t } = this.props;
        const description
            = typeof descriptionKey === 'string'
                ? t(descriptionKey)
                : renderHTML(
                    t(descriptionKey?.key ?? '', descriptionKey?.params)
                );

        return (
            <Dialog.Description>
                { description }
            </Dialog.Description>
        );
    }

    /**
     * Implements {@code Component#render}.
     *
     * @inheritdoc
     */
    override render() {
        const {
            backLabel,
            cancelLabel,
            children,
            confirmLabel,
            isBackHidden = true,
            isCancelHidden,
            isConfirmDestructive,
            isConfirmHidden,
            t,
            title,
            verticalButtons
        } = this.props;

        const dialogButtonStyle
            = isConfirmDestructive
                ? styles.destructiveDialogButton : styles.dialogButton;

        return (
            <Dialog.Container
                coverScreen = { false }
                verticalButtons = { verticalButtons }
                visible = { true }>
                {
                    title && <Dialog.Title>
                        { t(title) }
                    </Dialog.Title>
                }
                { this._renderDescription() }
                { children }
                {
                    !isBackHidden && <Dialog.Button
                        label = { t(backLabel || 'dialog.confirmBack') }
                        onPress = { this._onBack }
                        style = { styles.dialogButton } />
                }
                {
                    !isCancelHidden && <Dialog.Button
                        label = { t(cancelLabel || 'dialog.confirmNo') }
                        onPress = { this._onCancel }
                        style = { styles.dialogButton } />
                }
                {
                    !isConfirmHidden && <Dialog.Button
                        label = { t(confirmLabel || 'dialog.confirmYes') }
                        onPress = { this._onSubmit }
                        style = { dialogButtonStyle } />
                }
            </Dialog.Container>
        );
    }
}

export default translate(connect()(ConfirmDialog));
